import { Link } from 'react-router-dom'
import "./ClienteCard.css"



import { BsPencil } from 'react-icons/bs'

function ClienteCard({ id, nome, cpf, email }) {

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id)
    }

    return (
        <div className='listaClientes'>
            <h4>{nome}</h4>
            <p>
                <span>email:</span> {email}
            </p>
            <p>
                <span>cpf:</span> {cpf}
            </p>
            <div className='project_card_actions'>
                <Link to={'/cliente/' + id}>
                    <BsPencil /> Editar
                </Link>
            </div>
        </div>
    )
}

export default ClienteCard