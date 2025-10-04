import Joi from "joi";
export const adocaoValidation = Joi.object({
    petId: Joi.number().integer().required().messages({
        "any.required": "O campo petId é obrigatório.",
        "number.base": "O campo petId deve ser um número inteiro.",
        "number.integer": "O campo petId deve ser um número inteiro."
    }),
    usuarioId: Joi.number().integer().required().messages({
        "any.required": "O campo usuarioId é obrigatório.",
        "number.base": "O campo usuarioId deve ser um número inteiro.",
        "number.integer": "O campo usuarioId deve ser um número inteiro."
    }),
    dataAdocao: Joi.date().iso().required().messages({
        "any.required": "O campo dataAdocao é obrigatório.",
        "date.base": "O campo dataAdocao deve ser uma data válida.",
        "date.format": "O campo dataAdocao deve estar no formato ISO."
    }),
    motivo: Joi.string().required().messages({
        "any.required": "O campo motivo é obrigatório.",
        "string.base": "O campo motivo deve ser uma string."
    }),
    aceitouTermo: Joi.boolean().default(false).messages({
        "boolean.base": "O campo aceitouTermo deve ser verdadeiro ou falso."
    }),
    endereco: Joi.object({
        cep: Joi.string().pattern(/^\d{8}$/).required().messages({
            'string.base': 'O CEP deve ser um texto.',
            'string.pattern.base': 'O CEP deve conter 8 dígitos numéricos.',
            'any.required': 'O CEP é obrigatório.'
        }),
        logradouro: Joi.string().max(255).required().messages({
            'string.base': 'O logradouro deve ser um texto.',
            'string.max': 'O logradouro deve ter no máximo 255 caracteres.',
            'any.required': 'O logradouro é obrigatório.'
        }),
        numero: Joi.string().max(20).required().messages({
            'string.base': 'O número deve ser um texto.',
            'string.max': 'O número deve ter no máximo 20 caracteres.',
            'any.required': 'O número é obrigatório.'
        }),
        complemento: Joi.string().max(255).allow(null, '').optional().messages({
            'string.base': 'O complemento deve ser um texto.',
            'string.max': 'O complemento deve ter no máximo 255 caracteres.'
        }),
        bairro: Joi.string().max(100).required().messages({
            'string.base': 'O bairro deve ser um texto.',
            'string.max': 'O bairro deve ter no máximo 100 caracteres.',
            'any.required': 'O bairro é obrigatório.'
        }),
        cidade: Joi.string().max(100).required().messages({
            'string.base': 'A cidade deve ser um texto.',
            'string.max': 'A cidade deve ter no máximo 100 caracteres.',
            'any.required': 'A cidade é obrigatória.'
        }),
        estado: Joi.string().max(2).required().messages({
            'string.base': 'O estado deve ser um texto.',
            'string.max': 'O estado deve ter no máximo 2 caracteres.',
            'any.required': 'O estado é obrigatório.'
        }),
        telefone: Joi.string().max(20).required().messages({
            'string.base': 'O telefone deve ser um texto.',
            'string.max': 'O telefone deve ter no máximo 20 caracteres.',
            'any.required': 'O telefone é obrigatório.'
        })
    }).required().messages({ 'any.required': 'O endereço é obrigatório.' })
});

export const adocaoUpdateValidation = Joi.object({
    petId: Joi.number().integer().messages({
        "number.base": "O campo petId deve ser um número inteiro.",
        "number.integer": "O campo petId deve ser um número inteiro."
    }),
    usuarioId: Joi.number().integer().messages({
        "number.base": "O campo usuarioId deve ser um número inteiro.",
        "number.integer": "O campo usuarioId deve ser um número inteiro."
    }),
    dataAdocao: Joi.date().iso().messages({
        "date.base": "O campo dataAdocao deve ser uma data válida.",
        "date.format": "O campo dataAdocao deve estar no formato ISO."
    }),
    motivo: Joi.string().messages({
        "string.base": "O campo motivo deve ser uma string."
    }),
    aceitouTermo: Joi.boolean().messages({
        "boolean.base": "O campo aceitouTermo deve ser verdadeiro ou falso."
    }),
    enderecoId: Joi.number().integer().messages({
        "number.base": "O campo enderecoId deve ser um número inteiro.",
        "number.integer": "O campo enderecoId deve ser um número inteiro."
    }),
});
