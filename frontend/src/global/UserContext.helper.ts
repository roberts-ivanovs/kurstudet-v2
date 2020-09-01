import { Requester } from 'utils/Requester';
import { UserTokens, User, AcessToken } from 'types';
import { RegisterUserResponse } from 'requesterTypes';

export const refreshTokenName = 'ks2refr';

export function setRefreshToken(refreshToken: string): void {
  // FIXME: Do not store refresh tokens in localstorage. use httpOnly cookies.
  // Currently the backend does not support that.
  window.localStorage.setItem(refreshTokenName, refreshToken);
}

export async function logIn(
  username: string,
  password: string,
  cbAcessRaw: (arg0: string) => void,
): Promise<void> {
  const tokens: UserTokens = await Requester.getToken({
    username,
    password,
  });

  Requester.setAuthHeader(tokens.access);

  setRefreshToken(tokens.refresh);
  cbAcessRaw(tokens.access);
  window.localStorage.removeItem('logout');
}

export async function logOut(cb: (arg0: User | null) => void): Promise<void> {
  Requester.setAuthHeader('');
  cb(null);
  window.localStorage.setItem('logout', Date.now().toString());
  window.localStorage.removeItem(refreshTokenName);
}

export async function getUser(
  userId: number,
  cb: (arg0: User) => void,
): Promise<void> {
  const user: User = await Requester.getUser({ userId });
  cb(user);
}

export async function refreshAcessToken(
  refreshToken: string,
  setAcessToken: (arg0: string) => void,
): Promise<void> {
  const refreshed: AcessToken = await Requester.getTokenRefresh({
    refresh: refreshToken,
  });
  setAcessToken(refreshed.access);
}

export async function register(
  username: string,
  email: string,
  password: string,
): Promise<RegisterUserResponse> {
  return Requester.postRegisterUser({ username, password, email });
}
