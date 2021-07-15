import { HttpClient } from "../../httpClient/index";

class WeatherService extends HttpClient {
  constructor() {
    super("http://api.openweathermap.org/data/2.5");
  }

  async getWeather(city: string) {
    return this.get(`weather?q=${city}&appid=ce23662a1bf367a5e11eda8683341351`);
  }
}

export const weatherService = new WeatherService();
