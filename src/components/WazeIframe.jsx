import React, {useState,useRef} from 'react'
import Player from "./Player"
import '../wazeiframe.css'

const urlWazeCidades= {
  Santos:'https://embed.waze.com/pt-BR/iframe?zoom=12&lat=-23.947&lon=-46.366&ct=livemap',
  PraiaGrande: 'https://embed.waze.com/pt-BR/iframe?zoom=15&lat=-24.0054&lon=-46.4033&ct=livemap',
  Campinas: 'https://embed.waze.com/pt-BR/iframe?zoom=11&lat=-22.900&lon=-47.165&ct=livemap',
  Bertioga: 'https://embed.waze.com/pt-BR/iframe?zoom=12&lat=-23.797&lon=-46.027&ct=livemap',
  Hortolandia: 'https://embed.waze.com/pt-BR/iframe?zoom=12&lat=-22.858&lon=-47.200&ct=livemap',
  rd_Anhanguera:"https://embed.waze.com/pt-BR/iframe?zoom=12&lat=-22.906&lon=-47.169&ct=livemap",
  rd_SantosDumont:"https://embed.waze.com/pt-BR/iframe?zoom=12&lat=-23.162&lon=-47.397&ct=livemap",
  rd_DomPedro:"https://embed.waze.com/pt-BR/iframe?zoom=12&lat=-22.298&lon=-46.854&ct=livemap",
  rd_Bandeirantes:"https://embed.waze.com/pt-BR/iframe?zoom=12&lat=-23.425&lon=-46.808&ct=livemap",
  rd_Anchieta:"https://embed.waze.com/pt-BR/iframe?zoom=12&lat=-23.816&lon=-46.526&ct=livemap",
  rd_Imigrantes:"https://embed.waze.com/pt-BR/iframe?zoom=12&lat=-23.889&lon=-46.522&ct=livemap",
  rd_PeManoelNobrega:"https://embed.waze.com/pt-BR/iframe?zoom=10&lat=-24.229&lon=-46.945&ct=livemap"
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

 

function WazeIframe() {

   const containerRodoviasEl= useRef(null);
  const imagemToggle= useRef(null);
  
  const cd_Pnt = useRef(null);
  const cd_Santos = useRef(null);
  const cd_PraiaGrande = useRef(null);
  const cd_Campinas = useRef(null);
  const cd_Bertioga = useRef(null);
  const cd_Hortolandia = useRef(null);

  const rd1El= useRef(null);
  const rd_Anhanguera = useRef(null);
  const rd_SantosDumont = useRef(null);
  const rd_DomPedro = useRef(null);
  const rd_Bandeirantes = useRef(null);
  const rd_Anchieta = useRef(null);
  const rd_Imigrantes = useRef(null);
  const rd_PeManoelNobrega = useRef(null);
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
    // console.log(isRdExpanded[0]);
    // console.log(containerRodoviasEl.current.classList);
    // console.log(rd1El.current.classList);
    // rd1El.current.classList.toggle("btn-hidden");
    imagemToggle.current.classList.toggle("bttn-rotate")
    rd_Anhanguera.current.classList.toggle("btn-hidden");
    rd_SantosDumont.current.classList.toggle("btn-hidden");
    rd_DomPedro.current.classList.toggle("btn-hidden");
    rd_Bandeirantes.current.classList.toggle("btn-hidden");
    rd_Anchieta.current.classList.toggle("btn-hidden");
    rd_Imigrantes.current.classList.toggle("btn-hidden");
    rd_PeManoelNobrega.current.classList.toggle("rd_PeManoelNobrega");

    console.log(rdElmnts);

  };

   const handleTogglePnt = (array)=>{
     const arr=array;
    // console.log(array,arr,arr.length);
    for(var i=0;i<arr.length;i++){
      console.log(arr[i]);
      console.log(arr[i].current);
      arr[i].current.id.toggle("btn-hidden")
    }

  };



 const handleToggleRodoviasTeste = (e)=>{
    console.log(isRdExpanded[0]);
    console.log(rdElmnts.current.classList);
    console.log(rdElmnts);
    e.current.classList.toggle("btn-hidden");

  };

  return (
    <>
    <div className='div_ContentMapa'>

      <div className="slider" id="slide-santos">
        <iframe className='iframe_Waze' id='waze_Santos' src={urlWazeCidades.Santos} width="600" height="450" allowFullScreen></iframe>  
      </div>

      {/* <div className="slider">
        <iframe className='iframe_Waze' id='waze_Santos' src={urlWazeCidades.Santos} width="600" height="450" allowFullScreen></iframe>  
      </div> */}
        
      <div className="slider" id="slide-PraiaGrande">
        <iframe className='iframe_Waze' id='waze_PraiaGrande' src={urlWazeCidades.PraiaGrande} width="600" height="450" allowFullScreen></iframe>  
      </div>

      <div className="slider" id="slide-Campinas">
        <iframe className='iframe_Waze' id='waze_Campinas' src={urlWazeCidades.Campinas} width="600" height="450" allowFullScreen></iframe>  
      </div>

      <div className="slider" id="slide-Bertioga">
        <iframe className='iframe_Waze' id='waze_Bertioga' src={urlWazeCidades.Bertioga} width="600" height="450" allowFullScreen></iframe>  
      </div>
      <div className="slider" id="slide-Hortolandia">
        <iframe className='iframe_Waze' id='waze_Hortolandia' src={urlWazeCidades.Hortolandia} width="600" height="450" allowFullScreen></iframe>  
      </div>

      {cidadeAtiva==='rd_PeManoelNobrega' && (
        <iframe className='iframe_Waze' id='waze_rd_PeManoelNobrega' src={urlWazeCidades.rd_PeManoelNobrega} width="600" height="450" allowFullScreen></iframe>  
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
          <button ref={cd_Pnt} className="botaoCidade" id='botaoTogglePnt' onClick={()=>handleTogglePnt([cd_Santos,cd_PraiaGrande,cd_Campinas,cd_Bertioga,cd_Hortolandia])}>
            PNT
            <svg ref={imagemToggle} className="bttn-icons"id="img-toggle" fill="#f6f5f4" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 30.729 30.729" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M24.813,15.366L10.185,29.997c-0.487,0.487-1.128,0.731-1.768,0.731c-0.641,0-1.279-0.244-1.769-0.731 c-0.977-0.978-0.977-2.561,0-3.536l11.095-11.096L6.649,4.268c-0.976-0.977-0.976-2.56,0-3.536c0.977-0.977,2.56-0.976,3.536,0 L24.813,15.366z"></path> </g> </g></svg>
            </button>
          <button ref={cd_Santos} className="botaoCidade btn-hidden" id='botaoCidade_Santos' onClick={()=>handleCidadeClick('Santos')}>Santos</button>
          <button ref={cd_PraiaGrande} className="botaoCidade btn-hidden" id='botaoCidade_PraiaGrande' onClick={()=>handleCidadeClick('PraiaGrande')}>Praia Grande</button>
          <button ref={cd_Campinas} className="botaoCidade btn-hidden" id='botaoCidade_Campinas' onClick={()=>handleCidadeClick('Campinas')}><p>Campinas</p></button>
          <button ref={cd_Bertioga} className="botaoCidade btn-hidden" id='botaoCidade_Bertioga' onClick={()=>handleCidadeClick('Bertioga')}>Bertioga</button>
          <button ref={cd_Hortolandia} className="botaoCidade btn-hidden" id='botaoCidade_Hortolandia' onClick={()=>handleCidadeClick('Hortolandia')}>Hortolandia</button>
          <button ref={containerRodoviasEl} className="botaoCidade" id='botaoCidade_Rodovias' onClick={()=>handleToggleRodovias()}>
            {/* <div>
              <p>|</p>
              <p>|</p>
              <p>|</p>
              </div> */}
              <img src="https://www.svgrepo.com/show/37543/location-on-road.svg"/>
              {/* <img ref={imagemToggle} id="img-toggle" src='<svg fill="#f6f5f4" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 30.729 30.729" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M24.813,15.366L10.185,29.997c-0.487,0.487-1.128,0.731-1.768,0.731c-0.641,0-1.279-0.244-1.769-0.731 c-0.977-0.978-0.977-2.561,0-3.536l11.095-11.096L6.649,4.268c-0.976-0.977-0.976-2.56,0-3.536c0.977-0.977,2.56-0.976,3.536,0 L24.813,15.366z"></path> </g> </g></svg>'/> */}
              <svg ref={imagemToggle} className="bttn-icons img-toggle" fill="#f6f5f4" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 30.729 30.729" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M24.813,15.366L10.185,29.997c-0.487,0.487-1.128,0.731-1.768,0.731c-0.641,0-1.279-0.244-1.769-0.731 c-0.977-0.978-0.977-2.561,0-3.536l11.095-11.096L6.649,4.268c-0.976-0.977-0.976-2.56,0-3.536c0.977-0.977,2.56-0.976,3.536,0 L24.813,15.366z"></path> </g> </g></svg>
            </button>
          {/* <button ref={rd1El} className="botaoCidade btn-hidden" id='botaoCidade_Rodovias-1'>RD 1</button> */}
          <button ref={rd_PeManoelNobrega} className="botaoCidade  rodovias" id='botaoCidade_Rodovia-PeManoelNobrega' onClick={()=>handleCidadeClick('rd_PeManoelNobrega')}>Pe.Manoel Nobrega</button>
          <button ref={rd_Anhanguera} className="botaoCidade btn-hidden rodovias" id='botaoCidade_Rodovia-anhanguera' onClick={()=>handleCidadeClick('rd_Anhanguera')}>Anhanguera</button>
          <button ref={rd_SantosDumont} className="botaoCidade btn-hidden rodovias" id='botaoCidade_Rodovia-santosDumont' onClick={()=>handleCidadeClick('rd_SantosDumont')}>Santos Dumont</button>
          <button ref={rd_DomPedro} className="botaoCidade btn-hidden rodovias" id='botaoCidade_Rodovia-domPedro' onClick={()=>handleCidadeClick('rd_DomPedro')}>Dom Pedro</button>
          <button ref={rd_Bandeirantes} className="botaoCidade btn-hidden rodovias" id='botaoCidade_Rodovia-bandeirantes' onClick={()=>handleCidadeClick('rd_Bandeirantes')}>Bandeirantes</button>
          <button ref={rd_Anchieta} className="botaoCidade btn-hidden rodovias" id='botaoCidade_Rodovia-anchieta' onClick={()=>handleCidadeClick('rd_Anchieta')}>Anchieta</button>
          <button ref={rd_Imigrantes} className="botaoCidade btn-hidden rodovias" id='botaoCidade_Rodovia-imigrantes' onClick={()=>handleCidadeClick('rd_Imigrantes')}>Imigrantes</button>
          {/* <button className="botaoCidade btn-hidden rodovias" id='botaoCidade_Imigrantes' onClick={()=>handleCidadeClick('rd_Imigrantes')}>Imigrantes</button> */}
        </div>
      </div>
    </div>
    
    </>
  )
}

export default WazeIframe