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
import React from 'react';
import{Routes,Route, Link} from 'react-router-dom';
import MediaPlayer from './components/MediaPlayer';
import WeatherPage from './components/WeatherPage';
import SwitchToArmando from './components/SwitchToArmando';

function App(){
  return(
    <>
       {/* Você pode criar um menu de navegação aqui se quiser */}
      {/* <nav className="main-nav">
        <Link to="/">Player de Mídia</Link>
        <Link to="/clima">Previsão do Tempo</Link>
        <></>
      </nav> */}

      {/* O <Routes> define a área onde as páginas serão trocadas */}
      <Routes>
        {/* A <Route> define qual componente renderizar para cada caminho (path) */}
        <Route path="/" element={<MediaPlayer />} />
        <Route path="/clima" element={<WeatherPage />} />
        <Route path="/switchArmando" element={<SwitchToArmando/>} />
      </Routes>
    </>
  )
}






export default App;