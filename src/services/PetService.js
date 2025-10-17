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

      const bucketName = "pet-images";
      const pathInBucket = `public/${fileName}`;

      fotoUrl = `${process.env.SUPABASE_IMAGE_URL}/${bucketName}/${pathInBucket}`;
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
    try {
      console.log("PetService.getPetById chamado com ID:", id, typeof id);
      const result = await PetRepository.findById(id);
      console.log("Resultado do repository:", !!result);
      return result;
    } catch (error) {
      console.error("Erro no PetService.getPetById:", error);
      throw error;
    }
  },

  async updatePet(id, data) {
    return PetRepository.update(id, data);
  },

  async deletePet(id) {
    const pet = await PetRepository.findById(id);
    if (pet && pet.foto && pet.foto.includes("/pet-images/")) {
      try {
        const pathSegments = pet.foto.split("/pet-images/");
        const pathInBucket = pathSegments[pathSegments.length - 1];
        const { error } = await supabase.storage
          .from("pet-images")
          .remove([pathInBucket]);

        if (error) {
          console.warn("Erro ao remover foto do Storage:", error.message);
        }
      } catch (err) {
        console.error("Erro ao processar remoção do arquivo:", err);
      }
    }
    return PetRepository.delete(id);
  },

  async updateStatus(id, status) {
    return PetRepository.updateStatus(id, status);
  },
};
