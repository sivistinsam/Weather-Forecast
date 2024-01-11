import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./forecast.css";

// Array representing days of the week
const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// Forecast component to display daily weather information
const Forecast = ({ data, temperatureUnit }) => {
  // Get the current day of the week
  const dayInAWeek = new Date().getDay();

  // Create an array of forecast days starting from the current day
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );

  return (
    <>
      {/* Label for the forecast section */}
      <label className="title">Daily</label>

      {/* Accordion component to display daily forecast items */}
      <Accordion allowZeroExpanded>
        {data.list.slice(0, 7).map((item, index) => (
          <AccordionItem key={index}>
            {/* Heading for each forecast item */}
            <AccordionItemHeading>
              <AccordionItemButton>
                {/* Content of each daily forecast item */}
                <div className="daily-item">
                  <img
                    alt="weather"
                    className="icon-small"
                    src={`icons/${item.weather[0].icon}.png`}
                  />
                  <label className="day">{forecastDays[index]}</label>
                  <label className="description">
                    {item.weather[0].description}
                  </label>
                  {/* Temperature display with unit conversion based on temperatureUnit */}
                  <label className="min-max">
                    {temperatureUnit === "metric"
                      ? `${Math.round(item.main.temp_min)}°C`
                      : `${Math.round((item.main.temp_min * 9) / 5 + 32)}°F`}
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>

            {/* Panel containing additional details for each forecast item */}
            <AccordionItemPanel>
              <div className="daily-details-grid">
                <div className="daily-details-grid-item">
                  <label>Pressure: </label>
                  <label>{item.main.pressure} hPa</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Humidity: </label>
                  <label>{item.main.humidity}%</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Clouds: </label>
                  <label>{item.clouds.all}%</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Speed: </label>
                  <label>{item.wind.speed} m/s</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Sea Level: </label>
                  <label>{item.main.sea_level} m</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Feels like: </label>
                  {/* Feels Like temperature with unit conversion based on temperatureUnit */}
                  <label>
                    {temperatureUnit === "metric"
                      ? `${Math.round(item.main.feels_like)}°C`
                      : `${Math.round((item.main.feels_like * 9) / 5 + 32)}°F`}
                  </label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Forecast;
