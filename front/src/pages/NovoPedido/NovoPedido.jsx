import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UserService from '../../Services/UserService'
import { BsArrowLeft } from 'react-icons/bs';

import './NovoPedido.css'

const userService = new UserService()
const NovoPedido = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        cliente_id: '',
        observacao: '',
        pedido_produtos: []
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'cliente_id' || name === 'produto_id' || name === 'quantidade_produto') {
            setForm({ ...form, [name]: Number(value) });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleAddProduct = () => {
        setForm({
            ...form,
            pedido_produtos: [...form.pedido_produtos, { produto_id: '', quantidade_produto: '' }]
        });
    };

    const handleChangeProdutos = (index, event) => {
        const { name, value } = event.target;
        setForm({
            ...form,
            pedido_produtos: form.pedido_produtos.map((product, i) =>
                i === index ? { ...product, [name]: value } : product
            )
        });
    };

    const handleRemoveProduct = (index) => {
        const newPedidoProdutos = form.pedido_produtos.filter((_, i) => i !== index);
        setForm({ ...form, pedido_produtos: newPedidoProdutos });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await userService.cadastrarPedidos({
                cliente_id: form.cliente_id,
                observacao: form.observacao,
                pedido_produtos: form.pedido_produtos
            });
            if (response) {
                alert('Pedido cadastrado com Sucesso');
                navigate('/pedido');
            }
        } catch (error) {
            alert('Ocorreu um erro ao cadastrar o Pedido, por favor tente novamente.');
        }
    };

    return (
        <div className="NovoPedido">
            <h2>Formulário para Adicionar um novo Pedido </h2>
            <form className='formParte1' onSubmit={handleSubmit}>
                <input
                    type="number"
                    name="cliente_id"
                    placeholder="Digite o número do cliente"
                    value={form.cliente_id}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="observacao"
                    placeholder="Digite uma observação sobre o pedido"
                    value={form.observacao}
                    onChange={handleChange}
                />
            </form>
            <form className='formParte2' onSubmit={handleSubmit}>
                <h3>Pedido produtos</h3>
                <div>{form.pedido_produtos.map((product, index) => (
                    <div key={index}>
                        <input
                            type="number"
                            name="produto_id"
                            placeholder="produto_id"
                            value={product.produto_id}
                            onChange={(e) => handleChangeProdutos(index, e)}
                        />
                        <input
                            type="number"
                            name="quantidade_produto"
                            placeholder="quantidade_produto"
                            value={product.quantidade_produto}
                            onChange={(e) => handleChangeProdutos(index, e)}
                        />
                        <button className='btnNovoPedio' type='button' onClick={() => handleRemoveProduct(index)}>Remove</button>
                    </div>
                ))}
                </div>
            </form>
            <div className='novoPedido_add_actions'>
                <button type="button" onClick={handleAddProduct}>Adicionar Produto</button>
                <button type="submit" onClick={handleSubmit} >Finalizar pedido</button>
                <Link to={'/cliente'} >
                    <BsArrowLeft /> Voltar
                </Link>
            </div>
        </div >
    )
};

export default NovoPedido