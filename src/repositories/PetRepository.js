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
    return prisma.pet.findUnique({
      where: { id: parseInt(id) },
      include: { adocoes: true },
    });
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
