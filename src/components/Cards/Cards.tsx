import React, { useState, useEffect } from 'react'
import ReqUsers from '../Model/ReqUsers'
import styled from 'styled-components'

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
    const CardStyle = styled.div`
        background-color: #02C06C;
        width: 500px;
        height: 260px;
        border-radius: 16px;
        position: relative;
        p.status {
            font-size: 1.2rem;
            position: absolute;
            top: 0;
            right: 15px;
        }

        h2 {
            font-size: 1.8rem;
            position: absolute;
            bottom: 80px;
            left: 15px;
            text-transform: uppercase;
        }

        p.digits {
            font-size: 2rem;
            position: absolute;
            bottom: 20px;
            left: 15px
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
                        <div>
                            <CardStyle key={index.id} style={{border: '1px solid lightblue'}}>
                                <p className="status" title="Status">{`${index.status}`}</p>
                                <h2>{`${name}`}</h2>
                                <p className="digits">{`XXXX XXXX XXXX ${index.metadatas.digits}`}</p>
                            </CardStyle>
                            <p>{`${created}`}</p>
                            <p>{`${updated}`}</p>
                            <p>{`Limite: ${(index.metadatas.limit).toLocaleString('pt-BR')},00`}</p>
                        </div>
                    )
                })
                ) : 'carregando...'}
        </div>
    )
}

export default Cards