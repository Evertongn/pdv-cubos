const joi = require('joi')

const schemaPedido = joi.object({
    cliente_id: joi.number().required().messages({
        'any.required': 'O campo cliente_id é obrigatório'
    }),

    observacao: joi.string().allow('').optional(),

    pedido_produtos: joi.array().items(
        joi.object({
            produto_id: joi.number().required().messages({
                'any.required': 'O campo produto_id é obrigatório'
            }),
            quantidade_produto: joi.number().required().messages({
                'any.required': 'O campo quantidade_produto é obrigatório'
            })
        })
    ).required().messages({
        'any.required': 'O campo pedido_produtos é obrigatório'
    }),
});


module.exports = schemaPedido