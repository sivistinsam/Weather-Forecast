import React from "react";
import "./current-weather.css";

// CurrentWeather component to display current weather information
const CurrentWeather = ({ data, temperatureUnit }) => {
  return (
    <div className="weather">
      {/* Top section with city name, weather description, and weather icon */}
      <div className="top">
        <div>
          <p className="city">{data.city}</p>
          <p className="weather-description">{data.weather[0].description}</p>
        </div>
        <img
          alt="weather"
          className="weather-icon"
          src={`icons/${data.weather[0].icon}.png`}
        />
      </div>

      {/* Bottom section with temperature, details, and parameter rows */}
      <div className="bottom">
        {/* Temperature display with unit conversion based on temperatureUnit */}
        <p className="temperature">
          {temperatureUnit === "metric"
            ? `${Math.round(data.main.temp)}°C`
            : `${Math.round((data.main.temp * 9) / 5 + 32)}°F`}
        </p>

        {/* Details section with Feels Like, Wind, Humidity, and Pressure */}
        <div className="details">
          {/* Parameter row for general details */}
          <div className="parameter-row">
            <span className="parameter-label">Details</span>
          </div>

          {/* Parameter row for Feels Like */}
          <div className="parameter-row">
            <span className="parameter-label">Feels Like</span>
            <span className="parameter-value">
              {temperatureUnit === "metric"
                ? `${Math.round(data.main.feels_like)}°C`
                : `${Math.round((data.main.feels_like * 9) / 5 + 32)}°F`}
            </span>
          </div>

          {/* Parameter row for Wind */}
          <div className="parameter-row">
            <span className="parameter-label">Wind</span>
            <span className="parameter-value">{data.wind.speed} m/s</span>
          </div>

          {/* Parameter row for Humidity */}
          <div className="parameter-row">
            <span className="parameter-label">Humidity</span>
            <span className="parameter-value">{data.main.humidity}%</span>
          </div>

          {/* Parameter row for Pressure */}
          <div className="parameter-row">
            <span className="parameter-label">Pressure</span>
            <span className="parameter-value">{data.main.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
