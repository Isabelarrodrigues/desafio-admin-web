import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledLoginError = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`

export default function LoginError() {
    return (
        <StyledLoginError>
            <h4>Você não está logado(a), portanto essa página não pode ser acessada.</h4>
            <Link to="/">Voltar à tela de login ►</Link>
        </StyledLoginError>
    )
}
