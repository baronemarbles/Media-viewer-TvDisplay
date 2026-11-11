import { useState,useCallback, useEffect, useRef } from 'react';
import SwitchToArmando from './SwitchToArmando';
import{Routes,Route, Link} from 'react-router-dom';
import logoVTV from '../assets/LOGO_vtv-da-gente-colorida.png';
import playImg from '../assets/playBtn.svg';
import pauseImg from '../assets/pauseBtn.svg';
import fowardImg from '../assets/fowardBtn.svg';
import backwardImg from '../assets/backwardsBtn.svg';
import previsaoImg from '../assets/previsaoImg.svg';
import fileImg from '../assets/FilesIconSVG.svg'
import switchImg_noFill from '../assets/swticheSvg.svg'
import '../app.css'



// URL base do seu backend. Certifique-se que é a porta correta do seu server.js
const BACKEND_URL = 'http://localhost:3333';

function MediaPlayer() {
  const [mediaList, setMediaList] = useState([]);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // Para controlar o estado de play/pause do vídeo
  const [isPlaying, setIsPlaying] = useState(false);

  const mediaElementRef = useRef(null); // Para referenciar o elemento <video> ou <img>
  const currentMedia = mediaList.length > 0 ? mediaList[currentMediaIndex] : null;
  // Função para buscar a lista de mídias
  const fetchMedia = useCallback(async (isInitialLoad = false) => {
    if (isInitialLoad) {
        setIsLoading(true);
        setError(null);
    }
    try {
      const response = await fetch(`${BACKEND_URL}/api/media-list`);
      if (!response.ok) {
        throw new Error(`Falha ao buscar mídias: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setMediaList(data);
      if (isInitialLoad) setIsLoading(false);
    } catch (err) {
      console.error("Erro ao buscar lista de mídias:", err);
      setError(err.message);
      if (isInitialLoad) setIsLoading(false);
    }
  }, [BACKEND_URL]); // Removido isLoading da dependência, controlado por argumento

  // Efeito para buscar dados iniciais e configurar Server-Sent Events
  useEffect(() => {
    fetchMedia(true); // Busca inicial, marcando como carregamento inicial

    const eventSource = new EventSource(`${BACKEND_URL}/api/media-updates`);
    console.log(`Conectando ao SSE em ${BACKEND_URL}/api/media-updates`);

    eventSource.onopen = () => {
      console.log("Conexão SSE aberta com o servidor.");
    };

    // Escuta por eventos chamados 'mediaUpdated' (que definimos no backend)
    eventSource.addEventListener('mediaUpdated', (event) => {
      console.log("Evento SSE 'mediaUpdated' recebido, dados:", event.data);
      // Os dados do evento (event.data) podem conter informações sobre a mudança, se você quiser
      // Por agora, apenas vamos rebuscar a lista inteira.
      fetchMedia(false); // Rebusca a lista de mídias, não é o carregamento inicial
    });
    
    eventSource.addEventListener('connected', (event) => {
      const eventData = JSON.parse(event.data);
      console.log("Evento SSE 'connected' recebido:", eventData.message);
    });

    eventSource.onerror = (err) => {
      console.error("Erro no EventSource:", err);
      // O EventSource tentará reconectar automaticamente em caso de erro de rede.
      // Se o servidor fechar a conexão intencionalmente ou houver um erro fatal,
      // pode ser necessário fechar aqui para evitar loops.
      // eventSource.close(); // Descomente se quiser fechar em qualquer erro.
    };

    // Limpa a conexão EventSource quando o componente é desmontado
    return () => {
      console.log("Fechando conexão SSE.");
      eventSource.close();
    };
  }, [fetchMedia, BACKEND_URL]); // fetchMedia é agora uma dependência estável devido ao useCallback

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
      {/*<img className="logo" src={logoVTV} alt="Logo VTV"></img>*/}

      <div className="div_playerWrapper">
       

        <div className="div_playerContainer">
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

            <Link to='/switchArmando'>
              <button 
                className="btn_menuItens" 
                title="Devolver controle para o Armando"
              >
                <img className='btn__images' id='img_previsao' src={switchImg_noFill} alt="Switch to SwitchArtScreen" />
              </button>
            </Link>

            <Link to='/clima'>
              <button 
                className="btn_menuItens" 
                title="ClimaTempo"
              >
                <img className='btn__images' id='img_previsao' src={previsaoImg} alt="Fowards Button" />
              </button>
            </Link>
          </div>
        </div>

          {currentMedia && currentMedia.type === 'video' && (
            <video ref={mediaElementRef} id='displayMedia' key={currentMedia.src} /* controls */ >
              {/* O src agora é completo com o BACKEND_URL */}
              <source src={`${BACKEND_URL}${currentMedia.src}`} type='video/mp4' />
              Seu navegador não suporta o elemento de vídeo.
            </video>
          )}
          {currentMedia && currentMedia.type === 'image' && (
            // <div class='img_container'>
            <img ref={mediaElementRef} id='displayMedia' src={`${BACKEND_URL}${currentMedia.src}`} alt={currentMedia.name || 'Mídia'} />
            // </div>
          )}
          {!currentMedia && mediaList.length > 0 && <p>Selecione uma mídia.</p>}
        </div>

        
      </div>
    </>
  );
}

export default MediaPlayer;