import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthRepository } from "../repositories/AuthRepository.js";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
const JWT_EXPIRES_IN = "1d";

export const AuthService = {
    async login(email, senha) {
        // Buscar usuário pelo e-mail
        const usuario = await AuthRepository.findByEmail(email);

        if (!usuario) {
            throw new Error("Usuário não encontrado.");
        }

        // Validar senha
        const senhaValida = await bcrypt.compare(senha, usuario.senhaHash);
        if (!senhaValida) {
            throw new Error("Credenciais inválidas.");
        }

        // Gerar token
        const token = jwt.sign(
            { id: usuario.id, role: usuario.role },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        // Retornar dados básicos + token
        const { senhaHash, ...usuarioSemSenha } = usuario;

        return { token, usuario: usuarioSemSenha };
    },
};
