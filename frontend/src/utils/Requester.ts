import Axios, { AxiosError } from 'axios';
import {
  RegisterUserRequest,
  TokenRequest,
  TokenRefreshRequest,
  UserRequest,
  RegisterUserResponse,
} from 'requesterTypes';
import { UserTokens, AcessToken, User, Programme } from 'types';

const apiClient = Axios.create({});

const urls = {
  'register-user': '/api/core/register/',
  'get-token': '/api/core/token/',
  'refresh-token': '/api/core/token/refresh/',
  'get-user': '/api/core/user/',
  programme: '/api/education/programme',
};

function isAxiosError(err: AxiosError | unknown): err is AxiosError {
  return (err as AxiosError).response !== undefined;
}

function handleError(err: AxiosError | unknown, url: string): void {
  if (isAxiosError(err)) {
    console.error(
      "Endpoint: '",
      url,
      "' returned an error\nMessage: ",
      err.message,
    );
  }
}

async function get<T, B>(url: string, params: B): Promise<T> {
  const response = await apiClient
    .get<T>(url, { params })
    .catch((err: AxiosError | unknown) => {
      handleError(err, url);
      throw err;
    });
  return response.data;
}

async function post<T, B>(url: string, params: B): Promise<T> {
  const response = await apiClient
    .post<T>(url, params)
    .catch((err: AxiosError | unknown) => {
      handleError(err, url);
      throw err;
    });
  return response.data;
}

class Requester {
  // getInstallations = (
  //   params: InstallationRequest,
  // ): Promise<InstallationReturn> => get(urls['get-all-installations'], params);

  registered401Cb: () => void;

  authHeader: { Authorization: string };

  constructor() {
    this.authHeader = { Authorization: '' };
    this.registered401Cb = () => {};
  }

  postRegisterUser = (
    params: RegisterUserRequest,
  ): Promise<RegisterUserResponse> => post(urls['register-user'], params);

  getToken = (params: TokenRequest): Promise<UserTokens> => get(urls['get-token'], params);

  getTokenRefresh = (params: TokenRefreshRequest): Promise<AcessToken> => get(urls['refresh-token'], params);

  getUser = (params: UserRequest): Promise<User> => get(`${urls['get-user']}${params.userId.toString()}/`, '');

  setAuthHeader = (token: string): void => {
    this.authHeader = { Authorization: `Bearer ${token}` };
  };

  // What to do if a request gets 401 -> call a callback
  registerAuthFail = (callback: () => void): void => {
    this.registered401Cb = callback;
  };

  getProgrammes = (
    params: unknown,
  ): Promise<Array<Programme>> => get(urls.programme, params);

}

const requesterInstance = new Requester();
export { requesterInstance as Requester };
