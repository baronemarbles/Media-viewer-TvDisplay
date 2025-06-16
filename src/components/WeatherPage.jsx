// src/components/WeatherPage.jsx
import React, { useState, useEffect } from 'react';
import './WeatherPage.css'; // Crie um CSS para estilizar se quiser

function WeatherPage() {
  // 1. ARMAZENAMENTO: Use useState para guardar os dados da API.
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pega a chave de API das variáveis de ambiente de forma segura
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  useEffect(() => {
    // Função para buscar os dados da API
    const fetchWeather = async () => {
      setIsLoading(true);
      setError(null);
      const city = "Santos"; // Cidade para a previsão

      try {
        // Etapa 1: Obter coordenadas da cidade
        const geoResponse = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`);
        if (!geoResponse.ok) throw new Error('Falha ao buscar coordenadas.');
        const geoData = await geoResponse.json();
        if (geoData.length === 0) throw new Error('Cidade não encontrada.');
        
        const { lat, lon } = geoData[0];

        // Etapa 2: Obter dados do clima usando as coordenadas
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`);
        if (!weatherResponse.ok) throw new Error('Falha ao buscar dados do clima.');
        const data = await weatherResponse.json();

        // 2. ARMAZENAMENTO: Coloca os dados da API no estado do React
        setWeatherData(data);

      } catch (err) {
        console.error("Erro na API de Clima:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, [apiKey]); // Roda o efeito quando o componente monta

  // 3. EXIBIÇÃO: Renderiza diferentes coisas com base no estado
  if (isLoading) {
    return <div className="weather-container">Carregando previsão do tempo...</div>;
  }

  if (error) {
    return <div className="weather-container error">Erro: {error}</div>;
  }

  // Se não está carregando e não há erro, exibe os dados!
  return (
    <>
      <div className='weather-wrapper'>
        <div className="weather-container">
          {weatherData && ( // Garante que weatherData não é nulo antes de tentar acessar
            <>
              <h1>{weatherData.name}</h1>
              <div className="weather-main">
                <img 
                  src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
                  alt={weatherData.weather[0].description}
                />
                <p className="temperature">{Math.round(weatherData.main.temp)}°C</p>
              </div>
              <p className="description">{weatherData.weather[0].description}</p>
              <div className="weather-details">
                <p>Sensação: {Math.round(weatherData.main.feels_like)}°C</p>
                <p>Umidade: {weatherData.main.humidity}%</p>
                <p>Vento: {weatherData.wind.speed} m/s</p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default WeatherPage;