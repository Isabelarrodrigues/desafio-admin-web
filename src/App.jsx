import React, { useEffect, useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./components/DashBoard/DashBoard";
import Login from "./components/Login/Login";
import { UserContext, LoginUser, AuthApp } from './context'

function App() {
  // const [users, setUsers] = useState([]);
  // const url =
  //   process.env.NODE_ENV === "production"
  //     ? "/api"
  //     : "http://localhost:3001/api";

  // useEffect(() => {
  //   fetch(`${url}/users`)
  //     .then(function (response) {
  //       return response.json();
  //     })
  //     .then(setUsers);
  // }, [url]);

  const { user } = React.useContext(UserContext);
  console.log(user.auth)
  return user.auth ? <Dashboard /> : <LoginUser />;
  // return (
  //   <div className="App">
  //     {/* <Login/> */}
  
  //     {/* <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //       <p>{JSON.stringify(users)}</p>
  //     </header> */}
  //   </div>
  // );
}

export default App;
