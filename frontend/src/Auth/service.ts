import { HttpClient } from "../httpClient";
import { Base_Url } from "../httpClient/consts";
import { ILogin, IRegister } from "./interface";

class AuthService extends HttpClient {
  constructor() {
    super(Base_Url);
  }

  async registerUser(newUser: IRegister) {
    return this.post(`auth/register`, newUser);
  }

  async loginUser(newUser: ILogin) {
    return this.post(`auth/login`, newUser);
  }

  async verifyUser() {
    return this.get(`auth/verify-user`, true);
  }
}

export const authService = new AuthService();
