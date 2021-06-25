import { HttpClient } from "../httpClient";
import { Base_Url } from "../httpClient/consts";

class CategoriesService extends HttpClient {
  constructor() {
    super(Base_Url);
  }

  async getCategories() {
    return this.get("category");
  }

  async getCategoryById(id: string) {
    return this.get(`category/${id}`);
  }
}
export const categoriesService = new CategoriesService();
