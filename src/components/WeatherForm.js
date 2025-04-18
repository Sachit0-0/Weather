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
            onSearch(cityName); 
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
        <div className="input-group mb-5">
          <input
            type="text"
            className=" fancy text2"
            placeholder="Enter desired location"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <div className="input-group-append">
   
            <button className="fancy" type="submit">
              <span className="top-key"></span>
              <span className="text">Search</span>
              <span className="bottom-key-1"></span>
              <span className="bottom-key-2"></span>
            </button>
      
            <button className="fancy" onClick={handleGetCurrentLocation} type="submit">
              <span className="top-key"></span>
              <span className="text">Use Device Location</span>
              <span className="bottom-key-1"></span>
              <span className="bottom-key-2"></span>
            </button>
       
          </div>
        </div>
      </form>
    </div>
  );
}

export default WeatherForm;
