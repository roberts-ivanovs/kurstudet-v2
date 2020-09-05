import React from 'react';

import {
  Switch,
  Route,
} from 'react-router-dom';
import { Programmes } from 'core/programmes/Programmes';
import { Forum } from 'core/forum/Forum';
import { About } from 'core/about/About';
import { Home } from 'core/home/Home';

export function Main(): React.ReactElement {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/programmes">
        <Programmes />
      </Route>
      <Route exact path="/forum">
        <Forum />
      </Route>
      <Route exact path="/about">
        <About />
      </Route>
      <Route exact path="/connect">
        {/* <Home /> */}
      </Route>
    </Switch>
  );
}
