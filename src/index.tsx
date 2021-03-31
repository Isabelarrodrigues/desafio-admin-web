import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Dashboard from './components/DashBoard/DashBoard'
import Users from './components/Users/Users'
import Cards from './components/Cards/Cards'
import Audits from './components/Audits/Audits'

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <App />
      </Route>
      <Route exact path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="/users">
        <Users />
      </Route>
      <Route path="/cards">
        <Cards />
      </Route>
      <Route path="/audits">
        <Audits />
      </Route>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
