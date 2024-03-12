import { useState } from 'react'
import { Link } from 'react-router-dom'
import "./ProdutoCard.css"

import ConfirmationModal from './ConfirmationModal';


import { BsPencil, BsFillTrashFill } from 'react-icons/bs'

function ProjectCard({ id, descricao, valor, categoria_id, quantidade_estoque, handleRemove }) {
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);

    const openConfirmModal = () => {
        setConfirmModalOpen(true);
    };

    const closeConfirmModal = () => {
        setConfirmModalOpen(false);
    };

    const handleConfirmRemove = () => {
        handleRemove(id);
        closeConfirmModal();
    };

    const remove = (e) => {
        e.preventDefault();
        openConfirmModal();
    };

    return (
        <div className='listaProdutos'>
            <h4>{descricao}</h4>
            <p>
                <span>Valor:</span> R$ {valor}
            </p>
            <p>
                <span>Categoria:</span> {categoria_id}
            </p>
            <p>
                <span>Quantidade estoque:</span> {quantidade_estoque}
            </p>
            <div className='project_card_actions'>
                <Link to={'/produto/' + id}>
                    <BsPencil /> Editar
                </Link>
                <button onClick={remove}>
                    <BsFillTrashFill />
                    Excluir
                </button>
                <ConfirmationModal
                    isOpen={confirmModalOpen}
                    onConfirm={handleConfirmRemove}
                    onClose={closeConfirmModal}
                    title="Confirmação de exclusão"
                    content="Tem certeza que deseja excluir este produto?"
                />
            </div>
        </div>
    )
}

export default ProjectCard