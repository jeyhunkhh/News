import { HttpClient } from "../httpClient";
import { Base_Url } from "../httpClient/consts";

class NewsService extends HttpClient {
  constructor() {
    super(Base_Url);
  }

  async getNews() {
    return this.get("news");
  }

  async getNewsById(id: string) {
    return this.get(`news/${id}`);
  }
}
export const newsService = new NewsService();
