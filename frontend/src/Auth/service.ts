import { HttpClient } from "../httpClient";
import { ILogin, IRegister } from "./interface";

class AuthService extends HttpClient {
  constructor() {
    super("http://localhost:8000");
  }

  async registerUser(newUser: IRegister) {
    return this.post(`auth/register`, newUser);
  }

  async loginUser(newUser: ILogin) {
    return this.post(`auth/login`, newUser);
  }
}

export const authService = new AuthService();
