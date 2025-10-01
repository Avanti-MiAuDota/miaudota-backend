import prisma from "../config/database.js";

export const UsuarioRepository = {

    async findAll() {
        return await prisma.usuario.findMany({
          select: {
            id: true,
            nomeCompleto: true,
            email: true,
            role: true,
            criadoEm: true,
            adocoes: true,
          },
        });
    },

    async findById(id) {
        return await prisma.usuario.findUnique({
          where: { id: parseInt(id) },
          select: {
            id: true,
            nomeCompleto: true,
            email: true,
            role: true,
            criadoEm: true,
            adocoes: true,
          },
        });
    },

    async create(userData) {
        return await prisma.usuario.create({
          data: {
            nomeCompleto: userData.nomeCompleto,
            email: userData.email,
            senhaHash: userData.senhaHash,
            role: userData.role,
          },
          select: {
            id: true,
            nomeCompleto: true,
            email: true,
            role: true,
            criadoEm: true,
          },
        });
    },

    async update(id, userData) {
        return await prisma.usuario.update({
          where: { id: parseInt(id) },
          data: {
            nomeCompleto: userData.nomeCompleto,
            email: userData.email,
            senhaHash: userData.senhaHash,
            role: userData.role,
          },
          select: {
            id: true,
            nomeCompleto: true,
            email: true,
            role: true,
            criadoEm: true,
          },
        });
    },

    async update(id, userData) {
        return await prisma.usuario.update({
            where: { id: parseInt(id) },
            data: {
                nomeCompleto: userData.nomeCompleto,
                email: userData.email,
                senhaHash: userData.senhaHash,
                role: userData.role,
            },
        });
    },

    async delete(id) {
        const usuario = await prisma.usuario.findUnique({
            where: { id: parseInt(id) },
        });
    },

    async delete(id) {
        await prisma.usuario.findUnique({
            where: { id: parseInt(id) },
        });
        return await prisma.usuario.delete({ where: { id: parseInt(id) } });
    },
};
