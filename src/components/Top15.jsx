import React from 'react';
import botaoClose from '../assets/icon-close.svg';
import "./top-15.css";
import { useState,useCallback, useEffect, useRef } from 'react';

const top15 = {
    0:{
        "nome":"STF autoriza prisão domiciliar de Bolsonaro por 90 dias",
        "url":"https://vtvnews.com.br/noticias/moraes-autoriza-prisao-domiciliar-bolsonaro/",
        "img":"https://vtvnews.com.br/wp-content/uploads/2026/03/CAPA-MATERIA-39-768x432.jpg",
        "isActive" : true
    },

    1:{
        "nome":"Inscrições para natação e hidroginástica começam quarta-feira (25) em Santos",
        "url":"https://vtvnews.com.br/baixada-santista/inscricoes-para-natacao-e-hidroginastica-comecam-quarta-b/",
        "img":"https://vtvnews.com.br/wp-content/uploads/2026/03/piscina-natacao-Santos-768x432.jpg",
        "isActive" : false
    },

    2:{
        "nome":"Minha Casa, Minha Vida amplia limite renda e vale para imóveis até R$ 600 mil",
        "url":"https://vtvnews.com.br/noticias/brasil/novos-limites-minha-casa-minha-vida-rs/",
        "img":"https://vtvnews.com.br/wp-content/uploads/2026/03/minha-casa-minha-vida-768x432.jpg",
        "isActive" : false
    },
    
    3:{
        "nome":"Operação Sem Desconto inicia delação premiada e colhe depoimento de Maurício Camisotti",
        "url":"https://vtvnews.com.br/noticias/delacao-mauricio-camisotti-inss-b/",
        "img":"https://vtvnews.com.br/wp-content/uploads/2026/03/Mauricio-Camisotti-768x432.jpg",
        "isActive" : false
    }
}
let gd= [0,2,3,4];
console.log(top15);

/*for(let i=0;i<4;i++){
    console.log(top15[i]["nome"],top15[i]["url"]);
}
console.log(top15[0]["nome"])
*/

function turnActive(top_i,i){
    if(!top_i[i].isActive){
        console.log("Está desativado");
        top_i[i].isActive=true;
        console.log("Agora está ativado");
        return top_i[i].img;

    }
    else{
        console.log("Está ativado");
        top_i[i].isActive=false;

    }
}

function printMaterias(imgUrl){
    
}



function Top15() {
    const materiaContainer = useRef(null);
    const materiaContainer0 = useRef(null);
    const materiaContainer1 = useRef(null);
    const materiaContainer2 = useRef(null);
    const materiaContainer3 = useRef(null);
    const containerBotoesEl= useRef(null);
    let isNewsOpen= false;
    
    console.log("---------------------------",materiaContainer);


    const handleMateriaAtual = (e)=>{
        console.log("Elemento clickado: ",e);
        console.log(e.currentTarget.children[1].classList.add("active"));
        isNewsOpen=true;
        e.currentTarget.children[1].classList.add("fullSize");
        

    }

    function toggleNewsWindows(isOpen){
        if(isOpen){
            
            isNewsOpen=false;

        }
    }

  

  return <>
    <div>
        <p>{turnActive(top15,0)}</p>
        <div class="top15-container">
            <div className="materia-container" ref={materiaContainer0} onClick={handleMateriaAtual} style={{ backgroundImage: `url(${top15[0].nome})` }}>
                <div>
                    <h2>{top15[0].nome}</h2>
                </div>
                <iframe class="site-embody hidden" src="https://vtvnews.com.br/porto-de-santos/tcu-suspende-repasses-para-o-tunel-santos-guaruja-b/" title="TCU suspende..." ></iframe>
            </div>
            <div className="materia-container" ref={materiaContainer1} onClick={handleMateriaAtual} style={{ backgroundImage: `url(${top15[1].nome})` }}>
                <div>
                    <h2>{top15[1].nome}</h2>
                </div>
                <iframe class="site-embody hidden" src={top15[1].url} title="TCU suspende..." ></iframe>
            </div>
            <div className="materia-container" ref={materiaContainer2} onClick={handleMateriaAtual} style={{ backgroundImage: `url(${top15[2].nome})` }}>
                <div>
                    <h2>{top15[2].nome}</h2>
                </div>
                <iframe class="site-embody hidden" src={top15[2].url} title="TCU suspende..." ></iframe>
            </div>
            <div className="materia-container" ref={materiaContainer3} onClick={handleMateriaAtual} style={{ backgroundImage: `url(${top15[3].nome})` }}>
                <div>
                    <h2>{top15[3].nome}</h2>
                </div>
                <iframe class="site-embody hidden" src={top15[3].url} title="TCU suspende..." ></iframe>
            </div>
        </div>

        <div className="botoes-embody-container" ref={containerBotoesEl}>
            <div className="botao-container">
                <img src={botaoClose} alt="botao Fecha aba"/>
            </div>
        </div>
        {/*<iframe class="site-embody" src="https://vtvnews.com.br/porto-de-santos/tcu-suspende-repasses-para-o-tunel-santos-guaruja-b/" title="TCU suspende..." ></iframe>*/}
    </div>

    
  </>
}

export default Top15
