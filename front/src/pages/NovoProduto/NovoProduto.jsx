import { useState, useEffect } from 'react';
import './NovoProduto.css';
import { BsArrowLeft } from "react-icons/bs"
import { useNavigate, Link } from 'react-router-dom'
import UserService from '../../Services/UserService'

import Select from '../../Components/select/select';

const NovoCliente = () => {
    const userService = new UserService()
    const navigate = useNavigate()

    const [categorias, setCategorias] = useState([])
    const [cat, setCat] = useState({
        id: '',
        name: ''
    })
    const [form, setForm] = useState({
        descricao: '',
        quantidade_estoque: '',
        valor: '',
        categoria_id: '',
    })

    useEffect(() => {

        const fetchCategorias = async () => {
            try {
                const response = await userService.categorias();
                setCategorias(response);
            } catch (error) {
                console.error('Erro ao carregar categorias:', error);
            }
        };

        fetchCategorias();
    }, [])


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
            alert('Ocorreu um erro ao cadastrar o produto, por favor tente novamente.');
        }
    };

    function handleCategory(e) {
        const selectedId = e.target.value;
        const selectedName = e.target.options[e.target.selectedIndex].text;

        setCat({
            id: selectedId,
            name: selectedName
        });

        setForm({
            ...form,
            categoria_id: selectedId
        });
    }


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
                    type="number"
                    name="valor"
                    placeholder="Valor"
                    value={form.valor}
                    onChange={handleChange}
                />
                <Select
                    name="categoria_id"
                    text="Selecione a categoria"
                    options={categorias}
                    handleOnChange={handleCategory}
                    value={cat ? cat.id : ''}
                />
                <input
                    type="number"
                    name="quantidade_estoque"
                    placeholder="Quantidade"
                    value={form.quantidade_estoque}
                    onChange={handleChange}
                />
                <div className='produto_add_actions'>
                    <button type="submit" >Adicionar Produto</button>
                    <Link to={'/produto'} >
                        <BsArrowLeft /> Voltar
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default NovoCliente;