const knex = require('../conexao')

const validadorProduto = async (pedido_produtos) => {
    const resultado = {}
    pedido_produtos.forEach(item => {
        const { produto_id, quantidade_produto } = item;
        if (resultado[produto_id]) {
            resultado[produto_id] += quantidade_produto;
        } else {
            resultado[produto_id] = quantidade_produto;
        }
    })
    const entrada = resultado
    try {
        const ids = Object.keys(entrada);
        const rows = await knex('produtos').whereIn('id', ids).select('id', 'quantidade_estoque');
        const resultado = {};

        const idsDoBancoDeDados = rows.map(row => String(row.id)); // Convertendo para string
        const idsNaoEncontrados = ids.filter(id => !idsDoBancoDeDados.includes(String(id)));

        if (idsNaoEncontrados.length > 0) {
            return {
                validador: false,
                mensagem: `Os seguintes IDs não foram encontrados no banco de dados: ${idsNaoEncontrados.join(', ')}`
            }
        }

        rows.forEach(row => {
            resultado[row.id] = row.quantidade_estoque;
        });

        const invalidos = rows.filter(row => row.quantidade_estoque < entrada[row.id]).map(row => row.id);
        const mensagem = invalidos.length > 0 ? `Os seguintes IDs não passaram na validação: ${invalidos.join(', ')}` : 'Todos os valores são válidos.';

        return {
            validador: invalidos.length === 0,
            mensagem: mensagem
        };
    } catch (error) {
        return {
            validador: false,
            mensagem: ('Ocorreu um erro ao consultar o banco de dados:', error)
        }
    }
}


module.exports = validadorProduto