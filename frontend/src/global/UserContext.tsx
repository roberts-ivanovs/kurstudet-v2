import Requester from "utils/Requester";
import React, { createContext, useState, useEffect } from 'react';
import { User, UserTokens, Token, RefreshToken } from "types";

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

const Provider = ctxt.Provider;



//////////////////////////////////
/**
 * Furhter down is factual implementation of the context
 */
//////////////////////////////////


async function logIn(username: string, password: string, cbRefreshRaw: (arg0: string) => void, cbAcessRaw: (arg0: string) => void) {
  const tokens: UserTokens = await Requester.post("/api/core/token/", { username, password });

  Requester.setAuthHeader(tokens.access);

  cbRefreshRaw(tokens.refresh);
  cbAcessRaw(tokens.access);
}

async function logOut(cb: (arg0: User| null) => void) {
  Requester.setAuthHeader("");
  cb(null)
}

async function getUser(userId: number, cb: (arg0: User) => void) {
  const user: User = await Requester.get(`/api/core/user/${userId}/`);
  cb(user)
}


async function refreshAcessToken(refreshToken: string, setAcessToken: (arg0: string) => void) {
  console.log("Performing refresh");
  const refreshed: RefreshToken = await Requester.post("/api/core/token/refresh/", { refresh: refreshToken });
  console.log(refreshed.refresh);
  setAcessToken(refreshed.refresh);
}


function UserContextProvider({ children }: Props): React.ReactElement {
  const [user, setUser] = useState<User | null>(null);
  const [refreshTokenRaw, setRefreshTokenRaw] = useState<string>();
  const [accessTokenRaw, setAccessTokenRaw] = useState<string>();

  useEffect(() => {
    if (accessTokenRaw) {
      const payload_access: Token = JSON.parse(atob(accessTokenRaw.split(".")[1]));
      getUser(payload_access.user_id, setUser);
    }
  }, [accessTokenRaw]);

  useEffect(() => {
    if (refreshTokenRaw) {
      const timeout = setTimeout(() => { refreshAcessToken(refreshTokenRaw, setAccessTokenRaw); }, 3000);
    }
  }, [refreshTokenRaw]);

  return (
    <Provider value={{
      user,
      logIn: (username: string, password: string) => logIn(username, password, setRefreshTokenRaw, setAccessTokenRaw),
      logOut: () => {
        logOut(setUser)
        setRefreshTokenRaw("");
        setAccessTokenRaw("");
      },
    }

    }>
      {children}
    </Provider>
  )
}

const useUser = (): UserContextInterface => React.useContext(ctxt);

export { UserContextProvider, useUser };
