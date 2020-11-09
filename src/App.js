import React from 'react';
import { Route, Switch } from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/withStyles';

import AppStyle from './App.css';


import Dashboard from './Components/Dashboard';
import Loading from './Components/Loading'


function App(props) {
  const { res } = props
  console.log(res)
  return (
    <main className="mainpage">
      <Switch>
        <Route exact path="/">
          {res ? <Loading /> : <Dashboard />}
        </Route>
      </Switch>
    </main>
  )
}

export default withStyles(AppStyle)(App)