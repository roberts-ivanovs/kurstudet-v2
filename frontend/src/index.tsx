import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { UserContextProvider } from "./global/UserContext";

const rust = import('wasm-app');

rust
  .then((m) => {
    ReactDOM.render(
      <React.StrictMode>
        <UserContextProvider>
          <App wasm={m} />
        </UserContextProvider>
      </React.StrictMode>,
      document.getElementById('root'),
    );
  })
  .catch((e) => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.log(`Something went wrong when fetching wasm!\n${e}`);
  });


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
