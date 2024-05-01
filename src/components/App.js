import React, { useState } from 'react';
import WeatherForm from './WeatherForm';
import Weather from './Weather';
import 'bootstrap/dist/css/bootstrap.min.css';
import Charts from './Charts';

function App() {
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=97020009c048157bd69c72ddc2b5510b&units=metric`
      );
  
      if (!response.ok) {
        throw new Error('City not found');
      }
  
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error(error);
    }
  };
  

  const getWeatherIconUrl = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mt-5">KNOW YOUR WEATHER</h1>
      <WeatherForm onSearch={fetchWeatherData} />
      <div className="row">
        <div className="">
          {weatherData && (
            <>
              <Weather
                weatherData={weatherData}
                getWeatherIconUrl={getWeatherIconUrl}
              />
              <Charts weatherData={weatherData} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
