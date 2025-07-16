import React from 'react'
import Player from './player'


function SwitchToArmando() {
  return (
    <>
    <div>SwitchToArmando</div>
    <iframe src="https://embed.waze.com/iframe?zoom=12&lat=-22.054775&lon=-46.976654&ct=livemap" width="600" height="450" allowfullscreen></iframe>
    <div id='innerMenu'/>
    <Player/>
    
    </>
  )
}

export default SwitchToArmando