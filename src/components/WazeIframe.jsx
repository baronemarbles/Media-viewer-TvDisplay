import React from 'react'

let isSantos = false;
let isGrandeCampinas= true;
let wazeIframe_src_GrandeCampinas="https://embed.waze.com/iframe?zoom=12&lat=-22.054775&lon=-46.976654&ct=livemap";

function exibirIframe_Waze(iframe_src){
    return `<iframe src=${wazeIframe_src_GrandeCampinas}width="600" height="450" allowfullscreen></iframe>`;
}



function WazeIframe() {
  return (
    
    <div>WazeIframe</div>
  )
}

export default WazeIframe