import { useState } from 'react';
import './NovoCliente.css';
import { BsArrowLeft } from "react-icons/bs"
import { useNavigate, Link } from 'react-router-dom'
import UserService from '../../Services/UserService'

const NovoCliente = () => {
    const userService = new UserService()
    const navigate = useNavigate()

    const [form, setForm] = useState([])

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await userService.cadastrarCliente({
                nome: form.nome,
                email: form.email,
                cpf: form.cpf
            });
            if (response) {
                alert('Cliente cadastrado com Sucesso');
                navigate('/cliente');
            }
        } catch (error) {
            console.error('Erro ao cadastrar Cliente:', error);
            alert('Ocorreu um erro ao cadastrar o produto, por favor tente novamente.');
        }
    };
    return (
        <div className="cliente-add">
            <h2>Formulário para Adicionar um novo Cliente </h2>
            <form className="cliente-add" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="nome"
                    placeholder="Nome do cliente"
                    value={form.nome}
                    onChange={handleChange}

                />
                <input
                    type="email"
                    name="email"
                    placeholder="email"
                    value={form.email}
                    onChange={handleChange}

                />
                <input
                    type="text"
                    name="cpf"
                    placeholder="Cpf"
                    value={form.cpf}
                    onChange={handleChange}

                />
                <div className='cliente_add_actions'>
                    <button type="submit" >Adicionar Cliente</button>
                    <Link to={'/cliente'} >
                        <BsArrowLeft /> voltar
                    </Link>
                </div>

            </form>
        </div>
    );
};

export default NovoCliente