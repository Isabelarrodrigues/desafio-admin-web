import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../context'
import ReqUsers from '../Model/request'
import styled from 'styled-components'
import LoginError from '../LoginError/LoginError'

const StyledAudit = styled.div`
    background-color: #d1ebe0;
    border-radius: 10px;
    margin: 64px auto;
    width: 600px;
    padding: 16px 24px;
    
    display: grid;
    grid-template-rows: 50px 50px minmax(80px, auto) minmax(280px, auto);
    grid-template-areas: "idAndChange"
        "createdAndRequested" 
        "updates"
        "before";
    align-items: center;

    h2, h3 {
        font-weight: 600;
    }
`

const FlexDiv = styled.div`
    display: flex;
    justify-content: space-between;
`

function Audits() {
    document.title = 'Auditorias'

    const [audits, setAudits] = useState([])
    
    useEffect(() => {
        ReqUsers('audits')
            .then(data => setAudits(data))
    }, [])

    const {user}: any = useContext(UserContext)

    return user.auth ? (
        <section style={{ margin: '20px '}}>
            {audits ? 
                (audits.map((item: any) => {
                    let statusAfter
                    if (item.after.status === 'rejected') statusAfter = 'REJEITADO'
                    else if (item.after.status === 'approved') statusAfter = 'APROVADO'
                    else statusAfter = 'solicitado'

                    let statusBefore
                    if (item.after.status === 'rejected') statusBefore = 'REJEITADO'
                    else if (item.after.status === 'approved') statusBefore = 'APROVADO'
                    else statusBefore = 'solicitado'

                    return (
                        <StyledAudit>
                            <FlexDiv style={{gridArea: 'idAndChange', 
                                borderBottom: '1px solid black'}}>
                                <h2>ID: <strong>{item.id}</strong></h2>
                                <p>{item.type === 'card-status-change' ? 'Alteração no status do cartão' : item.type }</p>
                            </FlexDiv>

                            <FlexDiv style={{gridArea: 'createdAndRequested'}}>
                                <p>Auditoria registrada {item.createdAt}</p>
                                <p>Solicitado por {item.requestedBy}</p>
                            </FlexDiv>
                            
                            <div style={{gridArea: 'updates'}}>
                                <h3>Atualizações</h3>
                                {item.before.createdAt !== item.after.createdAt && <p>{item.after.createdAt}</p>}
                                {item.before.id !== item.after.id && <p>{item.after.id}</p>}
                                {item.before.metadatas.name !== item.after.metadatas.name && <p>{item.after.metadatas.name}</p>}
                                {item.before.metadatas.digits !== item.after.metadatas.digits && <p>{item.after.metadatas.digits}</p>}
                                {item.before.digits !== item.after.digits && <p>{item.after.digits}</p>}
                                {item.before.name !== item.after.name && <p>{item.after.name}</p>}
                                {item.before.status !== item.after.status && 
                                    <p>Status passou a ser  
                                        {statusAfter === 'REJEITADO' && <b style={{color: 'red'}}> {statusAfter}</b>
                                        || statusAfter === 'APROVADO' && <b style={{color: 'green'}}> {statusAfter}</b>
                                        || statusAfter === 'solicitado' && <b> {statusAfter}</b>}
                                    </p>}
                                {item.before.updatedAt !== item.after.updatedAt && <p>{item.after.updatedAt}</p>}
                                {item.before.user_id !== item.after.user_id && <p>{item.after.user_id}</p>}
                            </div>
                            <div style={{gridArea: 'before'}}>
                                <h3>Informações anteriores</h3>
                                <p>O cartão foi criado em <b>{item.before.createdAt}</b></p>
                                <p>O ID do cartão é <b>{item.before.id}</b></p>
                                <p>Nome impresso no cartão: <b>{item.before.metadatas.name}</b></p>
                                <p>Dígitos: <b>{item.before.metadatas.digits}</b></p>
                                <p>Dígitos: <b>{item.before.digits}</b></p>
                                <p>Nome do cliente: <b>{item.before.name}</b></p>
                                <p>Status: {statusBefore}</p>
                                {item.before.updatedAt ? 
                                    <p>Atualizado em <b>{item.before.updatedAt}</b></p> : <p>Não foi possível encontrar a data de atualização deste cartão</p>}
                                <p>ID do usuário: <b>{item.before.user_id}</b></p>
                            </div>
                        </StyledAudit>
                    )
                })
                )
            : null}
        </section>
    ) : <LoginError />
}

export default Audits
