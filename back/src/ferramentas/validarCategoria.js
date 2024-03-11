const knex = require("../conexao")

const validarCategoria = async (id) => {

    const categoriaExiste = await knex('categorias').where({ id })
    if (categoriaExiste.length === 0) {
        return 'A categoria informada não é valida'
    }

    return
}

module.exports = validarCategoria