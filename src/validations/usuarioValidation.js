import Joi from "joi";

export const usuarioValidation = Joi.object({
    nomeCompleto: Joi.string()
        .max(100)
        .required()
        .messages({
            "string.base": "O nome completo deve ser um texto.",
            "string.max": "O nome completo deve ter no máximo 100 caracteres.",
            "any.required": "O nome completo é obrigatório.",
        }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.email": "O e-mail deve ser válido.",
            "any.required": "O e-mail é obrigatório.",
        }),
    senha: Joi.string()
        .min(8)
        .required()
        .messages({
            "string.min": "A senha deve ter no mínimo 8 caracteres.",
            "any.required": "A senha é obrigatória.",
        }),
    role: Joi.string()
        .valid("USUARIO", "ADMIN")
        .default("USUARIO")
        .messages({
            "any.only": "O papel deve ser USUARIO ou ADMIN.",
        }),
});

export const usuarioUpdateValidation = Joi.object({
    nomeCompleto: Joi.string()
        .max(100)
        .messages({
            "string.base": "O nome completo deve ser um texto.",
            "string.max": "O nome completo deve ter no máximo 100 caracteres.",
        }),
    email: Joi.string()
        .email()
        .messages({
            "string.email": "O e-mail deve ser válido.",
        }),
    senha: Joi.string()
        .min(8)
        .messages({
            "string.min": "A senha deve ter no mínimo 8 caracteres.",
        }),
    role: Joi.string()
        .valid("USUARIO", "ADMIN")
        .messages({
            "any.only": "O papel deve ser USUARIO ou ADMIN.",
        }),
});
