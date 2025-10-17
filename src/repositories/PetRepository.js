import prisma from "../config/database.js";

export const PetRepository = {
  async createPet(data) {
    return prisma.pet.create({
      data,
    });
  },

  async findAll() {
    return prisma.pet.findMany({
      orderBy: { criadoEm: "desc" },
    });
  },

  async findById(id) {
    try {
      console.log("PetRepository.findById chamado com ID:", id, typeof id);
      const petId = typeof id === 'string' ? parseInt(id) : id;
      console.log("ID convertido para:", petId);
      
      const result = await prisma.pet.findUnique({
        where: { id: petId },
        include: { adocoes: true },
      });
      
      console.log("Resultado da query:", !!result);
      return result;
    } catch (error) {
      console.error("Erro no PetRepository.findById:", {
        message: error.message,
        code: error.code,
        meta: error.meta
      });
      throw error;
    }
  },

  async update(id, data) {
    return prisma.pet.update({
      where: { id: parseInt(id) },
      data,
    });
  },

  async delete(id) {
    return prisma.pet.delete({
      where: { id: parseInt(id) },
    });
  },

  async updateStatus(id, status) {
    return prisma.pet.update({
      where: { id: parseInt(id) },
      data: { status },
    });
  },
};
