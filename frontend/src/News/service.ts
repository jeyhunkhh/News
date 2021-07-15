import { HttpClient } from "../httpClient";
import { Base_Url } from "../httpClient/consts";

class NewsService extends HttpClient {
  constructor() {
    super(Base_Url);
  }

  async getNews(searchQuery = "") {
    return this.get(`news?searchQuery=${searchQuery}`);
  }

  async getNewsById(id: string) {
    return this.get(`news/${id}`);
  }

  async addNews(newData: FormData) {
    return this.post("news", newData, true);
  }

  async updateNews(updateData: FormData, id: string) {
    return this.patch(`news/${id}`, updateData, true);
  }

  async deleteNews(id: string) {
    return this.delete(`news/${id}`, true);
  }
}
export const newsService = new NewsService();
