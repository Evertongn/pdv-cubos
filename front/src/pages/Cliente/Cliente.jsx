import "./Cliente.css"

import { useState, useEffect } from "react"

import { Link } from "react-router-dom"

import UserService from '../../Services/UserService'

import ClienteCard from "./ClienteCard"

import { BsSearch } from "react-icons/bs";

import Botao from "../../Components/Botao"

const userService = new UserService()

function Produto() {

    const [clientes, setClientes] = useState([])
    const [pesquisa, setPesquisa] = useState('')

    useEffect(() => {

        const fetchProdutos = async () => {
            try {
                const response = await userService.clientes();
                setClientes(response);
            } catch (error) {
                console.error('Erro ao carregar produtos:', error);
            }
        };

        fetchProdutos();
    }, [])

    const clientesFiltrados = clientes.filter((cliente) =>
        cliente.nome.toLowerCase().includes(pesquisa.toLowerCase())
    );

    return (
        <div className="ContainerProduto">
            <div className="pesquisa">
                <BsSearch className="search-icon" />
                <input
                    type="text"
                    value={pesquisa}
                    onChange={(e) => setPesquisa(e.target.value)}
                    placeholder="Pesquise o Cliente" />
            </div>
            <div className="map-container">
                {clientesFiltrados.length > 0 &&
                    clientesFiltrados.map((cliente) => (
                        <ClienteCard
                            id={cliente.id}
                            nome={cliente.nome}
                            email={cliente.email}
                            cpf={cliente.cpf}
                            key={cliente.id}
                        />
                    ))}
            </div>
            <div className="add-btn">
                <Link to="/novoCliente">
                    <Botao text='Adicionar Cliente!' />
                </Link>
            </div>
        </div>
    )

}

export default Produto