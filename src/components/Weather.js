import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThermometerHalf, faTint, faSun, faMoon, faCompass, faWind, faCloud, faCloudRain, faSnowflake } from '@fortawesome/free-solid-svg-icons';

function Weather({ weatherData, getWeatherIconUrl }) {
  if (!weatherData || !weatherData.list || weatherData.list.length === 0) {
    return <div className="alert alert-danger">No weather data available</div>;
  }

  const currentDate = new Date().toDateString();
  const currentWeather = weatherData.list.find(item => new Date(item.dt * 1000).toDateString() === currentDate);

  if (!currentWeather) {
    return <div className="alert alert-warning">No weather data available for today</div>;
  }

  const temperature = currentWeather.main.temp;
  const humidity = currentWeather.main.humidity;
  const sunrise = new Date(weatherData.city.sunrise * 1000).toLocaleTimeString();
  const sunset = new Date(weatherData.city.sunset * 1000).toLocaleTimeString();
  const pressure = currentWeather.main.pressure;
  const visibility = (currentWeather.visibility / 1000).toFixed(2); // Converting to kilometers and rounding to 2 decimal places
  const windSpeed = currentWeather.wind.speed;
  const cloudiness = currentWeather.clouds.all;
  const rainPossibility = currentWeather.pop > 0 ? (currentWeather.pop * 100).toFixed(2) : 0; // Rounding to 2 decimal places
  const snowPossibility = currentWeather.snow && currentWeather.snow['3h'] ? currentWeather.snow['3h'] : 0;

  // Get the URL for the weather icon
  const weatherIconUrl = getWeatherIconUrl(currentWeather.weather[0].icon);

  return (
    <div className="container">
 
      <div className="row">
        <div className="col-md-6">
          <h3>Date: {currentDate}</h3>
          <h2 className="text-center mt-4 mb-4">Weather for {weatherData.city.name}</h2>
          {/* Display the weather icon */}
          {weatherIconUrl && <img src={weatherIconUrl} alt="Weather Icon" className="img-fluid mb-3" />}
        </div>
        <div className="col-md-6">
          <div className="row">
            <div className="col-sm-4">
              <div className="card mb-3">
                <div className="card-body">
                  <p className="card-text"><FontAwesomeIcon icon={faThermometerHalf} /> Temperature: {temperature.toFixed(2)}°C</p>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card mb-3">
                <div className="card-body">
                  <p className="card-text"><FontAwesomeIcon icon={faTint} /> Humidity: {humidity}%</p>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card mb-3">
                <div className="card-body">
                  <p className="card-text"><FontAwesomeIcon icon={faSun} /> Sunrise: {sunrise}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4">
              <div className="card mb-3">
                <div className="card-body">
                  <p className="card-text"><FontAwesomeIcon icon={faMoon} /> Sunset: {sunset}</p>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card mb-3">
                <div className="card-body">
                  <p className="card-text"><FontAwesomeIcon icon={faCompass} /> Pressure: {pressure} hPa</p>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card mb-3">
                <div className="card-body">
                  <p className="card-text"><FontAwesomeIcon icon={faCompass} /> Visibility: {visibility} km</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4">
              <div className="card mb-3">
                <div className="card-body">
                  <p className="card-text"><FontAwesomeIcon icon={faWind} /> Wind Speed: {windSpeed} m/s</p>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card mb-3">
                <div className="card-body">
                  <p className="card-text"><FontAwesomeIcon icon={faCloud} /> Cloudiness: {cloudiness}%</p>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card mb-3">
                <div className="card-body">
                  <p className="card-text"><FontAwesomeIcon icon={faCloudRain} /> Rainfall Probability: {rainPossibility}%</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4">
              <div className="card">
                <div className="card-body">
                  <p className="card-text"><FontAwesomeIcon icon={faSnowflake} /> Snowfall Probability: {snowPossibility}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
