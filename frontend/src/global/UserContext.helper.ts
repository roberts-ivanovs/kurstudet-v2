import Requester from 'utils/Requester';
import { UserTokens, User, AcessToken } from 'types';

export const refreshTokenName = 'ks2refr';

export function setRefreshToken(refreshToken: string) {
  // FIXME: Do not store refresh tokens in localstorage. use httpOnly cookies.
  // Currently the backend does not support that.
  window.localStorage.setItem(refreshTokenName, refreshToken);
}

export async function logIn(
  username: string, password: string, cbAcessRaw: (arg0: string) => void,
) {
  const tokens: UserTokens = await Requester.post('/api/core/token/', { username, password });

  Requester.setAuthHeader(tokens.access);

  setRefreshToken(tokens.refresh);
  cbAcessRaw(tokens.access);
  window.localStorage.removeItem('logout');
}

export async function logOut(cb: (arg0: User | null) => void) {
  Requester.setAuthHeader('');
  cb(null);
  window.localStorage.setItem('logout', Date.now().toString());
  window.localStorage.removeItem(refreshTokenName);
}

export async function getUser(userId: number, cb: (arg0: User) => void) {
  const user: User = await Requester.get(`/api/core/user/${userId}/`);
  cb(user);
}

export async function refreshAcessToken(
  refreshToken: string, setAcessToken: (arg0: string) => void,
) {
  const refreshed: AcessToken = await Requester.post('/api/core/token/refresh/', { refresh: refreshToken });
  setAcessToken(refreshed.access);
}

export async function register(username: string, email: string, password: string): Promise<User> {
  return Requester.post('/api/core/reigster/', { username, password, email });
}
