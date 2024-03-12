const knex = require("../conexao")
const jwt = require("jsonwebtoken")

const senhaJwt = "123"



const autenticacao = async (req, res, next) => {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
        return res.status(401).json({ mensagem: 'Autenticação Não encontrada' });
    }

    const token = bearerToken.replace('Bearer ', '').trim();

    try {
        const { id } = jwt.verify(token, senhaJwt)

        const usuarioEncontrado = await knex('usuarios').where({ id }).first()

        if (!usuarioEncontrado) {
            return res.status(404).json({ mensagem: 'O Usuario não foi encontrado' });
        }

        const { senha, ...usuario } = usuarioEncontrado;
        req.usuario = usuario
        next()
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

module.exports = autenticacao