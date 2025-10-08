import { PetRepository } from "../repositories/PetRepository.js";
import fs from "fs";

export const PetService = {
  async createPet({
    nome,
    especie,
    sexo,
    dataNascimento,
    descricao,
    status,
    foto,
  }) {
    const petData = {
      nome,
      especie,
      sexo,
      dataNascimento,
      descricao,
      status: status || "DISPONIVEL",
      foto,
    };

    return PetRepository.createPet(petData);
  },

  async getAllPets() {
    return PetRepository.findAll();
  },

  async getPetById(id) {
    return PetRepository.findById(id);
  },

  async updatePet(id, data) {
    return PetRepository.update(id, data);
  },

  async deletePet(id) {
    const pet = await PetRepository.findById(id);
    if (pet && pet.foto && pet.foto.startsWith("/uploads/")) {
      try {
        const filePath = pet.foto.substring(1);
        fs.unlinkSync(filePath);
      } catch (err) {
        console.warn("Erro ao remover foto:", err.message);
      }
    }
    return PetRepository.delete(id);
  },

  async updateStatus(id, status) {
    return PetRepository.updateStatus(id, status);
  },
};
