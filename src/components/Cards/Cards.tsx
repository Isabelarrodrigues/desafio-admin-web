import React, { useState, useEffect, useContext } from 'react'
import request from '../Model/request'
import styled from 'styled-components'
import logo from '../../img/logo-stone.png'
import Header from '../Header/Header'
import { UserContext } from '../../context'
import LoginError from '../LoginError/LoginError'


interface CardsTypes {
    createdAt: string
    updatedAt: string
    status: string
    id: number
    user_id: number
    metadatas: any
    name: string
    digits: number
    limit: number
}

interface statusChangeTypes {
    createdAt: string
    updatedAt: any
    status: string
    id: number
    user_id: number
    metadatas: {
        name: string
        digits: number
        limit: number
    } 
}

// style
const DivCard = styled.div`
    display: flex;

    div.info {
        display: grid;
        place-items: center;
        
        position: absolute;
        left: 75px;
        height: 260px;
        padding: 0 30px;
        background-color: #d8d8d8;
        border-radius: 0 16px 16px 0;
        z-index: 2;
        transition: 1s ease left
    }

    div.info:hover {
        left: 515px;
    }

    div.info h3 {
        font-size: 1.4rem;
        font-weight: 500;
    }
    div.info p {
        font-weight: 400;
    }

    div.card {
        background-color: #02C06C;
        width: 500px;
        height: 260px;
        border-radius: 16px;
        overflow: hidden;
        position: relative;
        left: 50px;
        margin-bottom: 15px;
        z-index: 3;
    }

    div.card img {
        position: absolute;
        top: 8px;
        left: 18px
    }
    div.card p.status {
        font-size: 1.2rem;
        color: #2c2c2c;
        position: absolute;
        top: 14px;
        right: 20px;
    }

    div.card h2 {
        font-size: 1.6rem;
        letter-spacing: 1.2px;
        color: #0c0c0c;
        position: absolute;
        bottom: 70px;
        left: 18px;
        text-transform: uppercase;
    }

    div.card p.digits {
        font-size: 2rem;
        color: #1f1f1f;
        position: absolute;
        bottom: 20px;
        left: 18px
    }
`

const StyledActionButtons = styled.div`
    margin: 0 0 15px 50px;
    button {
        border: none;
        width: 150px;
        padding: 10px;
        border-radius: 8px;
        text-transform: uppercase;
        font-weight: 600;
        cursor: pointer;
        transition: filter .4s ease;
    }
    
    button:hover {
        filter: brightness(.9)
    }

    .approveButton {
        background-color: #15d438;
        margin-right: 8px;
    }

    .rejectButton {
        background-color: #e8463c;
    }
`

function Cards() {
    document.title = 'Cartões'
    
    const [cards, setCards] = useState([])

    useEffect(
    () => {
        request('cards')
            .then(data => setCards(data))
    }, [])

    const nameValidation = (name: string) => {
        const alphabet = [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
            'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
            'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        ]
        if(!name) return `Nome não válido (${name})`
        else if (alphabet.indexOf(name[0]) === -1) {
            return `Nome não válido (${name})` 
        }
        else return name
    }

    const brazilianDateHour = (text: string, dateUser: string, dateInfo: string) => {
        if(!dateUser) return `Não foi possível encontrar a data de ${dateInfo} deste cartão`
        else {
            const date = dateUser.slice(0,10).split('-').reverse().join('/')
            const hour = dateUser.slice(11, 16)
            return `${text} ${date} às ${hour}`
        }
    }

    const statusChange = async (obj: statusChangeTypes, id: number) => {
        const changeId = obj

        const config = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },    
            body: JSON.stringify(changeId)
        }

        return await fetch(`http://localhost:3001/api/cards/${id}`, config)
    }

    const registerAuditLog = async (obj: any, userID: any) => {
        
        const getAuditsLength = async () => {
            const getAudits = await fetch('http://localhost:3001/api/audits')
            const auditsJSON = await getAudits.json()
            return auditsJSON.length - 1
        }
        
        const resCard = await fetch(`http://localhost:3001/api/cards/${userID}`)
        const resCardJSON  = await resCard.json()
        
        const date = new Date
        const auditDate = date.toISOString()

        const auditID = await getAuditsLength().then(length => length + 1) 
        const objAudit = {
            "id": auditID,
            "createdAt": auditDate,
            "type": "card-status-change",
            "before": obj,
            "after": {
                "createdAt": resCardJSON.createdAt,
                "id": resCardJSON.id,
                "metadatas": {
                  "name": resCardJSON.metadatas.name,
                  "digits": resCardJSON.metadatas.digits
                },
                "digits": resCardJSON.metadatas.digits,
                "name": resCardJSON.metadatas.name,
                "status": resCardJSON.status,
                "updatedAt": resCardJSON.user_id,
                "user_id": resCardJSON.user_id
              },
              "requestedBy": 11112
        }

        return await fetch('http://localhost:3001/api/audits',  {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },    
            body: JSON.stringify(objAudit)
        })
    }

    const { user }: any = useContext(UserContext);

    return user.auth ? (
        <div>
            <Header />
            <h1>Rota de Cartões</h1>
            {cards ? (
                cards.map((index: CardsTypes) => {
                    
                    // if(index.status == 'requested') index.status = 'Solicitado'
                    // if(index.status == 'approved') index.status = 'Aprovado'
                    // if(index.status == 'rejected') index.status = 'Rejeitado'

                    const created = brazilianDateHour('Criado em', index.createdAt, 'criação')
                    const updated = brazilianDateHour('Atualizado em', index.updatedAt, 'atualização')
                    const name = nameValidation(index.metadatas.name)
                    
                    const objApproved = {
                        "createdAt": index.createdAt,
                        "updatedAt": index.updatedAt,
                        "status": "approved",
                        "id": index.id,
                        "user_id": index.user_id,
                        "metadatas": {
                            "name": index.metadatas.name,
                            "digits": index.metadatas.digits,
                            "limit": index.metadatas.limit
                        }
                    }

                    const objRejected = {
                        "createdAt": index.createdAt,
                        "updatedAt": index.updatedAt,
                        "status": "rejected",
                        "id": index.id,
                        "user_id": index.user_id,
                        "metadatas": {
                            "name": index.metadatas.name,
                            "digits": index.metadatas.digits,
                            "limit": index.metadatas.limit
                        }
                    }

                    const logAudit = {
                          "createdAt": index.createdAt,
                          "id": index.id,
                          "metadatas": {
                            "name": index.metadatas.name,
                            "digits": index.metadatas.digits
                          },
                          "digits": index.metadatas.digits,
                          "name": index.metadatas.name,
                          "status": index.status,
                          "updatedAt": index.updatedAt,
                          "user_id": index.user_id
                        }

                    return (
                        <div style={{margin: '20px auto'}}>
                        <DivCard>
                            <div className="card" key={index.id} style={{border: '1px solid lightblue'}}>
                                <img src={logo} style={{width: '85px'}} alt="Logo Stone"/>
                                <p className="status" title="Status">
                                    {`${index.status === 'rejected' && 'Rejeitado' || index.status === 'approved' && 'Aprovado' || index.status === 'requested' && 'Solicitado'}`}</p>
                                <h2>{`${name}`}</h2>
                                <p className="digits">{`XXXX XXXX XXXX ${index.metadatas.digits}`}</p>
                            </div>
                            <div className="info" style={{ marginLeft: '15px' }}>
                                <div>
                                    <h3>{`${created}`}</h3>
                                    <p>{`${updated}`}</p>
                                    <p>Limite: <strong>{`${(index.metadatas.limit).toLocaleString('pt-BR')},00`}</strong></p>
                                </div>
                            </div>
                        </DivCard>
                        <StyledActionButtons>
                            <button className="approveButton" onClick={() => {
                                statusChange(objApproved, index.id)
                                setTimeout(() => registerAuditLog(logAudit, index.id), 3000);
                                
                                }}>Aprovar</button>
                            <button className="rejectButton" onClick={() => {
                                statusChange(objRejected, index.id)
                                setTimeout(() => registerAuditLog(logAudit, index.id), 3000);
                                }}>Rejeitar</button>
                        </StyledActionButtons>
                        </div>
                    )
                })
                ) : 'carregando...'}
        </div>
    ) : <LoginError />
}

export default Cards