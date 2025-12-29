import React, {useState,useRef} from 'react'
import Player from "./Player"
import '../app.css'

const urlWazeCidades= {
  Santos:'https://embed.waze.com/pt-BR/iframe?zoom=12&lat=-23.947&lon=-46.366&ct=livemap',
  PraiaGrande: 'https://embed.waze.com/pt-BR/iframe?zoom=15&lat=-24.0054&lon=-46.4033&ct=livemap',
  Campinas: 'https://embed.waze.com/pt-BR/iframe?zoom=11&lat=-22.900&lon=-47.165&ct=livemap',
  Bertioga: 'https://embed.waze.com/pt-BR/iframe?zoom=12&lat=-23.797&lon=-46.027&ct=livemap',
  rd_Anhanguera:"https://embed.waze.com/pt-BR/iframe?zoom=12&lat=-22.906&lon=-47.169&ct=livemap",
  rd_SantosDumont:"https://embed.waze.com/pt-BR/iframe?zoom=12&lat=-23.162&lon=-47.397&ct=livemap",
  rd_DomPedro:"https://embed.waze.com/pt-BR/iframe?zoom=12&lat=-22.298&lon=-46.854&ct=livemap",
  rd_Bandeirantes:"https://embed.waze.com/pt-BR/iframe?zoom=12&lat=-23.425&lon=-46.808&ct=livemap",
  rd_Anchieta:"https://embed.waze.com/pt-BR/iframe?zoom=12&lat=-23.816&lon=-46.526&ct=livemap",
  rd_Imigrantes:"https://embed.waze.com/pt-BR/iframe?zoom=12&lat=-23.889&lon=-46.522&ct=livemap",
}


const cidadesToggleState= [{
  Santos: true,
  PraiaGrande:false,
  Campinas:false,
  Bertioga:false,
  rd_Anhanguera:false,
  rd_SantosDumont:false,
  rd_DomPedro:false,
  rd_Bandeirantes:false,
  rd_Anchieta:false,
  rd_Imigrantes:false

}];



function SwitchToArmando() {
  const containerRodoviasEl= useRef(null);
  const rd1El= useRef(null);
  const rdElmnts= useRef(null);
  const [cidadeAtiva,setCidadeAtiva] = useState('Santos');
  const isRdExpanded = useState(false)

  const handleCidadeClick = (nomeCidade)=>{
    console.log(`Trocando o mapa para a cidade ${nomeCidade}`);
    setCidadeAtiva(nomeCidade);
    // console.log(setCidadeAtiva)
    console.log(urlWazeCidades.Santos)
  };

  const handleToggleRodovias = ()=>{
    console.log(isRdExpanded[0]);
    console.log(containerRodoviasEl.current.classList);
    console.log(rd1El.current.classList);
    rd1El.current.classList.toggle("btn-hidden");
    rdElmnts.current.classList.toggle("btn-hidden");
    console.log(rdElmnts);

  };

  containerRodoviasEl.addEventListener

 const handleToggleRodoviasTeste = (e)=>{
    console.log(isRdExpanded[0]);
    console.log(rdElmnts.current.classList);
    console.log(rdElmnts);
    e.current.classList.toggle("btn-hidden");

  };


  
  return (
    <>
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

      {cidadeAtiva==='rd_Anhanguera' && (
        <iframe className='iframe_Waze' id='waze_rd_Anhanguera' src={urlWazeCidades.rd_Anhanguera} width="600" height="450" allowFullScreen></iframe>  
      )}

      {cidadeAtiva==='rd_SantosDumont' && (
        <iframe className='iframe_Waze' id='waze_rd_SantosDumont' src={urlWazeCidades.rd_SantosDumont} width="600" height="450" allowFullScreen></iframe>  
      )}

      {cidadeAtiva==='rd_DomPedro' && (
        <iframe className='iframe_Waze' id='waze_rd_DomPedro' src={urlWazeCidades.rd_DomPedro} width="600" height="450" allowFullScreen></iframe>  
      )}

      {cidadeAtiva==='rd_Bandeirantes' && (
        <iframe className='iframe_Waze' id='waze_rd_Bandeirantes' src={urlWazeCidades.rd_Bandeirantes} width="600" height="450" allowFullScreen></iframe>  
      )}

      {cidadeAtiva==='rd_Anchieta' && (
        <iframe className='iframe_Waze' id='waze_rd_Anchieta' src={urlWazeCidades.rd_Anchieta} width="600" height="450" allowFullScreen></iframe>  
      )}

      {cidadeAtiva==='rd_Imigrantes' && (
        <iframe className='iframe_Waze' id='waze_rd_Imigrantes' src={urlWazeCidades.rd_Imigrantes} width="600" height="450" allowFullScreen></iframe>  
      )}
        <Player/>
      <div id='innerMenu'>
        <div className="botoesCidades">
          <button className="botaoCidade" id='botaoCidade_Santos' onClick={()=>handleCidadeClick('Santos')}>Santos</button>
          <button className="botaoCidade" id='botaoCidade_PraiaGrande' onClick={()=>handleCidadeClick('PraiaGrande')}>Praia Grande</button>
          <button className="botaoCidade" id='botaoCidade_Campinas' onClick={()=>handleCidadeClick('Campinas')}><p>Campinas</p></button>
          <button className="botaoCidade" id='botaoCidade_Bertioga' onClick={()=>handleCidadeClick('Bertioga')}>Bertioga</button>
          <button ref={containerRodoviasEl} className="botaoCidade" id='botaoCidade_Rodovias' onClick={()=>handleToggleRodovias()}>RD</button>
          <button ref={rd1El} className="botaoCidade btn-hidden" id='botaoCidade_Rodovias-1'>RD 1</button>
          <button ref={rdElmnts} className="botaoCidade btn-hidden rodovias" id='botaoCidade_Rodovias-2' onClick={()=>handleCidadeClick('rd_Anchieta')}>Anchieta</button>
          <button ref={rdElmnts} className="botaoCidade btn-hidden rodovias" id='botaoCidade_Rodovias-3' onClick={()=>handleCidadeClick('rd_Bandeirantes')}>Bandeirantes</button>
          <button className="botaoCidade btn-hidden rodovias" id='botaoCidade_Imigrantes' onClick={()=>handleCidadeClick('rd_Imigrantes')}>Imigrantes</button>
        </div>
      </div>
    </div>
    
    </>
  )
}

export default SwitchToArmando