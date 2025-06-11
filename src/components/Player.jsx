import React from 'react'

function Player() {
    const fs = require('fs');
    const dir='../assets'
    let qt_midia;

    fs.readdir(dir,(err,files)=>{
        qt_midia = files.length;
    });
  return (
    <div>
        <div className="div_midia-container">
            <h1>qt_midia</h1>
            <video id='video1'></video>
            
        </div>
    </div>
  )
}

export default Player