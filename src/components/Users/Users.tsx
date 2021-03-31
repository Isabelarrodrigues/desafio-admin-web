import React, { useState, useEffect, useContext } from 'react'
import request from '../Model/request'
import styled from 'styled-components'
import LoginError from '../LoginError/LoginError'
import { UserContext } from '../../context'

const StyledUser = styled.div`
    background-color: #d1ebe0;
    border-radius: 10px;
    margin: 20px auto;
    width: 640px;
    padding: 16px;
    overflow-x: clip;
`

interface UsersTypes {
    name: string
    email: string
    BirthDate: string
    dateUser: string
    slice: any
    createdAt: string
    updatedAt: string
    address: any
    city: string
    state: string
    neighborhood: string
    postalCode: string
    streetNumber: number
    document: number
    salaryBase: number
    id: number
}

function Users() {
    document.title = 'Usuários'
    
    const [users, setUsers] = useState([])

    useEffect(
    () => {
        request('users')
            .then(data => setUsers(data))
    }, [])

    const nameValidation = (name: string) => {
        const alphabet = [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
            'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
            'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        ]
        const firstLetter = name[0]
        if(alphabet.indexOf(firstLetter) === -1) return `Nome não válido (${name})`
        else return name
    }
    
    const brazilianDateHour = (text: string, dateUser: string, dateInfo: string) => {
        if(!dateUser) return `Não foi possível encontrar a data de ${dateInfo} deste usuário(a)`
        else {
            const date = dateUser.slice(0,10).split('-').reverse().join('/')
            const hour = dateUser.slice(11, 16)
            return `${text} ${date} às ${hour}`
        }
    }
    
    const emailValidation = (email: string) => {
        const regexEmail : RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        const beforeDomain = email.split('@')[0].length
        if(!regexEmail.test(email) || beforeDomain < 5) return 'E-mail não válido'
        else return email
    }

    const documentValidation = (docNumber: number) => {
        const CPFString = docNumber.toString()
        const CPFNumber = CPFString.replace(/(\d{3})?(\d{3})?(\d{3})?(\d{2})/, "$1.$2.$3-$4")
        return CPFNumber
    }
    
    const {user}: any = useContext(UserContext)

    return user.auth ? (
        <div>
            <h1>Rota de Usuários</h1>
            {users ? (
                users.map((index: UsersTypes) => { 
                    const brazillianBirthDate = index.BirthDate.slice(0,10).split('-').reverse().join('/')
                    const created = brazilianDateHour('Criado em', index.createdAt, 'criação')
                    const updated = brazilianDateHour('Atualizado em', index.updatedAt, 'atualização')
                    const emailUser = emailValidation(index.email)

                    if (index.name) { 
                        return (
                            <StyledUser key={index.id} style={{border: '1px solid lightblue'}}>
                                <p>{`${nameValidation(index.name)}`}</p>
                                <p>{`${emailUser}`}</p>
                                <p>{`Data de Nascimento: ${brazillianBirthDate}`}</p>
                                <p>{`${created}`}</p>
                                <p>{`${updated}`}</p>
                                <p>{`N° ${index.address.streetNumber}, ${index.address.neighborhood}, ${index.address.city} - ${index.address.state}`}</p>
                                <p>{`CEP: ${index.address.postalCode}`}</p>
                                <p>{`CPF: ${documentValidation(index.document)}`}</p>
                                <p>{`Salário: ${(index.salaryBase / 100).toLocaleString('pt-BR')}`}</p>
                            </StyledUser>
                        )
                    }
                })
                ) : 'carregando...'}
        </div>
    ) : <LoginError />
}

export default Users