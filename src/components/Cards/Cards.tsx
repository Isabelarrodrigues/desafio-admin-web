import React, { useState, useEffect } from 'react'
import ReqUsers from '../Model/ReqUsers'
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
    
    const [cards, setCards] = useState([])

    useEffect(
    () => {
        ReqUsers('cards')
            .then(data => setCards(data))
    }, [])

    return (
        <div>
            <h1>Rota de Cartões</h1>
            {cards ? (
                cards.map((index: CardsTypes) => {
                    if(index.updatedAt) {
                        return ( 
                            <div key={index.id} style={{border: '1px solid lightblue'}}>
                                <p>{`criado ${index.createdAt}`}</p>
                                <p>{`atualizado ${index.updatedAt}`}</p>
                                <p>{`Status: ${index.status}`}</p>
                                <p>{`${index.metadatas.name}`}</p>
                                <p>{`${index.metadatas.digits}`}</p>
                                <p>{`${index.metadatas.limits}`}</p>
                            </div>
                        )
                    }
                })
                ) : 'carregando...'}
        </div>
    )
}

export default Cards