const knex = require("../conexao")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const senhaJwt = "123"


const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body
    try {
        const emailExiste = await knex("usuarios").where({ email }).first()

        if (emailExiste) {
            return res.status(409).json({
                mensagem:
                    'O e-mail informado já está sendo utilizado por outro usuário.'
            })
        }

        const senhaCripto = await bcrypt.hash(senha, 10)

        const novoUsuario = await knex("usuarios").insert({
            nome,
            email,
            senha: senhaCripto,
        }).returning('*')

        const { senha: _, ...usuarioSemsenha } = novoUsuario[0]


        return res.status(200).json(usuarioSemsenha);

    } catch (error) {
        return res.status(500).json({ mensagem: error.mensagem })
    }
}

const login = async (req, res) => {
    const { email, senha } = req.body

    try {
        const usuario = await knex('usuarios').where({ email }).first();

        if (!usuario) {
            return res.status(404).json({ mensagem: 'O Usuario não foi encontrado' });
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(401).json({ mensagem: 'Email ou senha não confere' });
        }

        const token = jwt.sign({ id: usuario.id }, senhaJwt, { expiresIn: '8h' });

        const { senha: _, ...usuarioLogado } = usuario;

        return res.status(200).json({ usuario: usuarioLogado, token });
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};

const detalharUsuario = async (req, res) => {
    const usuario = req.usuario

    return (
        res.status(200).json(usuario)
    )
}

const editarUsuario = async (req, res) => {
    const { id } = req.usuario
    const { nome, email, senha } = req.body

    try {
        const usuario = await knex('usuarios').where({ email }).first()

        if (usuario && usuario.id != id) {
            return res.status(409).json({
                mensagem:
                    'O e-mail informado já está sendo utilizado por outro usuário.'
            })
        }

        const hash = await bcrypt.hash(senha, 10);
        await knex('usuarios').update({ nome, email, senha: hash }).where('id', id)

        return res.status(200).json("Usuario atualizado");
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}


module.exports = { cadastrarUsuario, login, detalharUsuario, editarUsuario }