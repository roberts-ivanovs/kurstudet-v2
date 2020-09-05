import React, { ReactElement } from 'react';

// import { useUser } from 'global/UserContext';
import { Header } from 'core/PageBase/Header';
import { Main } from 'core/PageBase/Main';
import { Footer } from 'core/PageBase/Footer';

interface Props {
  wasm: typeof import('rust');
}

function App({ wasm }: Props): ReactElement {
  // const user = useUser();
  // // Sample login
  // useEffect(() => {
  //   setTimeout(() => {
  //     user.logIn('test', 'test');

  //   }, 1000)
  // }, []);

  // Sample logout
  // useEffect(() => {
  //   if (user.user?.id) {
  //     // user.logOut();
  //   }
  // }, [user.user?.username]);

  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

export { App };
