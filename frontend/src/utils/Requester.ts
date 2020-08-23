
import Axios, { AxiosStatic } from 'axios';

class Requester {
  axios: AxiosStatic;
  authHeader: { Authorization: string };

  constructor() {
    this.axios = Axios;
    this.authHeader = { Authorization: "" };
  }

  post = async (url: string, data = {}): Promise<any> => {
    const response = await this.axios
      .post(url, data, { headers: this.authHeader })
      .catch((error) => error.response);
    return response.data;
  };

  get = async (url: string, params = ''): Promise<any> => {
    const response = await this.axios.get(url, {
      params,
      headers: this.authHeader
    });
    return response.data;
  };

  setAuthHeader = (token: string) => {
    this.authHeader = { 'Authorization': `Bearer ${token}` };
  }
}
const RequesterInstance = new Requester();
export default RequesterInstance;
