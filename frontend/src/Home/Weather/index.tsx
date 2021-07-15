import React, { useEffect, useState } from "react";
import { IWeatherCity } from "./interface";
import { weatherService } from "./service";
import WeatherItem from "./WeatherItem";

const Weather = () => {
  const [weather, setWeather] = useState<IWeatherCity[]>([]);

  useEffect(() => {
    weatherService
      .getWeather("baku")
      .then((res) => setWeather((prevState) => [...prevState, res.data]));
    weatherService
      .getWeather("istanbul")
      .then((res) => setWeather((prevState) => [...prevState, res.data]));
    weatherService
      .getWeather("moscow")
      .then((res) => setWeather((prevState) => [...prevState, res.data]));
  }, []);
  return (
    <div className="row my-5 justify-content-center">
      {weather.map((weatherData) => {
        return <WeatherItem key={weatherData.id} weatherData={weatherData} />;
      })}
    </div>
  );
};

export default Weather;
