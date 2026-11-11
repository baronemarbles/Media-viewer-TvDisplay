# Visualizador de arquivos e mapas Waze

Este é um projeto do meu estágio e é uma solução com React.js para uma demanda do setor do Jornalismo. Na VTV SBT temos o programa VTV da gente e precisavamos utilizar um monitor touch no estúdio para dar interatividade com os telespectadores ao programa, o apresentador Victor prôpros utilizar para interagir sobre os mapas das rodovias do Waze, entretanto não há um aplicativo nativo para o computador e a visualização na versão web não se adequou ao nosso uso so pois os campos de ponto de partida e destino tomam muito espaço. 

## Proposta

Desenvolvi uma aplicação Web apenas com os iframes que o Waze disponibiliza porque sua visualização é limpa comparada e entrega mais área para interagir com o mapa. 
Criei um menu com algumas localizações pré-definidas pelo Vitor que são rodavias estratégicas que abrangem o maior tráfego de veíuculos das regiões de nossa cobertura.

O app já foi usado e continua a ser usado especialemnte em feriados prolongados justamente por haver muita movimentação de turistas entre as cidades. 
Confira em: https://youtu.be/dIzUGco6weY

Além da funcionalidade dos mapas do Waze, criei com Node.js um visualizador de arquivos. Com o readdir e o fastify foi possível fazer a conexão com os diretórios salvos no computador host da aplicação, no caso é um acesso a uma pasta em uma rede local nossa. E com isso é possível avançar, retornar, reproduzir e pausar uma mídia. Os tipos de arquivo permitidos são: [mp4,jpeg,jpg,png].

A razão sobre funcionalidade é para o Victor também poder passar os materiais de VT's e CF's dos assuntos que ele estiver discorrendo sobre e ele mesmo poder "ilustrar" e chamar as imagens.

### Como usar


#### Waze
Confira os iframes na variável <code>urlWazeCidades</code> em /src/components/SwitchToArmando.jsx e caso queira inserir novos trechos crie uma nova associação. Tenha em mente que o padrão é exibir o iframe de Santos pois é pertinente pra nossa lógica de negócio, então se quiser mudar o default mude <code>Santos</code>

#### Visualizador de arquivos
Para configurar o acesso aos arquivos primeiro <u>crie um arquivo <b>.env</b> e insira dois campos: <b>DIR_NAME</b> e <b>SHARE</b></u>. Então atribua o endereço do diretório que você quer conectar em DIR_NAME e o caminho da pasta raiz em SHARE.

Com as variáveis de ambiente definidas, vamos para o arquivo <code>/server.js</code> e configurar o caminho relativo para a pasta ou seja a partir do endereço de host, endereço base, colocar o restante das subpastas para a pasta alvo.

Exemplo: 

//arquivo.env
DIR_NAME:192.168.0.77 #Vamos dizer que 192.168.0.77 está configurado um NAS
SHARE:documentosPessoais


//server.js
...
mediaDirectoryUserPath='contasDeLuz/Abril' #Suponha que se armazene o boleto da conta de luz e o comprovante de pagamento dentro da pasta do mês.

Dessa forma você estará navegando em 192.168.0.77<small>DIR_NAME</small>/documentosPessoais<small>SHARE</small>/contasDeLuz/Abril<small>mediaDirectoryUserPath</small>

#### RODANDO A APLICAÇÃO

Primeiro execute o servidor com o node.
Importante: a flag de --env é para indicar ao node de onde buscar as variáveis de ambiente citadas no código, portanto substitua 'nome_do_arquivo.env' pelo nome que você deu a ele.

<code> node --env-file=nome_do_arquivo.env  server.js </code>


Depois execute o Front-End

<code>npm run dev</code>
