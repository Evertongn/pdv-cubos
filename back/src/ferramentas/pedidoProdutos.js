const knex = require('../conexao');

const cadastraPedidoProduto = async (pedidoId, pedido_produtos) => {
    try {
        const todosProdutos = await knex('produtos');

        pedido_produtos.forEach(async (produto) => {
            const { produto_id, quantidade_produto } = produto;
            const produtoDB = todosProdutos.find((produtoBanco) => produtoBanco.id === produto_id);
            const pedidoProduto = {
                produto_id,
                quantidade_produto,
                valor_produto: produtoDB.valor,
                pedido_id: pedidoId,
            };
            await knex('pedido_produto').insert(pedidoProduto);
        });
        return { validador: true }
    } catch (error) {
        return {
            validador: false,
            mensagem: ('Ocorreu um erro ao consultar o banco de dados:', error)
        }
    }

};

module.exports = cadastraPedidoProduto;