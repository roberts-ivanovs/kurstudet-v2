/**
 * The main context provider for the User system.
 *
 * Wrap all of your components in the `UserContextProvider` and manage users
 * via `useUser` hook.
 */

import { Requester } from 'utils/Requester';
import React, { createContext, useState, useEffect } from 'react';
import { User, Token } from 'types';
import {
  refreshAcessToken,
  getUser,
  logIn,
  logOut,
  register,
  refreshTokenName,
} from 'global/UserContext.helper';

interface Props {
  children: JSX.Element;
}

export interface UserContextInterface {
  user: User | null;
  logIn: (username: string, password: string) => void;
  logOut: () => void;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
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

/**
 * Further down is factual implementation of the context
 */

function UserContextProvider({ children }: Props): React.ReactElement {
  const [user, setUser] = useState<User | null>(null);
  const [accessTokenRaw, setAccessTokenRaw] = useState<string>();

  // Get token from memory
  const refreshTokenRaw = window.localStorage.getItem(refreshTokenName);
  const handle401: () => void = () => {
    logOut(setUser);
  };

  Requester.registerAuthFail(handle401);

  const loginFunction = (username: string, password: string): void => {
    logOut(setUser);
    // TODO Catch should be handled appropriately
    logIn(username, password, setAccessTokenRaw).catch((err) => console.log(err));
  };

  // Get acess token
  useEffect(() => {
    if (refreshTokenRaw && refreshTokenRaw.length > 0) {
      // TODO Catch should be handled appropriately
      refreshAcessToken(refreshTokenRaw, setAccessTokenRaw).catch((err) => console.log(err));
    }
  }, [refreshTokenRaw]);

  // Get current user using acess token
  useEffect(() => {
    Requester.setAuthHeader(accessTokenRaw || '');
    if (accessTokenRaw && accessTokenRaw.length > 0) {
      const payloadAccess: Token = JSON.parse(
        atob(accessTokenRaw.split('.')[1]),
      );
      // TODO Catch should be handled appropriately
      getUser(payloadAccess.user_id, setUser).catch((err) => console.log(err));
    }
  }, [accessTokenRaw]);

  // Refresh acess token
  useEffect(() => {
    const payloadAccess: number = accessTokenRaw && refreshTokenRaw
      ? JSON.parse(atob(accessTokenRaw.split('.')[1])).exp
      : 999999999999;
    // Request the new token 3 seconds earlier just in case there's some
    // delay or slow connection
    const refr = payloadAccess * 1000 - Date.now() - 3000;
    const interval = setInterval(() => {
      if (refreshTokenRaw) {
        // TODO Catch should be handled appropriately
        refreshAcessToken(refreshTokenRaw, setAccessTokenRaw).catch((err) => console.log(err));
      }
    }, refr);
    return () => clearInterval(interval);
  }, [accessTokenRaw, refreshTokenRaw]);

  return (
    <Provider
      value={{
        user,
        logIn: loginFunction,
        logOut: () => {
          logOut(setUser);
          setAccessTokenRaw('');
        },
        register: async (username: string, email: string, password: string) => {
          const createduser = await register(username, email, password);
          // TODO Catch should be handled appropriately
          logIn(username, password, setAccessTokenRaw).catch((err) => console.log(err));
        },
      }}
    >
      {children}
    </Provider>
  );
}

const useUser = (): UserContextInterface => React.useContext(ctxt);

export { UserContextProvider, useUser };
