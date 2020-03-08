import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './RouteWrapper';

import Home from '../views/Home';
import Login from '../views/Login';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/home" component={Home} isPrivate />
    </Switch>
  );
}
