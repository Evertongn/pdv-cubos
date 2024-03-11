const joi = require('joi')


const schemaProduto = joi.object({
    descricao: joi.string().required().messages({
        'any.required': 'O campo descricao é obrigatório'
    }),

    quantidade_estoque: joi.number().required().messages({
        'any.required': 'O campo quantidade_estoque é obrigatório'

    }),

    valor: joi.number().required().messages({
        'any.required': 'O campo valor é obrigatório'

    }),
    categoria_id: joi.number().required().messages({
        'any.required': 'O campo categoria_id é obrigatório'
    })
});


module.exports = schemaProduto