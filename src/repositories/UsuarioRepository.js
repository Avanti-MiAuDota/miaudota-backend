import prisma from "../config/database.js";

export const UsuarioRepository = {

    async findAll() {
        return await prisma.usuario.findMany({
            include: { endereco: true },
        });
    },

    async findById(id) {
        return await prisma.usuario.findUnique({
            where: { id: parseInt(id) },
            include: { endereco: true },
        });
    },

    async create(userData) {
        return await prisma.usuario.create({
            data: {
                nomeCompleto: userData.nomeCompleto,
                email: userData.email,
                telefone: userData.telefone,
                senhaHash: userData.senhaHash,
                role: userData.role,
                endereco: userData.endereco
                    ? {
                          create: { ...userData.endereco },
                      }
                    : undefined,
            },
            include: { endereco: true },
        });
    },

    async update(id, userData) {
        return await prisma.usuario.update({
            where: { id: parseInt(id) },
            data: {
                nomeCompleto: userData.nomeCompleto,
                email: userData.email,
                telefone: userData.telefone,
                senhaHash: userData.senhaHash,
                role: userData.role,
                endereco: userData.endereco
                    ? { update: { ...userData.endereco } }
                    : undefined,
            },
            include: { endereco: true },
        });
    },

    async delete(id) {
        const usuario = await prisma.usuario.findUnique({
            where: { id: parseInt(id) },
        });

        if (usuario?.enderecoId) {
            await prisma.endereco.delete({ where: { id: usuario.enderecoId } });
        }

        return await prisma.usuario.delete({ where: { id: parseInt(id) } });
    },
};
