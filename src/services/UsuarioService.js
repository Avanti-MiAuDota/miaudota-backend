import { Prisma } from "@prisma/client";
import { UsuarioRepository } from "../repositories/UsuarioRepository.js";
import bcrypt from "bcrypt";

export const UsuarioService = {
  async getAllUsuarios() {
    return await UsuarioRepository.findAll();
  },

  async getUsuarioById(id) {
    return await UsuarioRepository.findById(id);
  },

  async createUsuario(usuarioModel) {
    if (
      !usuarioModel.email ||
      !usuarioModel.senha ||
      !usuarioModel.nomeCompleto
    ) {
      throw new Error("Dados incompletos para cadastro.");
    }

    const senhaHash = await bcrypt.hash(usuarioModel.senha, 10);

    const { senha, ...rest } = usuarioModel;
    const newUser = { ...rest, senhaHash };

    try {
      return await UsuarioRepository.create(newUser);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002" && error.meta?.target?.includes("email")) {
          throw new Error("Este e-mail já está cadastrado. Tente outro.");
        }
      }
      throw error;
    }
  },

  async updateUsuario(id, usuarioModel) {
    const updateData = { ...usuarioModel };

    if (usuarioModel.senha) {
      const senhaHash = await bcrypt.hash(usuarioModel.senha, 10);
      updateData.senhaHash = senhaHash;
      delete updateData.senha;
    }

    return await UsuarioRepository.update(id, updateData);
  },

  async deleteUsuario(id) {
    return await UsuarioRepository.delete(id);
  },
};
