import React from 'react';
import ReactDOM from 'react-dom';
import { App } from 'App';
import * as serviceWorker from 'serviceWorker';
import { UserContextProvider } from 'global/UserContext';
import { Router } from 'react-router-dom';
import { history } from 'utils/history';

const rust = import('rust');

rust
  .then((m) => {
    ReactDOM.render(
      <Router history={history}>
        <React.StrictMode>
          <UserContextProvider>
            <App wasm={m} />
          </UserContextProvider>
        </React.StrictMode>
      </Router>,
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
