import { HttpClient } from "../httpClient";

class CovidService extends HttpClient {
  constructor() {
    super("https://disease.sh/v3/covid-19");
  }

  async getCovidGlobal() {
    return this.get("all");
  }

  async getCovidCountries() {
    return this.get("countries");
  }
}

export const covidService = new CovidService();
