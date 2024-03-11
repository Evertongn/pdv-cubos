const joi = require('joi');

const schemaCliente = joi.object({
    nome: joi.string().required().messages({
        'any.required': 'O campo nome é obrigatório',
        'string.empty': 'O campo nome é obrigatório',
    }),

    email: joi.string().email().required().messages({
        'string.email': 'O campo email precisa ter um formato válido',
        'any.required': 'O campo email é obrigatório',

    }),

    cpf: joi.string().min(11).required().messages({
        'any.required': 'O campo CPF é obrigatório',
        'string.min': 'O CPF precisa conter, 11 caracteres',
    }),
    rua: joi.string(),
    numero: joi.number(),
    bairro: joi.string(),
    cidade: joi.string(),
    estado: joi.string()

});

module.exports = schemaCliente