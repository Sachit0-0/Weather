import React, { useState, useEffect } from 'react';
import WeatherForm from './WeatherForm';
import Weather from './Weather';
import 'bootstrap/dist/css/bootstrap.min.css';
import Charts from './Charts';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Animation from './Animation';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init();
  }, []);

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
      setError(null);
    } catch (error) {
      console.error(error);
      setError('Location does not exist. Please try again.');
    }
  };
  
  const getWeatherIconUrl = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  return (
    <div className="container">
      <h1 className="text-center mt-5 m-4 display-4">KNOW YOUR WEATHER</h1>
      <WeatherForm onSearch={fetchWeatherData} />
      <div className="row">
        <div className="col">
          {error ? (
            <div className="alert alert-danger text-center mt-4">{error}</div>
          ) : weatherData ? (
            <>
              <Weather
                weatherData={weatherData}
                getWeatherIconUrl={getWeatherIconUrl}
              />
              <Charts weatherData={weatherData} />
            </>
          ) : (
            <div className="d-flex justify-content-center align-items-center h-100">
              <Animation />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

