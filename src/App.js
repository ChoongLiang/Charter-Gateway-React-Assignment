import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import Main from './containers/Main/Main';
import CustomerDetails from './containers/CustomerDetails/CustomerDetails';

function App() {
  return(
    <Router>
      <Switch>
        <Route exact path="/" component={Main}/>
        <Route exact path="/customerDetails/:name" component={CustomerDetails}/>
      </Switch>
    </Router>
  );
}

export default App;
