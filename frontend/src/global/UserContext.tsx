import Requester from 'utils/Requester';
import React, {
  createContext, useState, useEffect, useCallback,
} from 'react';
import {
  User, UserTokens, Token, RefreshToken, AcessToken,
} from 'types';

interface Props {
  children: JSX.Element
}

export interface UserContextInterface {
  user: User | null;
  logIn: (username: string, password: string) => void,
  logOut: () => void,
}

export const ctxt = createContext<UserContextInterface>(
  // A proxy object allows to completely define the behavior of a proxied object
  // In this case if a parent component wont be wrapped in UserContextProvider
  // Then any calls made to access the context values will result in
  // Being cached by the proxy object and display the errors bellow
  new Proxy({} as UserContextInterface, {
    apply: () => {
      throw new Error('You must wrap your component in an UserContextProvider');
    },
    get: () => {
      throw new Error('You must wrap your component in an UserContextProvider');
    },
  }),
);

const { Provider } = ctxt;

/// ///////////////////////////////
/**
 * Furhter down is factual implementation of the context
 */
/// ///////////////////////////////

const refreshTokenName = 'ks2refr';

function setRefreshToken(refreshToken: string) {
  // FIXME: Do not store refresh tokens in localstorage. use httpOnly cookies.
  // Currently the backend does not support that.
  window.localStorage.setItem(refreshTokenName, refreshToken);
}

async function logIn(username: string, password: string, cbAcessRaw: (arg0: string) => void) {
  const tokens: UserTokens = await Requester.post('/api/core/token/', { username, password });

  Requester.setAuthHeader(tokens.access);

  setRefreshToken(tokens.refresh);
  cbAcessRaw(tokens.access);
  window.localStorage.removeItem('logout');
}

async function logOut(cb: (arg0: User | null) => void) {
  console.log('LOGOUT');

  Requester.setAuthHeader('');
  cb(null);
  window.localStorage.setItem('logout', Date.now().toString());
  window.localStorage.removeItem(refreshTokenName);
}

async function getUser(userId: number, cb: (arg0: User) => void) {
  const user: User = await Requester.get(`/api/core/user/${userId}/`);
  cb(user);
}

async function refreshAcessToken(refreshToken: string, setAcessToken: (arg0: string) => void) {
  const refreshed: AcessToken = await Requester.post('/api/core/token/refresh/', { refresh: refreshToken });
  setAcessToken(refreshed.access);
}

function UserContextProvider({ children }: Props): React.ReactElement {
  const [user, setUser] = useState<User | null>(null);
  const [accessTokenRaw, setAccessTokenRaw] = useState<string>();

  // Get token from memory
  const refreshTokenRaw = window.localStorage.getItem(refreshTokenName);
  const handle401: () => void = () => {
    logOut(setUser);
  };

  Requester.registerAuthFail(handle401);

  const loginFunction = (username: string, password: string) => {
    logOut(setUser);
    logIn(username, password, setAccessTokenRaw);
  };

  // Get acess token
  useEffect(() => {
    if (refreshTokenRaw && refreshTokenRaw.length > 0) {
      refreshAcessToken(refreshTokenRaw, setAccessTokenRaw);
    }
  }, [refreshTokenRaw]);

  // Get current user using acess token
  useEffect(() => {
    Requester.setAuthHeader(accessTokenRaw || '');
    if (accessTokenRaw && accessTokenRaw.length > 0) {
      const payloadAccess: Token = JSON.parse(atob(accessTokenRaw.split('.')[1]));
      getUser(payloadAccess.user_id, setUser);
    }
  }, [accessTokenRaw]);

  // Refresh acess token
  useEffect(() => {
    const payloadAccess: number = accessTokenRaw && refreshTokenRaw ? JSON.parse(atob(accessTokenRaw.split('.')[1])).exp : 999999999999;
    // Request the new token 3 seconds earlier just in case there's some
    // delay or slow connection
    const refr = (payloadAccess * 1000) - Date.now() - 3000;
    const interval = setInterval(() => {
      if (refreshTokenRaw) {
        refreshAcessToken(refreshTokenRaw, setAccessTokenRaw);
      }
    }, refr);
    return () => clearInterval(interval);
  }, [accessTokenRaw, refreshTokenRaw]);

  return (
    <Provider value={{
      user,
      logIn: loginFunction,
      logOut: () => {
        logOut(setUser);
        setAccessTokenRaw('');
      },
    }}
    >
      {children}
    </Provider>
  );
}

const useUser = (): UserContextInterface => React.useContext(ctxt);

export { UserContextProvider, useUser };
