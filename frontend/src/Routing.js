import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//Local imports
import Dashboard from './navigation/Dashboard.js';
import Admin from './navigation/Admin.js';
import Edit from './navigation/Edit.js';
import Settings from './navigation/Settings.js';

//Routing component qui va switcher de component en fonction du path 
//lorsque l'on clique sur un Link ou utilisation de useHistory
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