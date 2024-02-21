import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThermometerHalf, faTint, faSun, faMoon, faCompass } from '@fortawesome/free-solid-svg-icons';

function Weather({ weatherData, getWeatherIconUrl }) {
  // Get the URL for the weather icon
  const weatherIconUrl = getWeatherIconUrl(weatherData.weather[0].icon);

  return (
    <div>
      <h2>Weather for {weatherData.name}</h2>
      {/* Display the weather icon */}
      {weatherIconUrl && <img src={weatherIconUrl} alt="Weather Icon" />}
      <p><FontAwesomeIcon icon={faThermometerHalf} /> Temperature: {weatherData.main.temp}°C</p>
      <p><FontAwesomeIcon icon={faTint} /> Humidity: {weatherData.main.humidity}%</p>
      <p><FontAwesomeIcon icon={faSun} /> Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
      <p><FontAwesomeIcon icon={faMoon} /> Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
      <p><FontAwesomeIcon icon={faCompass} /> Pressure: {weatherData.main.pressure} hPa</p>
      <p><FontAwesomeIcon icon={faCompass} /> Visibility: {weatherData.visibility / 1000} km</p>
      <p><FontAwesomeIcon icon={faThermometerHalf} /> Max Temperature: {weatherData.main.temp_max}°C</p>
      <p><FontAwesomeIcon icon={faThermometerHalf} /> Min Temperature: {weatherData.main.temp_min}°C</p>
    </div>
  );
}

export default Weather;
