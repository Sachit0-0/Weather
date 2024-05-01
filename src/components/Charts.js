import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, AreaChart, Area, ScatterChart, Scatter } from 'recharts';

function Charts({ weatherData }) {
  if (!weatherData || !weatherData.list || weatherData.list.length === 0) {
    return <div>No weather data available</div>;
  }

  const dailyWeatherData = weatherData.list.map(item => ({
    day: new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
    date: new Date(item.dt * 1000).toLocaleDateString('en-US'),
    temp: item.main.temp,
    humidity: item.main.humidity,
    // Add other weather parameters here
  }));

  if (dailyWeatherData.length === 0) {
    return <div>No weather forecast available for the week</div>;
  }

  return (
    <div className="container">
      <h2 className="text-center mt-5">Weather Forecast for the Week</h2>

      {/* Line Chart and Bar Chart */}
      <div className="row">
        <div className="col-md-6 mt-5 p">
          {/* Line Chart */}
          <LineChart
            width={600}
            height={300}
            data={dailyWeatherData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip 
              content={({ label, payload }) => {
                if (payload && payload.length > 0) {
                  const { date } = payload[0].payload;
                  return (
                    <div className="custom-tooltip">
                      <p>Date: {date}</p>
                      {payload.map((entry, index) => (
                        <p key={index} style={{ color: entry.color }}>
                          {`${entry.name}: ${entry.value}`}
                        </p>
                      ))}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="temp" stroke="#8884d8" name="Temperature (°C)" />
          </LineChart>
        </div>
        <div className="col-md-6 mt-5  ">
          {/* Bar Chart */}
          <BarChart
            width={600}
            height={300}
            data={dailyWeatherData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="temp" fill="#8884d8" name="Temperature (°C)" />
            <Bar dataKey="humidity" fill="#82ca9d" name="Humidity (%)" />
          </BarChart>
        </div>
      </div>

      {/* Area Chart and Scatter Chart */}
      <div className="row">
        <div className="col-md-6 mt-5 pt-5">
          {/* Area Chart */}
          <AreaChart
            width={600}
            height={300}
            data={dailyWeatherData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="temp" stroke="#8884d8" fill="#8884d8" name="Temperature (°C)" />
            <Area type="monotone" dataKey="humidity" stroke="#82ca9d" fill="#82ca9d" name="Humidity (%)" />
          </AreaChart>
        </div>
        <div className="col-md-6 mt-5 pt-5">
          {/* Scatter Chart */}
          <ScatterChart
            width={600}
            height={300}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid />
            <XAxis dataKey="temp" name="Temperature (°C)" />
            <YAxis dataKey="humidity" name="Humidity (%)" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            <Scatter name="Weather" data={dailyWeatherData} fill="#8884d8" />
          </ScatterChart>
        </div>
      </div>
    </div>
  );
}

export default Charts;
