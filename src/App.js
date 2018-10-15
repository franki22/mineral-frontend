import React, { Component } from 'react';
import {Provider} from "react-redux";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { store } from './store';
import { Header } from './components';
import { HomeContainer, TransactionContainer, BlockContainer, AccountContainer } from './containers';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Header /> 
            <Switch>
              <Route exact path="/" component={HomeContainer}/>
              <Route path="/transaction/:hash" component={TransactionContainer}/>
              <Route path="/block/:hash" component={BlockContainer}/>
              <Route path="/account/:address" component={AccountContainer}/>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;