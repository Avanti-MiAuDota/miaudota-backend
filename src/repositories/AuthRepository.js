import prisma from "../config/database.js";

export const AuthRepository = {
    async findByEmail(email) {
        return await prisma.usuario.findUnique({
            where: { email },
            select: {
                id: true,
                nomeCompleto: true,
                email: true,
                role: true,
                senhaHash: true,
            }
        });
    },
};
