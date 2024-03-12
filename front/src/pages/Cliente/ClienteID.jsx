import { React, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

import { BsPencil, BsArrowLeft } from 'react-icons/bs'

import Input from '../../Components/input'

import "./ClienteID.css"

import UserService from '../../Services/UserService'

const userService = new UserService()


const ClienteID = () => {

    const { id } = useParams()
    const [form, setForm] = useState([])
    const navigate = useNavigate()

    const handleClick = async () => {
        try {
            await userService.atualizarCliente({
                nome: form.nome,
                email: form.email,
                cpf: form.cpf
            }, id);
            if (response) {
                alert('Cliente cadastrado com Sucesso');
                navigate('/cliente');
            }
        } catch (error) {
            console.error('Erro ao cadastradar cliente:', error);
        }
    };

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    return (
        <div className="Containerid">
            <div className='clienteID'>
                <h2>Edite o Cliente ✏️</h2>
                <div className='formID'>
                    <Input
                        name='nome'
                        value={form.nome}
                        placeholder='Digite o nome do cliente'
                        onChange={handleChange}
                        type='text'
                    />
                    <Input
                        name='email'
                        value={form.email}
                        placeholder='Digite o email do Cliente'
                        onChange={handleChange}
                        type='email'
                    />
                    <Input
                        name='cpf'
                        value={form.cpf}
                        placeholder='Digite p cpf do Cliente'
                        onChange={handleChange}
                        type='cpf'
                    />
                    <div className='project_card_actions'>
                        <button onClick={handleClick}>
                            <BsPencil /> Editar
                        </button>
                        <Link to={'/cliente'}>
                            <BsArrowLeft /> voltar
                        </Link>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default ClienteID
