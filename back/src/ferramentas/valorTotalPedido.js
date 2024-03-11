const knex = require('../conexao');

const totalPedido = async (produtos) => {
    try {
        const todosProdutos = await knex('produtos');
        const total = produtos.reduce((acc, produto) => {
            const produtoId = Number(produto.produto_id);
            const produtoBanco = todosProdutos.find((produtoBanco) => produtoBanco.id === produtoId);
            return acc + (Number(produtoBanco.valor) * Number(produto.quantidade_produto));
        }, 0);
        return {
            validador: true,
            total
        }
    } catch (error) {
        return {
            validador: false,
            mensagem: 'Ocorreu um erro ao consultar o banco de dados.'
        }
    }
};

module.exports = totalPedido;