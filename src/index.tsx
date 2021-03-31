import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { UserProvider } from './context'
import Header from './components/Header/Header'
import Users from './components/Users/Users'
import Cards from './components/Cards/Cards'
import Audits from './components/Audits/Audits'
import Dashboard from './components/DashBoard/DashBoard'

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/users">
          <Header />
          <Users />
        </Route>
        <Route path="/cards">
          <Header />
          <Cards />
        </Route>
        <Route path="/audits">
          <Header />
          <Audits />
        </Route>
      </Switch>
      </UserProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
