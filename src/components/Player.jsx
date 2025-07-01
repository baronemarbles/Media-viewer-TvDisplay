import React from 'react'
import playImg from '../assets/playBtn.svg';
import pauseImg from '../assets/pauseBtn.svg';
import fowardImg from '../assets/fowardBtn.svg';
import backwardImg from '../assets/backwardsBtn.svg';
import previsaoImg from '../assets/previsaoImg.svg';
import switchImg from '../assets/switchIconSVG.svg'
import fileImg from '../assets/FilesIconSVG.svg'
import switchImg_noFill from '../assets/swticheSvg.svg'
import '../app.css'
import { Link } from 'react-router-dom';

function Player() {
  return (
    <>
        <div className="div_controlesWrapper">
            <div className="div_controlesContainer">
                <Link 
                    id='btn_MidiaPlayer' 
                    to='/'
                    className="btn_menuItens" 
                    title="Link Reprodutor de mídia"
                >
                    <img className='btn__images' src={fileImg} alt="Midia Player" />
                </Link>
               
                <Link 
                    id='btn_SwitchArmando' 
                    to="/switchArmando" 
                    className="btn_menuItens" 
                    title="Trocar para OBS comando Armando"
                >
                    <img className='btn__images' src={switchImg_noFill} alt="Switch to SwitchArtScreen" />
                </Link>
            </div>
        </div>
    </>
  )
}

export default Player