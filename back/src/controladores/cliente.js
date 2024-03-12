const knex = require("../conexao");

const cadastroCliente = async (req, res) => {
    const dados = { ...req.body }
    const { email, cpf } = dados
    try {
        const emailExistente = await knex('clientes').where({ email }).first();

        if (emailExistente) {
            return res.status(409).json({
                mensagem:
                    'O e-mail informado já está sendo utilizado por outro cliente.',
            });
        }
        const cpfExistente = await knex('clientes').where({ cpf }).first();

        if (cpfExistente) {
            return res.status(409).json({
                mensagem:
                    'O cpf informado já está sendo utilizado por outro cliente.',
            });
        }

        const cliente = await knex("clientes").insert(dados).returning("*")
        return res.status(201).json(cliente);
    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }

}

const atualizarCliente = async (req, res) => {
    const { id } = req.params
    const dados = { ...req.body }
    const { email, cpf } = dados
    try {
        const cliente = await knex('clientes').where({ id }).first();

        if (!cliente) {
            return res.status(404).json({ mensagem: 'Cliente não encontrado' });
        }
        const emailExistente = await knex('clientes').where({ email }).first();

        if (emailExistente && emailExistente.id != id) {
            return res.status(409).json({
                mensagem:
                    'O e-mail informado já está sendo utilizado por outro cliente.',
            });
        }
        const cpfExistente = await knex('clientes').where({ cpf }).first();

        if (cpfExistente && cpfExistente.id != id) {
            return res.status(400).json({
                mensagem:
                    'O cpf informado já está sendo utilizado por outro cliente.',
            });
        }
        const [clienteAtualizado] = await knex('clientes').update(dados).where({ id }).returning('*')
        return res.status(200).json(clienteAtualizado);

    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }

}

const listarClientes = async (req, res) => {
    try {
        const clientes = await knex("clientes")
        return res.status(200).json(clientes)
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

const detalharCliente = async (req, res) => {
    const { id } = req.params

    try {
        const detalharCliente = await knex("clientes").where({ id }).first()

        if (!detalharCliente) {
            return res.status(404).json({ mensagem: 'O cliente não foi encontrado' });
        }

        return res.status(200).json(detalharCliente)
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

module.exports = { cadastroCliente, atualizarCliente, listarClientes, detalharCliente }