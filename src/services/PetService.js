import { PetRepository } from "../repositories/PetRepository.js";
import supabase from "../utils/supabaseClient.js";

export const PetService = {
  async createPet({
    nome,
    especie,
    sexo,
    dataNascimento,
    descricao,
    status,
    fotoFile,
  }) {
    let fotoUrl = null;

    if (fotoFile) {
      const { originalname, mimetype, buffer } = fotoFile;
      const fileName = `${Date.now()}-${originalname}`;

      const { error } = await supabase.storage
        .from("pet-images")
        .upload(`public/${fileName}`, buffer, {
          contentType: mimetype,
          upsert: false,
        });

      if (error) {
        console.error("Erro ao enviar imagem:", error.message);
        throw new Error("Falha no upload da imagem");
      }

      fotoUrl = `${process.env.SUPABASE_IMAGE_URL}/${fileName}`;
    }

    const petData = {
      nome,
      especie,
      sexo,
      dataNascimento,
      descricao,
      status: status || "DISPONIVEL",
      foto: fotoUrl,
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
    if (pet && pet.foto && pet.foto.includes(process.env.SUPABASE_IMAGE_URL)) {
      try {
        const fileName = pet.foto.split("/").pop();
        await supabase.storage.from("pet-images").remove([fileName]);
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
