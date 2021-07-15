import React from "react";
import "./index.scss";
import { IWeatherCity } from "./interface";

const WeatherItem: React.FC<{ weatherData: IWeatherCity }> = ({
  weatherData,
}) => {
  return (
    <div className="col-lg-3 col-md-6 mb-3">
      <div className="card weather text-center p-3 bg-info">
        <h1 className="mb-0">{weatherData.name}</h1>
        <div>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt="weathertype"
            className="w-25"
          />
        </div>
        <h3>
          {(weatherData.main.temp - 273.15).toFixed(0)} <sup>o</sup>C
        </h3>
        <p className="weather-content">{weatherData.weather[0].description}</p>
        <p className="weather-content">{weatherData.wind.speed} m/s</p>
      </div>
    </div>
  );
};

export default WeatherItem;
