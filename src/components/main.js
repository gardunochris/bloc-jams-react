import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Landing from './Landing';
import Library from './Library';
import Album from './Album';



const Main = () => (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route path="/Library" component={Library} />
    <Route path="/Album" component={Album} />
  </Switch>
)

export default Main;
