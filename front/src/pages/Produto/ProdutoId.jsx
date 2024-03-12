import { React, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

import { BsPencil, BsArrowLeft } from 'react-icons/bs'

import Input from '../../Components/input'

import "./ProdutoId.css"

import UserService from '../../Services/UserService'

const userService = new UserService()


const ProdutoId = () => {

    const { id } = useParams()
    const [form, setForm] = useState([])
    const navigate = useNavigate()

    const handleClick = async () => {
        try {
            const response = await userService.atualizarProduto({
                descricao: form.descricao,
                quantidade_estoque: form.quantidade_estoque,
                valor: form.valor,
                categoria_id: form.categoria_id
            }, id);
            if (response) {
                alert('Produto cadastrado com Sucesso');
                navigate('/produto');
            }
        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
        }
    };



    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }


    return (
        <div className="Containerid">
            <div className='produtoID'>
                <h2>Edite o produto ✏️</h2>
                <div className='formID'>
                    <Input
                        name='descricao'
                        value={form.descircao}
                        placeholder='Digite a descrição do produto'
                        onChange={handleChange}
                        type='text'
                    />
                    <Input
                        name='valor'
                        value={form.valor}
                        placeholder='Digite o Valor'
                        onChange={handleChange}
                        type='text'
                    />
                    <Input
                        name='categoria_id'
                        value={form.categoria_id}
                        placeholder='Digite a categoria do produto '
                        onChange={handleChange}
                        type='text'
                    />
                    <Input
                        name='quantidade_estoque'
                        value={form.quantidade_estoque}
                        placeholder='Digite a Quantidade estoque do produto '
                        onChange={handleChange}
                        type='text'
                    />
                    <div className='project_card_actions'>
                        <button onClick={handleClick}>
                            <BsPencil /> Editar
                        </button>
                        <Link to={'/produto'}>
                            <BsArrowLeft /> voltar
                        </Link>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default ProdutoId
