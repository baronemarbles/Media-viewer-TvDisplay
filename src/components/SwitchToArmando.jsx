import React, {useState} from 'react'
import Player from './player'

const urlWazeCidades= [{
  Santos:'https://embed.waze.com/iframe?zoom=9&lat=-23.151986400346722&lon=-46.59171888475036&ct=livemap',
  Praia_grande:'https://embed.waze.com/iframe?zoom=12&lat=-22.054775&lon=-46.976654&ct=livemap'
}]

const cidades= [{
  Santos: true,
  PraiaGrande:false,
  Campinas:false,
  Bertioga:false

}]
function toggleMapVisibility(cidade){

}

function SwitchToArmando() {
  const isShowingMaps = useState(false);  

  return (
    <>
    <div>SwitchToArmando</div>
    <div class='div_ContentMapa'>
      <iframe class='iframe_Waze' src="https://embed.waze.com/iframe?zoom=13&lat=-23.946802&lon=-46.366081&ct=livemap" width="600" height="450" allowfullscreen></iframe>
      <div id='innerMenu'>
        <Player/>
        <div className="botoesCidades">
          <button className="botaoCidade" id='botaoCidade_Santos'>Santos</button>
          <button className="botaoCidade" id='botaoCidade_PraiaGrande'>Praia Grande</button>
          <button className="botaoCidade" id='botaoCidade_Campinas'>Campinas</button>
          <button className="botaoCidade" id='botaoCidade_Bertioga'>Bertioga</button>
        </div>
      </div>
    </div>
    
    </>
  )
}

export default SwitchToArmando