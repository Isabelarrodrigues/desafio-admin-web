import React, { useState } from 'react'
import { UserContext } from '../../context'
import styled from 'styled-components'
import { Redirect } from 'react-router';

const StyledHeader = styled.header`
    position: absolute;
    height: 50px;
    width: 100%;
    background-color: #1e9732;
    z-index: 999;
    left: 0;
    top: 0;
    padding: 0 64px 0 48px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
        display: flex;
        align-items: center;
        color: #fafafa;
    }
    div p {
        margin-right: 8px;
    }
    div button {
        border: none;
        padding: 5px 20px;
        background-color: #e8463c;
        border-radius: 10px;
        transition: background .4s ease;
        cursor: pointer;
        outline: none;
    }
    div button:hover {
        background: none;
    }
    div button i {
        font-size: 18px;
    }
    div button i:hover {
        color: #e8463c;
    }
`
export default function Header() {
    const { user, logout } = React.useContext(UserContext);
    const [loggedIn, setLoggedIn] = useState(true)
    return loggedIn ? (
            <StyledHeader>
            <h1>IncrívelAdmin</h1>
            <div>
                <p>{user.email}</p>
            <button title="Sair" onClick={() => {
                logout()
                setLoggedIn(false)
            }}><i class="fas fa-sign-out-alt"></i></button>
            </div>
        </StyledHeader>) : <Redirect to="/" />
        
        
}
