import "./Pedido.css"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import UserService from '../../Services/UserService'
import PedidoCard from "./PedidoCard"

import { BsSearch } from "react-icons/bs";

import Botao from "../../Components/Botao"

const userService = new UserService()

function Pedido() {

    const [pedidos, setPedidos] = useState([])
    const [pesquisa, setPesquisa] = useState('')

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const response = await userService.pedidos();
                setPedidos(response);
            } catch (error) {
                console.error('Erro ao carregar produtos:', error);
            }
        };

        fetchPedidos();
    }, []);

    const pedidosFiltrados = pedidos.filter((pedido) =>
        pedido.cliente_id.toString().includes(pesquisa)
    );

    return (
        <div className="ContainerPedido">
            <div className="pesquisaPedido">
                <BsSearch />
                <input
                    type="text"
                    value={pesquisa}
                    onChange={(e) => setPesquisa(e.target.value)}
                    placeholder="Pesquise o produto" />
            </div>
            <div className="map-containerPedido">
                {pedidosFiltrados.length > 0 &&
                    pedidosFiltrados.map((pedido) => (
                        <PedidoCard
                            id={pedido.id}
                            cliente_id={pedido.cliente_id}
                            observacao={pedido.observacao}
                            valor_total={pedido.valor_total}
                            produtos={pedido.produtos}
                            key={pedido.id}
                        />
                    ))}
            </div>
            <div className="add-btnPedido">
                <Link to="/novoPedido">
                    <Botao text='Adicionar Pedido!' />
                </Link>

            </div>
        </div >
    )

}

export default Pedido