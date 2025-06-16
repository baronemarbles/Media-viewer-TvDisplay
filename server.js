// server.js
import fastify from 'fastify';
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fastifyStatic from '@fastify/static';
import fastifyCors from '@fastify/cors';
import chokidar from 'chokidar'; // 1. Importe o chokidar

const __filename = fileURLToPath(import.meta.url);
const __dirname = 'J:/';

const server = fastify({ logger: true });
const allowedOrigins = [
  'http://localhost:5173',
  'http://192.168.0.126:5173'
];

await server.register(fastifyCors, {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
});

const mediaDirectoryUserPath = 'tv';
const mediaDirectoryAbsolutePath = path.join(__dirname, mediaDirectoryUserPath);

server.register(fastifyStatic, {
  root: mediaDirectoryAbsolutePath,
  prefix: '/media/',
});

// Vamos manter mediaFilesList aqui para que possa ser atualizada
let mediaFilesList = [];
let sseClients = []; // Para armazenar os clientes SSE conectados

// 2. Modifique loadMediaFiles para que possa ser chamada para recarregar
async function loadMediaFiles() {
  server.log.info('Recarregando lista de arquivos de mídia...');
  try {
    const files = await readdir(mediaDirectoryAbsolutePath);
    let idCounter = 1;
    const newMediaFilesList = files // Armazena em uma nova variável temporariamente
      .filter(file => /\.(mp4|jpeg|jpg|png)$/i.test(file))
      .map((file) => {
        const fileType = path.extname(file).toLowerCase();
        let type = 'image';
        if (fileType === '.mp4') {
          type = 'video';
        }
        return {
          id: idCounter++,
          name: file,
          src: `/media/${file}`,
          type: type,
        };
      });
    mediaFilesList = newMediaFilesList; // Atualiza a lista principal
    server.log.info(`Lista de mídia atualizada. Encontrados ${mediaFilesList.length} arquivos.`);
  } catch (err) {
    server.log.error(`Erro ao recarregar diretório de mídia (${mediaDirectoryAbsolutePath}):`, err);
  }
}

// Função para notificar todos os clientes SSE
function notifySseClients(eventName = 'mediaUpdated', data = {}) {
  if (sseClients.length > 0) {
    server.log.info(`Notificando ${sseClients.length} cliente(s) SSE com o evento '${eventName}'`);
  }
  const message = `event: ${eventName}\ndata: ${JSON.stringify(data)}\n\n`;
  sseClients.forEach(client => {
    try {
      if (!client.response.writableEnded) {
        client.response.write(message);
      } else {
        // Cliente desconectado, remove da lista (o evento 'close' também deve tratar disso)
        sseClients = sseClients.filter(c => c.id !== client.id);
        server.log.info(`SSE Cliente ${client.id} já desconectado ao tentar notificar. Removido.`);
      }
    } catch (e) {
      server.log.error(`Erro ao escrever para o cliente SSE ${client.id}: `, e);
      sseClients = sseClients.filter(c => c.id !== client.id); // Remove em caso de erro
    }
  });
}

// Rota para o stream de Server-Sent Events
server.get('/api/media-updates', (request, reply) => {
  const headers = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': 'http://localhost:5173'
  };
   reply.raw.writeHead(200, headers); // Envia os cabeçalhos HTTP para o cliente

  // Envia um comentário ou evento inicial para manter a conexão ou confirmar
  reply.raw.write('event: connected\ndata: {"message": "Conexão SSE estabelecida"}\n\n');

  const clientId = Date.now() + Math.random().toString(36).substring(2,7); // ID mais único
  const newClient = {
    id: clientId,
    response: reply.raw // Armazena o objeto de resposta raw do Node.js
  };
  sseClients.push(newClient);
  server.log.info(`Cliente SSE ${clientId} conectado. Total de clientes: ${sseClients.length}`);

  // Quando o cliente fechar a conexão
  request.raw.on('close', () => {
    sseClients = sseClients.filter(client => client.id !== clientId);
    server.log.info(`Cliente SSE ${clientId} desconectado. Total de clientes: ${sseClients.length}`);
  });
});

server.get('/api/media-list', async (request, reply) => {
  // A lista já é atualizada pelo chokidar e no início.
  // Se estiver vazia aqui, é porque não há arquivos ou houve erro no carregamento inicial.
  return reply.send(mediaFilesList);
});

const startServer = async () => {
  try {
    await loadMediaFiles(); // Carregamento inicial
    await server.listen({ port: 3333, host: '0.0.0.0' });
    server.log.info(`Servidor backend rodando em http://localhost:3333`);

    // 3. Configure o Chokidar para observar o diretório de mídia
    const watcher = chokidar.watch(mediaDirectoryAbsolutePath, {
      ignored: /^\./, // ignora arquivos ocultos (ex: .DS_Store)
      persistent: true,
      ignoreInitial: true, // Não dispara eventos 'add' para arquivos já existentes no início
                           // pois já fizemos o loadMediaFiles() inicial.
      awaitWriteFinish: {  // Ajuda a evitar múltiplos eventos para um único arquivo grande sendo copiado
        stabilityThreshold: 2000,
        pollInterval: 100
      }
    });

    server.log.info(`Observando o diretório de mídia em: ${mediaDirectoryAbsolutePath}`);

    watcher
      .on('add', async (filePath) => { // Novo arquivo adicionado
        server.log.info(`Arquivo adicionado: ${filePath}. Recarregando lista.`);
        await loadMediaFiles();
        notifySseClients('mediaUpdated', { action: 'added', file: path.basename(filePath) }); // Notifica os clientes
      })
      .on('unlink', async (filePath) => { // Arquivo removido
        server.log.info(`Arquivo removido: ${filePath}. Recarregando lista.`);
        await loadMediaFiles();
        notifySseClients('mediaUpdated', { action: 'removed', file: path.basename(filePath) }); // Notifica os clientes
      })
      // Você pode adicionar outros eventos como 'change' se precisar
      // .on('change', async (filePath) => {
      //   server.log.info(`Arquivo modificado: ${filePath}. Recarregando lista.`);
      //   await loadMediaFiles();
      // })
      .on('error', (error) => {
        server.log.error(`Erro no observador de arquivos: ${error}`);
      });

  } catch (err) {
    server.log.error('Erro ao iniciar o servidor:', err);
    process.exit(1);
  }
};


startServer();

console.log(mediaDirectoryAbsolutePath);