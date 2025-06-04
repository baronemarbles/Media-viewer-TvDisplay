// import { useState } from 'react'
// import logoVTV from './assets/LOGO_vtv-da-gente-colorida.png'
// import video from './assets/meiaSantos2024.mp4'
// import playImg from './assets/playBtn.svg'
// import pauseImg from './assets/pauseBtn.svg'
// import fowardImg from './assets/fowardBtn.svg'
// import backwardImg from './assets/backwardsBtn.svg'
// import { getMapArquivo } from '../server'
// import './App.css'





// function App() {


//   return (
//     <>
      
//       <img className="logo" src={logoVTV}></img>



//       <div className="div_playerWrapper">

//           <div className="div_controlesWrapper">
//             <div className="div_controlesContainer">
//               <button id='btn_play' onClick={getMapArquivo} className="btn_menuItens"><img className='btn__images' src={playImg} alt="PlayerButton" /></button>
//               <button id='btn_pause' className="btn_menuItens"><img className='btn__images' src={pauseImg} alt="PauseButton" /></button>
//               <button id='btn_backward' className="btn_menuItens"><img className='btn__images' src={backwardImg} alt="BackwardsButton" /></button>
//               <button id='btn_foward' className="btn_menuItens"><img className='btn__images' src={fowardImg} alt="FowardsButton" /></button>
              
//             </div>
//           </div>

//           <div className="div_playerContainer">
//             <video id='displayVideo' >
//               <source src={video} type='video/mp4'/>
//             </video>
//           </div>

//           <div className="div_controlesWrapper">
//             <div className="div_controlesContainer">
//               <button className="btn_menuItens"><img className='btn__images' src={playImg} alt="PlayerButton" /></button>
//               <button className="btn_menuItens"><img className='btn__images' src={pauseImg} alt="PauseButton" /></button>
//               <button className="btn_menuItens"><img className='btn__images' src={backwardImg} alt="BackwardsButton" /></button>
//               <button className="btn_menuItens"><img className='btn__images' src={fowardImg} alt="FowardsButton" /></button>
              
//             </div>
//           </div>

          
//       </div>
//       <script src="../js/main.js"></script>
//     </>
//   )
// }

// export default App

// App.jsx
import { useState, useEffect, useRef } from 'react';
import logoVTV from './assets/LOGO_vtv-da-gente-colorida.png';
import playImg from './assets/playBtn.svg';
import pauseImg from './assets/pauseBtn.svg';
import fowardImg from './assets/fowardBtn.svg';
import backwardImg from './assets/backwardsBtn.svg';
import './App.css';

// URL base do seu backend. Certifique-se que é a porta correta do seu server.js
const BACKEND_URL = 'http://localhost:3333';

function App() {
  const [mediaList, setMediaList] = useState([]);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // Para controlar o estado de play/pause do vídeo
  const [isPlaying, setIsPlaying] = useState(false);

  const mediaElementRef = useRef(null); // Para referenciar o elemento <video> ou <img>

  // 1. Buscar a lista de mídias do backend quando o componente montar
  useEffect(() => {
    async function fetchMedia() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${BACKEND_URL}/api/media-list`);
        if (!response.ok) {
          throw new Error(`Falha ao buscar mídias: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setMediaList(data);
        if (data.length === 0) {
            console.warn("Nenhuma mídia encontrada na pasta configurada no backend.");
        }
      } catch (err) {
        console.error("Erro ao buscar lista de mídias:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMedia();
  }, []); // Array de dependências vazio [], executa apenas uma vez na montagem

  const currentMedia = mediaList.length > 0 ? mediaList[currentMediaIndex] : null;

  // 2. Funções de controle
  const handleNext = () => {
    if (mediaList.length > 0) {
      setCurrentMediaIndex((prevIndex) => (prevIndex + 1) % mediaList.length);
      setIsPlaying(false); // Reseta o play ao mudar de mídia
    }
  };

  const handlePrevious = () => {
    if (mediaList.length > 0) {
      setCurrentMediaIndex((prevIndex) => (prevIndex - 1 + mediaList.length) % mediaList.length);
      setIsPlaying(false); // Reseta o play ao mudar de mídia
    }
  };

  const handlePlay = () => {
    if (mediaElementRef.current && currentMedia?.type === 'video') {
      mediaElementRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error("Erro ao tentar dar play:", err));
    }
  };

  const handlePause = () => {
    if (mediaElementRef.current && currentMedia?.type === 'video') {
      mediaElementRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Efeito para carregar nova mídia quando o índice muda
  useEffect(() => {
    if (mediaElementRef.current && currentMedia) {
        if (currentMedia.type === 'video') {
            mediaElementRef.current.load(); // Garante que a nova fonte de vídeo seja carregada
            // Se você quiser que o vídeo dê play automaticamente ao mudar, adicione lógica aqui
            // if (isPlaying) {
            //   mediaElementRef.current.play().catch(e => console.warn("Autoplay bloqueado", e));
            // }
        }
    }
    // Resetar isPlaying se a nova mídia não for um vídeo ou se não houver mídia
    if (currentMedia?.type !== 'video') {
        setIsPlaying(false);
    }
  }, [currentMediaIndex, currentMedia]); // Re-executar quando o índice ou a mídia atual mudar

  // Sincronizar o estado `isPlaying` com os eventos reais do player de vídeo
  useEffect(() => {
    const videoElement = mediaElementRef.current;
    if (videoElement && currentMedia?.type === 'video') {
      const onPlay = () => setIsPlaying(true);
      const onPause = () => setIsPlaying(false);
      const onEnded = () => {
        setIsPlaying(false);
        // Opcional: ir para a próxima mídia ao terminar
        // handleNext();
      };

      videoElement.addEventListener('play', onPlay);
      videoElement.addEventListener('pause', onPause);
      videoElement.addEventListener('ended', onEnded);

      // Limpeza ao desmontar ou quando a mídia/elemento mudar
      return () => {
        videoElement.removeEventListener('play', onPlay);
        videoElement.removeEventListener('pause', onPause);
        videoElement.removeEventListener('ended', onEnded);
      };
    }
  }, [currentMedia, mediaElementRef.current]); // Adicionado mediaElementRef.current às dependências

  if (isLoading) {
    return <div className="center-message">Carregando mídias...</div>;
  }

  if (error) {
    return <div className="center-message error-message">Erro ao carregar mídias: {error} <br/> Verifique o console do backend e do navegador.</div>;
  }

  if (mediaList.length === 0 && !isLoading) {
    return <div className="center-message">Nenhuma mídia encontrada. Verifique a pasta 'src/assets/photos' e as configurações do backend.</div>;
  }

  return (
    <>
      <img className="logo" src={logoVTV} alt="Logo VTV"></img>

      <div className="div_playerWrapper">
        <div className="div_controlesWrapper">
          <div className="div_controlesContainer">
            <button 
              id='btn_play' 
              onClick={handlePlay} 
              className="btn_menuItens" 
              disabled={!currentMedia || currentMedia?.type !== 'video' || isPlaying}
              title="Play"
            >
              <img className='btn__images' src={playImg} alt="Play Button" />
            </button>
            <button 
              id='btn_pause' 
              onClick={handlePause} 
              className="btn_menuItens" 
              disabled={!currentMedia || currentMedia?.type !== 'video' || !isPlaying}
              title="Pause"
            >
              <img className='btn__images' src={pauseImg} alt="Pause Button" />
            </button>
            <button 
              id='btn_backward' 
              onClick={handlePrevious} 
              className="btn_menuItens" 
              disabled={mediaList.length <= 1}
              title="Voltar"
            >
              <img className='btn__images' src={backwardImg} alt="Backwards Button" />
            </button>
            <button 
              id='btn_foward' 
              onClick={handleNext} 
              className="btn_menuItens" 
              disabled={mediaList.length <= 1}
              title="Avançar"
            >
              <img className='btn__images' src={fowardImg} alt="Fowards Button" />
            </button>
          </div>
        </div>

        <div className="div_playerContainer">
          {currentMedia && currentMedia.type === 'video' && (
            <video ref={mediaElementRef} id='displayMedia' key={currentMedia.src} /* controls */ >
              {/* O src agora é completo com o BACKEND_URL */}
              <source src={`${BACKEND_URL}${currentMedia.src}`} type='video/mp4' />
              Seu navegador não suporta o elemento de vídeo.
            </video>
          )}
          {currentMedia && currentMedia.type === 'image' && (
            <img ref={mediaElementRef} id='displayMedia' src={`${BACKEND_URL}${currentMedia.src}`} alt={currentMedia.name || 'Mídia'} />
          )}
          {!currentMedia && mediaList.length > 0 && <p>Selecione uma mídia.</p>}
        </div>

        {/* Você tinha um segundo conjunto de controles, removi pois parecia duplicado */}
      </div>
      {/* A tag <script src="../js/main.js"></script> não é a forma usual de adicionar JS em React. 
          A lógica deve estar no componente ou em módulos importados. */}
    </>
  );
}

export default App;