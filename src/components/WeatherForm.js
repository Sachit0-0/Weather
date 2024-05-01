import React, { useState } from 'react';

function WeatherForm({ onSearch }) {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(city);
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
        
        </div>
      </form>
    </div>
  );
}

export default WeatherForm;
