const knex = require('../conexao')

const validadorProduto = require("../ferramentas/validarProduto")
const totalPedido = require('../ferramentas/valorTotalPedido')
const ajustaEstoque = require('../ferramentas/ajustaEstoque');
const cadastraPedidoProduto = require('../ferramentas/pedidoProdutos');

const cadastroPedido = async (req, res) => {
    const { cliente_id, observacao, pedido_produtos } = req.body;
    const numeroClienteId = Number(cliente_id);
    const pedidoProdutosNumericos = pedido_produtos.map((pedido_produto) => ({
        ...pedido_produto,
        produto_id: Number(pedido_produto.produto_id),
        quantidade_produto: Number(pedido_produto.quantidade_produto)
    }));

    try {
        const clienteValido = await knex('clientes').where({ id: numeroClienteId }).first();

        if (!clienteValido) {
            return res.status(400).json({ mensagem: 'Necessário um cliente válido para cadastrar um pedido' });
        };

        const resultadoValidacao = await validadorProduto(pedidoProdutosNumericos)

        if (!resultadoValidacao.validador) {
            return res.status(400).json(resultadoValidacao.mensagem)
        }

        const valorTotalPedido = await totalPedido(pedidoProdutosNumericos);

        if (!valorTotalPedido.validador) {
            return res.status(400).json(valorTotalPedido.mensagem)
        }
        const pedido = {
            cliente_id: numeroClienteId,
            observacao,
            valor_total: valorTotalPedido.total,
        }
        const [cadastroPedido] = await knex('pedidos').insert(pedido).returning('*')

        const { id: pedidoId } = cadastroPedido;

        const pedidoProduto = await cadastraPedidoProduto(pedidoId, pedidoProdutosNumericos);

        if (!pedidoProduto.validador) {
            return res.status(400).json(pedidoProduto.mensagem)
        }

        const estoque = await ajustaEstoque(pedidoProdutosNumericos);

        if (!estoque.validador) {
            return res.status(400).json(estoque.mensagem)
        }

        return res.status(200).json({ mensagem: 'Pedido cadastrado com sucesso' })
    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }
}

const listarPedido = async (req, res) => {
    try {
        const { cliente_id } = req.query;
        if (cliente_id !== undefined) {
            const clienteValido = await knex('clientes').where({ id: cliente_id }).first();

            if (!clienteValido) {
                return res.status(400).json({ mensagem: 'Necessário um cliente válido para listar um pedido' });
            }
        }

        const todosPedidos = knex('pedidos')
            .select('pedidos.id', 'pedidos.cliente_id', 'pedidos.observacao', 'pedidos.valor_total')
            .leftJoin('pedido_produto', 'pedido_produto.pedido_id', 'pedidos.id')
            .select('pedido_produto.produto_id', 'pedido_produto.quantidade_produto', 'pedido_produto.valor_produto')
            .whereNotNull('pedido_produto.pedido_id');

        if (cliente_id) {
            todosPedidos.where({ cliente_id });
        }

        const pedidos = await todosPedidos;

        const pedidosComProdutos = pedidos.reduce((acc, pedido) => {
            const existePedido = acc.find((produtoBanco) => produtoBanco.id === pedido.id);
            const produto = {
                produto_id: pedido.produto_id,
                quantidade_produto: pedido.quantidade_produto,
                valor_produto: pedido.valor_produto,
            };

            if (existePedido) {
                existePedido.produtos.push(produto);
            } else {
                acc.push({
                    id: pedido.id,
                    cliente_id: pedido.cliente_id,
                    observacao: pedido.observacao,
                    valor_total: pedido.valor_total,
                    produtos: [produto],
                });
            }

            return acc;
        }, []);

        return res.status(200).json(pedidosComProdutos);
    } catch (error) {
        return res.status(400).json(error.message);
    }
};


module.exports = { cadastroPedido, listarPedido }