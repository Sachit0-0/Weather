import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar,
  AreaChart, Area,
  ScatterChart, Scatter
} from 'recharts';

function CustomTooltip({ payload }) {
  if (payload && payload.length > 0) {
    const { date, time } = payload[0].payload;
    return (
      <div className="custom-tooltip">
        <p>Date: {date}</p>
        <p>Time: {time}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

function Chart({ chartData, children }) {
  return (
    <div className="col-md-6 mt-5 p">
      {children}
    </div>
  );
}

function Charts({ weatherData }) {
  if (!weatherData || !weatherData.list || weatherData.list.length === 0) {
    return <div>No weather data available</div>;
  }

  const dailyWeatherData = weatherData.list.map(item => ({
    day: new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
    date: new Date(item.dt * 1000).toLocaleDateString('en-US'),
    time: new Date(item.dt * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    temp: item.main.temp,
    humidity: item.main.humidity,
  }));

  if (dailyWeatherData.length === 0) {
    return <div>No weather forecast available for the week</div>;
  }

  return (
    <div  className="container mb-5 pb-5">
      <h2 data-aos="fade-right"
     data-aos-offset="300"
     data-aos-easing="ease-in-sine" className="text-center mt-5">Weather Forecast for the Week</h2>

      <div className="row mb-5">
        <Chart>
          <LineChart
            width={600}
            height={300}
            data={dailyWeatherData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="monotone" dataKey="temp" stroke="#8884d8" name="Temperature (°C)" />
          </LineChart>
        </Chart>

        <Chart>
          <BarChart
            width={600}
            height={300}
            data={dailyWeatherData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="temp" fill="#8884d8" name="Temperature (°C)" />
            <Bar dataKey="humidity" fill="#82ca9d" name="Humidity (%)" />
          </BarChart>
        </Chart>
      </div>

      <div className="row">
        <Chart>
          <AreaChart
            width={600}
            height={300}
            data={dailyWeatherData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area type="monotone" dataKey="temp" stroke="#8884d8" fill="#8884d8" name="Temperature (°C)" />
            <Area type="monotone" dataKey="humidity" stroke="#82ca9d" fill="#82ca9d" name="Humidity (%)" />
          </AreaChart>
        </Chart>

        <Chart>
          <ScatterChart
            width={600}
            height={300}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid />
            <XAxis dataKey="temp" name="Temperature (°C)" />
            <YAxis dataKey="humidity" name="Humidity (%)" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Scatter name="Weather" data={dailyWeatherData} fill="#8884d8" />
          </ScatterChart>
        </Chart>
      </div>
    </div>
  );
}

export default Charts;
