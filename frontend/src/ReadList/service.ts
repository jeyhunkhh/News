import { HttpClient } from "../httpClient";
import { Base_Url } from "../httpClient/consts";

class ReadListService extends HttpClient {
  constructor() {
    super(Base_Url);
  }

  async getReadList() {
    return this.get(`user`, true);
  }

  async addReadList(news: object) {
    return this.post(`user/read-list`, news, true);
  }

  async removeNewsFromReadList(id: string) {
    return this.delete(`user/read-list/${id}`, true);
  }
}

export const readListService = new ReadListService();
