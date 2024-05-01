import React, { useState } from 'react';

function WeatherForm({ onSearch }) {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(city);
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=97020009c048157bd69c72ddc2b5510b&units=metric`);
            if (!response.ok) {
              throw new Error('Failed to fetch weather data from coordinates.');
            }
            const data = await response.json();
            const cityName = data.name || '';
            onSearch(cityName); // Automatically search for weather data with obtained city name
          } catch (error) {
            console.error('Error fetching weather data from coordinates:', error);
            alert('Error fetching weather data. Please try again later.');
          }
        },
        (error) => {
          console.error('Error getting current location:', error);
          alert('Error getting current location. Please try again later.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };
  
  return (
    <div className="d-flex justify-content-center text-color black align-items-center h-100">
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="submit">
              Search
            </button>
            <button className="btn btn-outline-secondary" type="button" onClick={handleGetCurrentLocation}>
              Use Current Location
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default WeatherForm;
