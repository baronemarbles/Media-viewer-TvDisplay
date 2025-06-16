// src/components/WeatherPage.jsx
import React, { useState, useEffect } from 'react';
import './WeatherPage.css'; // Usaremos este CSS novo

// Lista de cidades que queremos buscar
const CITIES_TO_FETCH = ['Santos', 'São Paulo', 'Guarujá', 'Campinas'];

function WeatherPage() {
  // O estado agora vai guardar um array de objetos de clima
  const [weatherDataList, setWeatherDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const [selectedCityName, setSelectedCityName] = useState('Santos');

  const handleCitySelect = (cityName) => {
        console.log(`Cidade selecionada: ${cityName}`);
        setSelectedCityName(cityName);
    };

  useEffect(() => {
    const fetchAllWeather = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Cria um array de "promessas" de busca para cada cidade
        const promises = CITIES_TO_FETCH.map(async (city) => {
          // Etapa 1: Geo para cada cidade
          const geoResponse = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`);
          const geoData = await geoResponse.json();
          if (geoData.length === 0) throw new Error(`Coordenadas não encontradas para ${city}`);
          
          const { lat, lon } = geoData[0];

          // Etapa 2: Clima para cada coordenada
          const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`);
          return weatherResponse.json();
        });

        // Espera todas as promessas serem resolvidas
        const results = await Promise.all(promises);
        
        // Armazena a lista completa de dados de clima no estado
        setWeatherDataList(results);

      } catch (err) {
        console.error("Erro ao buscar dados de clima:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllWeather();
  }, [apiKey]);

  if (isLoading) {
    return <div className="weather-loading">Carregando dados das cidades...</div>;
  }

  if (error) {
    return <div className="weather-error">Erro: {error}</div>;
  }
  
  // Separa a cidade principal (Santos) das outras
  const mainCityData = weatherDataList.find(data => data.name === selectedCityName);
  const otherCitiesData = weatherDataList.filter(data => data.name !== selectedCityName);

  return (
    <div className="weather-dashboard">
      
      {/* Coluna 1: Player Principal (Santos) */}
      {mainCityData && (
        <div className="main-weather-player">
          <p className="city-name">{mainCityData.name}</p>
          <div className="main-weather-content">
            <img 
              src={`https://openweathermap.org/img/wn/${mainCityData.weather[0].icon}@4x.png`} 
              alt={mainCityData.weather[0].description}
            />
            <p className="temperature">{Math.round(mainCityData.main.temp)}°C</p>
            <div className="main-min-max-temperature">
              <p className="min-max-temperature">{Math.round(mainCityData.main.temp_max)}°C</p>
              <p className="min-max-temperature">{Math.round(mainCityData.main.temp_min)}°C</p>
            </div>
          </div>
          <p className="description">{mainCityData.weather[0].description}</p>
          <div className="details">
            <span>Sensação: {Math.round(mainCityData.main.feels_like)}°C</span>
            <span>Umidade: {mainCityData.main.humidity}%</span>
          </div>
        </div>
      )}

      {/* Coluna 2: Lista das Outras Cidades */}
      <div className="side-cities-list">
        {otherCitiesData.map(cityData => (
          <div className="side-city-card" key={cityData.id} onClick={()=> handleCitySelect(cityData.name)}>
            <p className="side-city-name">{cityData.name}</p>
            <img 
              src={`https://openweathermap.org/img/wn/${cityData.weather[0].icon}@2x.png`} 
              alt={cityData.weather[0].description}
            />
            <p className="side-temperature">{Math.round(cityData.main.temp)}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherPage;