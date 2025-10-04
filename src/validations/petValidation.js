import Joi from "joi";

export const petValidation = Joi.object({
    nome: Joi.string()
        .max(100)
        .required()
        .messages({
            "string.base": "O nome deve ser um texto.",
            "string.max": "O nome deve ter no máximo 100 caracteres.",
            "any.required": "O nome é obrigatório.",
        }),
    especie: Joi.string()
        .valid("CAO", "GATO")
        .required()
        .messages({
            "any.only": "A espécie deve ser 'CAO' ou 'GATO'.",
            "any.required": "A espécie é obrigatória.",
        }),
    sexo: Joi.string()
        .valid("MACHO", "FEMEA")
        .required()
        .messages({
            "any.only": "O sexo deve ser 'MACHO' ou 'FEMEA'.",
            "any.required": "O sexo é obrigatório.",
        }),
    dataNascimento: Joi.date()
        .iso()
        .optional()
        .messages({
            "date.base": "A data de nascimento deve ser uma data válida.",
            "date.format": "A data de nascimento deve estar no formato ISO.",
        }),
    descricao: Joi.string()
        .required()
        .messages({
            "string.base": "A descrição deve ser um texto.",
            "any.required": "A descrição é obrigatória.",
        }),
    status: Joi.string()
        .valid("DISPONIVEL", "EM_ANALISE", "ADOTADO")
        .default("DISPONIVEL")
        .messages({
            "any.only": "O status deve ser 'DISPONIVEL', 'EM_ANALISE' ou 'ADOTADO'.",
        }),
}).options({ allowUnknown: true });

export const petUpdateValidation = Joi.object({
    nome: Joi.string().max(100)
        .messages({
            "string.base": "O nome deve ser um texto.",
            "string.max": "O nome deve ter no máximo 100 caracteres."
        }),
    especie: Joi.string().valid("CAO", "GATO")
        .messages({
            "any.only": "A espécie deve ser 'CAO' ou 'GATO'."
        }),
    sexo: Joi.string().valid("MACHO", "FEMEA")
        .messages({
            "any.only": "O sexo deve ser 'MACHO' ou 'FEMEA'."
        }),
    dataNascimento: Joi.date().iso()
        .messages({
            "date.base": "A data de nascimento deve ser uma data válida.",
            "date.format": "A data de nascimento deve estar no formato ISO."
        }),
    descricao: Joi.string()
        .messages({
            "string.base": "A descrição deve ser um texto."
        }),
    status: Joi.string().valid("DISPONIVEL", "EM_ANALISE", "ADOTADO")
        .messages({
            "any.only": "O status deve ser 'DISPONIVEL', 'EM_ANALISE' ou 'ADOTADO'."
        }),
}).min(1).options({ allowUnknown: true });
