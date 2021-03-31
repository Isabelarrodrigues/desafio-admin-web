import React from "react";
import { Redirect } from "react-router";
// import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./components/DashBoard/DashBoard";
import { UserContext, LoginUser, AuthApp } from './context'

function App() {
  const { user } = React.useContext(UserContext);

  return user.auth ? <Redirect to="/dashboard" /> : <LoginUser />;
}

export default App;
