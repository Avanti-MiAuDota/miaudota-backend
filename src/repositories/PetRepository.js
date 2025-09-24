import prisma from "../config/database.js";

export async function createPet(data) {
  return prisma.pet.create({
    data,
  });
}
