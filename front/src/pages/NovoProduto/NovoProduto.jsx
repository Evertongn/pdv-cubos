import { useState } from 'react';
import './NovoProduto.css';


import { BsArrowLeft } from "react-icons/bs"
import { useNavigate, Link } from 'react-router-dom'
import UserService from '../../Services/UserService'

const NovoCliente = () => {
    const userService = new UserService()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        descricao: '',
        quantidade_estoque: '',
        valor: '',
        categoria_id: '',
    })

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await userService.cadastrarProdutos({
                descricao: form.descricao,
                quantidade_estoque: form.quantidade_estoque,
                valor: form.valor,
                categoria_id: form.categoria_id
            });
            if (response) {
                alert('Produto cadastrado com Sucesso');
                navigate('/produto');
            }
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
            alert('Ocorreu um erro ao cadastrar o produto, por favor tente novamente.');
        }
    };

    return (

        <div className="product-add">
            <h2>Formulario para Adicionar um novo produto </h2>
            <form className="product-add" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="descricao"
                    placeholder="Descricao do produto"
                    value={form.descricao}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="valor"
                    placeholder="Valor"
                    value={form.valor}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="categoria_id"
                    placeholder="Categoria"
                    value={form.categoria_id}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="quantidade_estoque"
                    placeholder="Quantidade"
                    value={form.quantidade_estoque}
                    onChange={handleChange}
                />
                <div className='produto_add_actions'>
                    <button type="submit" >Adicionar Produto</button>
                    <Link to={'/produto'} >
                        <BsArrowLeft /> voltar
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default NovoCliente;