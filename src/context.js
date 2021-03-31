import React, { createContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'

// @function  UserContext
export const UserContext = createContext({ email: '', password: '', auth: false });

// @function  UserProvider
// Create function to provide UserContext
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ email: '', password: '', auth: false });

  const login = (email, password) => {
    setUser((user) => ({
      email: email,
      password: password,
      auth: true,
    }));
  };

  const logout = () => {
    setUser((user) => ({
        email: '',
        password: '',
        auth: false,
    }))
    return <Redirect to="/" />;
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Login Style
const LoginStyled = styled.aside`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 45%;
    justify-content: center;
    height: 100vh;
    background: #02C06C;
    background: linear-gradient(45deg, rgba(0,131,73,1) 0%, rgba(0,177,99,1) 50%, rgba(2,192,108,1) 100%);

    h1 {
        font-size: 32px;
        text-transform: uppercase;
        padding: 0;
        line-height: 1;
    }

    h2 {
        font-size: 24px;
        font-weight: 600;
        color: #181818;
    }

    p {
        color: #181818;
        margin: 3px 0 8px;
        font-weight: 500;
    }
    input {
        width: 70%;
        border: none;
        height: 40px;
        margin-bottom: 16px;
        border-radius: 20px;
        padding-left: 20px;
        outline: none;
    }

    button {
        width: 50%;
        border: none;
        border-radius: 20px;
        height: 32px;
        background-color: #181818;
        color: #fafafa;
        font-size: .9rem;
        margin-bottom: 50px;
        cursor: pointer;
        outline: none;
    }
`

// Login
export function LoginUser() {
    const { login } = React.useContext(UserContext);
    const { user, logout } = React.useContext(UserContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userData, setUserData] = useState([])

    async function reqLogin () {
        const url = process.env.NODE_ENV === "production"
        ? "/api"
        : "http://localhost:3001/api"
        const response = await fetch(`${url}/analysts`)
        const json = await response.json()
        return json
    }
    
    useEffect(() => {
        reqLogin()
            .then(data => {
                setUserData(data)
            })
    }, [])
    
    function inputEmail(event) {
        setEmail(event.target.value)
    }

    function inputPassword(event) {
        setPassword(event.target.value)
    }

    let loginError = false
    async function authenticateUser () {
        return await userData.map((item) => {
            if (item.email === email && item.password === password) {
                login(email, password)
            } else (
                loginError = true
            )
        })
    }

    return (
        <LoginStyled>
            <h1>Bem-vindo(a)</h1>
            <h2>ao IncrívelAdmin</h2>
            <p>o sistema de gestão financeira da Stone</p>
            <input type="text" value={email} onChange={inputEmail} name="emailField" id="email" placeholder="E-mail" />
            <input type="password" value={password} onChange={inputPassword} name="passwordField" id="userPassword" placeholder="Senha" />
                    
            <button onClick={() => authenticateUser()}>Entrar</button>
            {loginError == true && <p>Poxa, você não está cadastrado em nossa plataforma</p>}
        </LoginStyled>
    );
}

// @function  AuthApp
export function AuthApp() {
  const { user, logout } = React.useContext(UserContext);

  return (
    <>
      <h1>Hello, {user.email}!</h1>
      <button onClick={logout}>Logout</button>
      
    </>
  );
}