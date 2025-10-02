import { UsuarioService } from "../services/UsuarioService.js";
import { UsuarioModel } from "../models/Usuario.js";

export const UsuarioController = {

    async getAll(_req, res) {
        try {
            const usuarios = await UsuarioService.getAllUsuarios();
            res.status(200).json(usuarios);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro ao buscar usuários." });
        }
    },

    async getById(req, res) {
        try {
            const usuario = await UsuarioService.getUsuarioById(req.params.id);
            if (!usuario) return res.status(404).json({ message: "Usuário não encontrado." });
            res.status(200).json(usuario);
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar usuário." });
        }
    },

    async create(req, res) {
        try {
            const usuarioModel = new UsuarioModel(req.body);
            const novoUsuario = await UsuarioService.createUsuario(usuarioModel);
            res.status(201).json(novoUsuario);
        } catch (error) {
            res.status(500).json({ message: "Erro ao criar usuário.", error: error.message });
        }
    },

    async update(req, res) {
        try {
            const usuarioModel = new UsuarioModel(req.body);
            const usuarioAtualizado = await UsuarioService.updateUsuario(req.params.id, usuarioModel);
            res.status(200).json(usuarioAtualizado);
        } catch (error) {
            res.status(500).json({ message: "Erro ao atualizar usuário.", error: error.message });
        }
    },

    async delete(req, res) {
        try {
            await UsuarioService.deleteUsuario(req.params.id);
            res.status(200).json({ message: "Usuário deletado com sucesso." });
        } catch (error) {
            res.status(500).json({ message: "Erro ao deletar usuário." });
        }
    },
};
