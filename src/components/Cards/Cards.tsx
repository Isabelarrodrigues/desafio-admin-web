import React, { useState, useEffect } from 'react'
import ReqUsers from '../Model/ReqUsers'
import styled from 'styled-components'
import logo from '../../img/logo-stone.png'

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
function Cards() {
    document.title = 'Cartões'
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
            background-color: #c4c4c4;
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
    const CardStyle = styled.div`
        background-color: #02C06C;
        width: 500px;
        height: 260px;
        border-radius: 16px;
        overflow: hidden;
        position: relative;
        z-index: 3;

        img {
            position: absolute;
            top: 8px;
            left: 18px
        }
        p.status {
            font-size: 1.2rem;
            color: #2c2c2c;
            position: absolute;
            top: 14px;
            right: 20px;
        }

        h2 {
            font-size: 1.6rem;
            letter-spacing: 1.2px;
            color: #0c0c0c;
            position: absolute;
            bottom: 70px;
            left: 18px;
            text-transform: uppercase;
        }

        p.digits {
            font-size: 2rem;
            color: #1f1f1f;
            position: absolute;
            bottom: 20px;
            left: 18px
        }
    `

    const [cards, setCards] = useState([])

    useEffect(
    () => {
        ReqUsers('cards')
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

    return (
        <div>
            <h1>Rota de Cartões</h1>
            {cards ? (
                cards.map((index: CardsTypes) => {
                    console.log(index)
                    
                    if(index.status == 'requested') index.status = 'Solicitado'
                    if(index.status == 'approved') index.status = 'Aprovado'
                    if(index.status == 'rejected') index.status = 'Rejeitado'

                    const created = brazilianDateHour('Criado em', index.createdAt, 'criação')
                    const updated = brazilianDateHour('Atualizado em', index.updatedAt, 'atualização')
                    const name = nameValidation(index.metadatas.name)
                    
                    return (
                        <div className="containerCard" style={{margin: '0 auto'}}>
                        <DivCard>
                            <div className="card" key={index.id} style={{border: '1px solid lightblue'}}>
                                <img src={logo} style={{width: '85px'}} alt=""/>
                                <p className="status" title="Status">{`${index.status}`}</p>
                                <h2>{`${name}`}</h2>
                                <p className="digits">{`XXXX XXXX XXXX ${index.metadatas.digits}`}</p>
                            </div>
                            <div className="info" style={{marginLeft: '15px'}}>
                                <div>
                                    <h3>{`${created}`}</h3>
                                    <p>{`${updated}`}</p>
                                    <p>Limite: <strong>{`${(index.metadatas.limit).toLocaleString('pt-BR')},00`}</strong></p>
                                </div>
                            </div>
                        </DivCard>
                        </div>
                    )
                })
                ) : 'carregando...'}
        </div>
    )
}

export default Cards