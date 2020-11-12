import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//Local imports
import Dashboard from './Dashboard.js';
import Admin from './Admin.js';
import Edit from './Edit.js';
import Settings from './Settings.js';

export const Routing = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route path="/admin" component={Admin}/>
      <Route path="/edit" component={Edit}/>
      <Route path="/settings" component={Settings}/>
    </Switch>
  </BrowserRouter>
);

export default Routing;