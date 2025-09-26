import prisma from "../config/database.js";

export const AuthRepository = {
    async findByEmail(email) {
        return await prisma.usuario.findUnique({
            where: { email },
            include: { endereco: true },
        });
    },
};
