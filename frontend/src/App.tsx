import React, { ReactElement, useEffect } from 'react';
import logo from './logo.svg';
import './App.scss';
import Requester from 'utils/Requester';

import { useUser } from 'global/UserContext';

interface Props {
  wasm: typeof import('wasm-app');
}

function App({ wasm }: Props): ReactElement {
  const user = useUser();

  // Sample login
  useEffect(() => {
    user.logIn('admin', 'admin');
  }, []);

  // Sample logout
  useEffect(() => {
    if (user.user?.id) {
      user.logOut();
    }
  }, [user.user]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit
          <code>
            src/App.tsx
          </code>
          and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
