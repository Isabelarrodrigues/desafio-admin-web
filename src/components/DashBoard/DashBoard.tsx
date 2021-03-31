import { userInfo } from 'node:os'
import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header/Header'
import { UserContext } from '../../context'
import styled from 'styled-components'
import LoginError from '../LoginError/LoginError'

const FlexLinks = styled.div`
    display: flex;
    justify-content: center;
    
    a, a:visited {
        text-decoration: none;
        color: #fafafa;
        margin-right: 8px;
        background-color: #02C06C;
        padding: 6px 16px;
        transition: filter .4s ease;
    }

    a:hover {
        filter: brightness(.9)
    }
`

const DashboardContainer = styled.section`
    height: 100vh;
    padding-top: 80px;
    text-align: center;

    h1 {
        font-size: 2rem;
    }
    p {
        font-size: 1.2rem;
        margin: 5px 0 12px;
    }
`

function Dashboard() {
    const {user}: any = React.useContext(UserContext)
    return user.auth ? (
        <>
            <Header />
            <DashboardContainer>
                <h1>Bem-vindo(a) {user.email}</h1>
                <p>O que desejar consultar?</p>
                <FlexLinks>
                    <Link to="/users">Usuários</Link>
                    <Link to="/cards">Cartões</Link>
                    <Link to="/Audits">Auditorias</Link>
                </FlexLinks>
            </DashboardContainer>
        </>
    ) : <LoginError />
}

export default Dashboard
