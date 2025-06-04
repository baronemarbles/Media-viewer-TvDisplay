// server.js
import fastify from 'fastify';
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fastifyStatic from '@fastify/static';
import fastifyCors from '@fastify/cors';
import chokidar from 'chokidar'; // 1. Importe o chokidar

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = fastify({ logger: true });

await server.register(fastifyCors, {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
});

const mediaDirectoryUserPath = 'src/assets/photos';
const mediaDirectoryAbsolutePath = path.join(__dirname, mediaDirectoryUserPath);

server.register(fastifyStatic, {
  root: mediaDirectoryAbsolutePath,
  prefix: '/media/',
});

// Vamos manter mediaFilesList aqui para que possa ser atualizada
let mediaFilesList = [];

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
      })
      .on('unlink', async (filePath) => { // Arquivo removido
        server.log.info(`Arquivo removido: ${filePath}. Recarregando lista.`);
        await loadMediaFiles();
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