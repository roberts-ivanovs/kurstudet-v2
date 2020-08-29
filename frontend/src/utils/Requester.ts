import Axios, { AxiosStatic } from 'axios';

class Requester {
  axios: AxiosStatic;

  registered401Cb: () => void;

  authHeader: { Authorization: string };

  constructor() {
    this.axios = Axios;
    this.authHeader = { Authorization: '' };
    this.registered401Cb = () => { };
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
      headers: this.authHeader,
    });
    return response.data;
  };

  setAuthHeader = (token: string) => {
    this.authHeader = { Authorization: `Bearer ${token}` };
  }

  // What to do if a request gets 401 -> call a callback
  registerAuthFail = (callback: () => void) => {
    this.registered401Cb = callback;
  }
}
const RequesterInstance = new Requester();
export default RequesterInstance;
