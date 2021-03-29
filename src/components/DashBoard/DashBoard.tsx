import React from 'react'
import { Link } from 'react-router-dom'

function Dashboard() {
    return (
        <>
            <Link to="/users">Usuários</Link>
            <Link to="/cards">Cartões</Link>
        </>
    )
}

export default Dashboard
