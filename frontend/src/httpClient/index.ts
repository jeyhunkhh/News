import axios from "axios";

export class HttpClient {
  baseUrl;

  constructor(url: string) {
    this.baseUrl = url;
  }

  async get(url: string, header = false) {
    if (!header) {
      return await axios.get(`${this.baseUrl}/${url}`);
    } else {
      return await axios.get(`${this.baseUrl}/${url}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    }
  }

  async post(url: string, body: object, header = false) {
    if (!header) {
      return await axios.post(`${this.baseUrl}/${url}`, body);
    } else {
      return await axios.post(`${this.baseUrl}/${url}`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    }
  }

  async patch(url: string, body: object, header = false) {
    if (!header) {
      return await axios.patch(`${this.baseUrl}/${url}`, body);
    } else {
      return await axios.patch(`${this.baseUrl}/${url}`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    }
  }

  async delete(url: string, header = false) {
    if (!header) {
      return await axios.delete(`${this.baseUrl}/${url}`);
    } else {
      return await axios.delete(`${this.baseUrl}/${url}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    }
  }
}
