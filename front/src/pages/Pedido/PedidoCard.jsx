import "./PedidoCard.css"

function PedidoCard({ id, cliente_id, valor_total, observacao, produtos }) {
    return (
        <div className="listaPedidos">
            <h3>Numero do pedido: {id}</h3>
            <h4>Cliente id: {cliente_id}</h4>
            <p>
                <span>Observação:</span> {observacao}
            </p>
            <p>
                <span>Valor total:</span> R$ {valor_total}
            </p>
            {produtos &&
                produtos.map((p) => (
                    <div className="containerPedidos" key={p.produto_id}>
                        {/* Add a key for efficient rendering */}
                        <p>Produto id: {p.produto_id}</p>
                        <p>Quantidade de produto: {p.quantidade_produto}</p>
                        <p>Valor produto: R$ {p.valor_produto}</p>
                    </div>
                ))}
        </div>
    );
}

export default PedidoCard