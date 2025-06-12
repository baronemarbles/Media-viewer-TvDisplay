const chaveApiWeather='REMOVED_SECRET'
const apiGeoURL= `http://api.openweathermap.org/geo/1.0/direct?q=Santos&limit=1&appid=${chaveApiWeather}`
const coordenadasCidade = new Map();
fetch(apiGeoURL)
.then(response =>{
    if(!response.ok){
        throw new Error(`Erro de rede: ${response.status}`)
    }
    else{
        return response.json();
    }
})
.then(data=>{
    console.log('Dados da API Geolocalizacao para coordenada: ')
    console.log(data)
    coordenadasCidade.set('latitude',data[0].lat)
    coordenadasCidade.set('longitude',data[0].lon)
    console.log(coordenadasCidade)
})
.catch(error=>{
    console.log(`Ocorreu um erro: ${error}`)
})


/*API CLIMA*/
const apiClimaURL = `https://api.openweathermap.org/data/2.5/weather?lat=${coordenadasCidade.get('latitude')}&lon=${coordenadasCidade.get('longitude')}&appid=${chaveApiWeather}&lan=pt_br`
console.log('ORRA'+apiClimaURL)