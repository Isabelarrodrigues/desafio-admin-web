import React, {useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import styled from 'styled-components'

interface LoginTypes {
    email: string
    password: string
    item: any
}

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
    }
`
function Login() {
    const [userData, setUserData] = useState([])
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [auth, setAuth] = useState(false)

    async function reqLogin () {
        const url = process.env.NODE_ENV === "production"
        ? "/api"
        : "http://localhost:3001/api"
        const response = await fetch(`${url}/analysts`)
        const json = await response.json()
        return json
    }

    function inputEmail(event) {
        setEmail(event.target.value)
        console.log(email)
    }

    function inputPassword(event) {
        setPassword(event.target.value)
        console.log(password)
    }

    function authenticateUser () {
        userData.map((item: LoginTypes) => {
            if (item.email === email && item.password === password) {
                setAuth(true)
            }
        })
    }
    useEffect(() => {
        reqLogin()
            .then(data => {
                setUserData(data)
            })
    }, [])

    return (
            <LoginStyled>
                <h1>Bem-vindo(a)</h1>
                <h2>ao IncrívelAdmin</h2>
                <p>o sistema de gestão financeira da Stone</p>
                <input type="text" value={email} onChange={inputEmail} name="emailField" id="email" placeholder="E-mail" />
                
                <input type="password" value={password} onChange={inputPassword} name="passwordField" id="userPassword" placeholder="Senha" />
                
                <button type="button" onClick={authenticateUser} children="Entrar" />
                {auth && <Redirect to="/cards" />}
            </LoginStyled>
    )
}

export default Login