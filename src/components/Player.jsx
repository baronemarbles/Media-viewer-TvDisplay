import React from 'react'

function player() {
  return (
    <>
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

                <Link 
                    id='btn_SwitchArmando' 
                    to="/switchArmando" 
                    className="btn_menuItens" 
                    title="Trocar para OBS comando Armando"
                >
                    <img className='btn__images' id='img_previsao' src={previsaoImg} alt="Fowards Button" />
                </Link>
            </div>
        </div>
    </>
  )
}

export default player