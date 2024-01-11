// Importing CSS styles and React components
import "./App.css";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/forecast";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api"; // Importing API key and URL
import { useState } from "react";

function App() {
  // State variables to store weather data, forecast, and temperature unit
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [temperatureUnit, setTemperatureUnit] = useState("metric"); // "metric" for Celsius, "imperial" for Fahrenheit

  // Function to toggle between Celsius and Fahrenheit
  const handleTemperatureUnitToggle = () => {
    setTemperatureUnit((prevUnit) =>
      prevUnit === "metric" ? "imperial" : "metric"
    );
  };

  // Function to handle search change and fetch weather data
  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=${temperatureUnit}`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=${temperatureUnit}`
    );

    // Fetching weather and forecast data using promises
    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        // Updating state with weather and forecast data
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      {/* Search component for user input */}
      <Search onSearchChange={handleOnSearchChange} />

      {/* Conditional rendering of toggle button and weather components */}
      {currentWeather && (
        <div className="toggle-container">
          <label className="temperature-label">
            Temperature Unit:
            <button
              className="toggle-button"
              onClick={handleTemperatureUnitToggle}
            >
              {temperatureUnit === "metric" ? "Celsius" : "Fahrenheit"}
            </button>
          </label>
        </div>
      )}

      {/* Rendering current weather component */}
      {currentWeather && (
        <CurrentWeather
          data={currentWeather}
          temperatureUnit={temperatureUnit}
        />
      )}

      {/* Rendering forecast component */}
      {forecast && (
        <Forecast data={forecast} temperatureUnit={temperatureUnit} />
      )}
    </div>
  );
}

export default App;
