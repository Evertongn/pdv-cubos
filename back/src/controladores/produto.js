const knex = require("../conexao")
const validarCategoria = require('../ferramentas/validarCategoria')

const cadastroProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body

    const novoProduto = {
        descricao,
        quantidade_estoque,
        valor,
        categoria_id
    }

    try {
        const categoriaInvalida = await validarCategoria(categoria_id)

        if (categoriaInvalida) {
            return res.status(400).json(categoriaInvalida)
        }
        await knex('produtos').insert(novoProduto)

        return res.status(201).json({ mensagem: "Produto cadastrado" })

    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }
}

const atualizarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body
    const { id } = req.params

    try {
        const produto = await knex("produtos").where({ id }).first()
        if (!produto) {
            return res.status(404).json({ mensagem: 'O Produto não foi encontrado' });
        }
        const dados = {
            descricao,
            quantidade_estoque,
            valor,
            categoria_id
        }

        const produtoAtualizado = await knex('produtos').update(dados).where({ id }).returning('*')
        return res.status(201).json(produtoAtualizado[0])

    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }
}

const listarProdutos = async (req, res) => {
    try {
        const listaProdutos = await knex("produtos")
        return res.status(200).json(listaProdutos)

    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }
}

const detalharProduto = async (req, res) => {
    const { id } = req.params
    try {
        const detalharProduto = await knex("produtos").where({ id }).first()

        if (!detalharProduto) {
            return res.status(404).json({ mensagem: 'O Produto não foi encontrado' });
        }

        return res.status(200).json(detalharProduto)
    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }
}

const excluirProduto = async (req, res) => {
    const { id } = req.params
    try {
        const produto = await knex("produtos").where({ id })

        if (!produto) {
            return res.status(404).json({ mensagem: 'O Produto não foi encontrado' });
        }

        await knex('produtos').where({ id }).del()
        return res.status(204).json()

    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }
}


module.exports = { cadastroProduto, atualizarProduto, listarProdutos, detalharProduto, excluirProduto }
