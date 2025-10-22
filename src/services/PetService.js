import { PetRepository } from "../repositories/PetRepository.js";
import fs from "fs";
import AdocaoRepository from "../repositories/AdocaoRepository.js";
import AdocaoService from "./AdocaoService.js";

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
    try {
      const pet = await PetRepository.findById(id);
      const adocoes = await AdocaoRepository.findByPetId(id);
      if (adocoes && adocoes.length > 0) {
        for (const adocao of adocoes) {
          console.info(`Deletando adoção ID: ${adocao.id}`);
          await AdocaoService.deleteAdocao(adocao.id);
        }
      }

      if (pet && pet.foto && pet.foto.startsWith("/uploads/")) {
        try {
          const filePath = pet.foto.substring(1);
          fs.unlinkSync(filePath);
          console.info(`Foto removida com sucesso: ${filePath}`);
        } catch (err) {
          console.warn("Erro ao remover foto:", err.message);
        }
      }

      const deletedPet = await PetRepository.delete(id);
      console.info(`Pet ${id} deletado com sucesso.`);
      return deletedPet;
    } catch (error) {
      console.error("Erro ao deletar pet:", error.message);
      console.error(error.stack);
      throw new Error(`Falha ao deletar pet ${id}: ${error.message}`);
    }
  },

  async updateStatus(id, status) {
    return PetRepository.updateStatus(id, status);
  },
};
