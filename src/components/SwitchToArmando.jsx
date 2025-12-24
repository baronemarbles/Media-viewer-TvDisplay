import React, {useState} from 'react'
import Player from "./Player"
import '../app.css'

const urlWazeCidades= {
  Santos:'https://embed.waze.com/iframe?zoom=12&lat=-23.947&lon=-46.366&ct=livemap',
  PraiaGrande: 'https://embed.waze.com/iframe?zoom=15&lat=-24.0054&lon=-46.4033&ct=livemap',
  Campinas: 'https://embed.waze.com/iframe?zoom=11&lat=-22.900&lon=-47.165&ct=livemap',
  Bertioga: 'https://embed.waze.com/iframe?zoom=12&lat=-23.797&lon=-46.027&ct=livemap'
}


const cidadesToggleState= [{
  Santos: true,
  PraiaGrande:false,
  Campinas:false,
  Bertioga:false

}]

function SwitchToArmando() {

  const [cidadeAtiva,setCidadeAtiva] = useState('Santos');

  const handleCidadeClick = (nomeCidade)=>{
    console.log(`Trocando o mapa para a cidade ${nomeCidade}`);
    setCidadeAtiva(nomeCidade);
    // console.log(setCidadeAtiva)
    console.log(urlWazeCidades.Santos)
  };


  
  return (
    <>
    <div>SwitchToArmando</div>
    <div className='div_ContentMapa'>
      {cidadeAtiva==='Santos' && (
        <iframe className='iframe_Waze' id='waze_Santos' src={urlWazeCidades.Santos} width="600" height="450" allowFullScreen></iframe>  
      )}
      
      
      {cidadeAtiva==='PraiaGrande' && (
        <iframe className='iframe_Waze' id='waze_PraiaGrande' src={urlWazeCidades.PraiaGrande} width="600" height="450" allowFullScreen></iframe>  
      )}

      {cidadeAtiva==='Campinas' && (
        <iframe className='iframe_Waze' id='waze_Campinas' src={urlWazeCidades.Campinas} width="600" height="450" allowFullScreen></iframe>  
      )}

      {cidadeAtiva==='Bertioga' && (
        <iframe className='iframe_Waze' id='waze_Bertioga' src={urlWazeCidades.Bertioga} width="600" height="450" allowFullScreen></iframe>  
      )}
      <Player/>
      <div id='innerMenu'>
        <div className="botoesCidades">
          <button className="botaoCidade" id='botaoCidade_Santos' onClick={()=>handleCidadeClick('Santos')}>Santos</button>
          <button className="botaoCidade" id='botaoCidade_PraiaGrande' onClick={()=>handleCidadeClick('PraiaGrande')}>Praia Grande</button>
          <button className="botaoCidade" id='botaoCidade_Campinas' onClick={()=>handleCidadeClick('Campinas')}>Campinas</button>
          <button className="botaoCidade" id='botaoCidade_Bertioga' onClick={()=>handleCidadeClick('Bertioga')}>Bertioga</button>
        </div>
      </div>
    </div>
    
    </>
  )
}

export default SwitchToArmando