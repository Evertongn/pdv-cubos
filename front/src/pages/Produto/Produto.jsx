import "./Produto.css"

import { useState, useEffect } from "react"

import { Link } from "react-router-dom"

import UserService from '../../Services/UserService'

import ProdutoCard from "./ProdutoCard"

import { BsSearch } from "react-icons/bs";

import Botao from "../../Components/Botao"

const userService = new UserService()

function Produto() {

    const [produtos, setProdutos] = useState([])
    const [pesquisa, setPesquisa] = useState('')

    useEffect(() => {

        const fetchProdutos = async () => {
            try {
                const response = await userService.produtos();
                setProdutos(response);
            } catch (error) {
                console.error('Erro ao carregar produtos:', error);
            }
        };

        fetchProdutos();
    }, [])

    const produtosFiltrados = produtos.filter((produto) =>
        produto.descricao.toLowerCase().includes(pesquisa.toLowerCase())
    );

    const removeService = async (id) => {
        try {
            const response = await userService.excluirProduto(id);
            if (response) {
                alert('Produto Excluido com Sucesso');
                const updatedProdutos = produtos.filter((produto) => produto.id !== id);
                setProdutos(updatedProdutos);
            }
        } catch (error) {
            alert('Ocorreu um erro ao Excluir o produto, por favor tente novamente.');
        }
    }


    return (
        <div className="ContainerProduto">
            <div className="pesquisa">
                <BsSearch />
                <input
                    type="text"
                    value={pesquisa}
                    onChange={(e) => setPesquisa(e.target.value)}
                    placeholder="Pesquise o produto" />
            </div>
            <div className="map-container">
                {produtosFiltrados.length > 0 &&
                    produtosFiltrados.map((produto) => (
                        <ProdutoCard
                            id={produto.id}
                            descricao={produto.descricao}
                            valor={produto.valor}
                            quantidade_estoque={produto.quantidade_estoque}
                            categoria_id={produto.categoria_id}
                            key={produto.id}
                            handleRemove={removeService}
                        />
                    ))}
            </div>
            <div className="add-btn">
                <Link to="/novoProduto">
                    <Botao text='Adicionar Produto!' />
                </Link>

            </div>
        </div >
    )

}

export default Produto