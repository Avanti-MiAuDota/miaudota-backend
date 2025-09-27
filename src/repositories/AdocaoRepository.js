import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class AdocaoRepository {
  // Cria um novo registro de adoção
  async create(data) {
    return await prisma.adocao.create({
      data: {
        petId: data.petId,
        usuarioId: data.usuarioId,
        dataAdocao: data.dataAdocao,
        motivo: data.motivo,
        aceitouTermo: data.aceitouTermo ?? false,
      },
      include: {
        pet: true,
        usuario: true,
      },
    });
  }

  // Retorna todas as adoções
  async findAll() {
    return await prisma.adocao.findMany({
      include: {
        pet: true,
        usuario: true,
      },
      orderBy: {
        dataAdocao: "desc",
      },
    });
  }

  // Busca adoção por ID
  async findById(id) {
    return await prisma.adocao.findUnique({
      where: { id: Number(id) },
      include: {
        pet: true,
        usuario: true,
      },
    });
  }

  // Atualiza informações da adoção
  async update(id, data) {
    try {
      return await prisma.adocao.update({
        where: { id: Number(id) },
        data: {
          petId: data.petId,
          usuarioId: data.usuarioId,
          dataAdocao: data.dataAdocao ? new Date(data.dataAdocao) : undefined,
          motivo: data.motivo,
          aceitouTermo: data.aceitouTermo,
        },
        include: {
          pet: true,
          usuario: true,
        },
      });
    } catch (error) {
      // Se não encontrar o registro, retorna null
      if (error.code === "P2025") return null;
      throw error;
    }
  }

  // Remove registro de adoção
  async delete(id) {
    try {
      await prisma.adocao.delete({
        where: { id: Number(id) },
      });
      return true;
    } catch (error) {
      // Se não encontrar o registro, retorna false
      if (error.code === "P2025") return false;
      throw error;
    }
  }
}

export default new AdocaoRepository();
