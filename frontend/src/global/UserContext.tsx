import Requester from "../utils/Requester";
import React, { createContext, useState } from 'react';
import { User, UserLogin } from "../types";

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

async function logIn(username: string, password: string, cb: (arg0: User) => void) {
    const user: UserLogin = await Requester.post("api/core/login/", { username, password });
    cb(user.user);
    Requester.setAuthHeader(user.token);
}

async function logOut(cb: (arg0: User) => void) {
    await Requester.post("api/core/logout/");
    Requester.setAuthHeader("");
}

function UserContextProvider({ children }: Props): React.ReactElement {
    const [user, setUser] = useState<User | null>(null);
    return (
        <Provider value={{
            user,
            logIn: (username: string, password: string) => logIn(username, password, setUser),
            logOut: () => logOut(setUser),
        }

        }>
            {children}
        </Provider>
    )
}

const useUser = (): UserContextInterface => React.useContext(ctxt);

export { UserContextProvider, useUser };
