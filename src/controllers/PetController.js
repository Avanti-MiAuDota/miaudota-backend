import { PetService } from "../services/PetService.js";
import {
  petValidation,
  petUpdateValidation,
} from "../validations/petValidation.js";

export const PetController = {
  async createPet(req, res) {
    try {
      const { error, value } = petValidation.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        return res
          .status(400)
          .json({ errors: error.details.map((e) => e.message) });
      }
      const fotoPath = req.file
        ? `${process.env.SUPABASE_IMAGE_URL}/${req.file.filename}`
        : null;

      const newPet = await PetService.createPet({
        ...value,
        fotoFile: req.file,
      });
      return res.status(201).json(newPet);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao criar pet." });
    }
  },

  async getAllPets(_req, res) {
    try {
      console.log("Tentando buscar pets...");
      console.log("DATABASE_URL existe?", !!process.env.DATABASE_URL);
      const pets = await PetService.getAllPets();
      console.log("Pets encontrados:", pets.length);
      return res.json(pets);
    } catch (error) {
      console.error(error);
      console.error("Erro completo:", error);
      console.error("Mensagem:", error.message);
      console.error("Code:", error.code);
      return res.status(500).json({ message: "Erro ao buscar pets." });
    }
  },

  async getPetById(req, res) {
    try {
      const { id } = req.params;
      console.log("Buscando pet com ID:", id);
      
      // Validar se o ID é um número válido
      const petId = parseInt(id);
      if (isNaN(petId)) {
        console.log("ID inválido:", id);
        return res.status(400).json({ message: "ID do pet inválido." });
      }
      
      console.log("ID parseado:", petId);
      const pet = await PetService.getPetById(petId);
      console.log("Pet encontrado:", !!pet);

      if (!pet) {
        console.log("Pet não encontrado com ID:", petId);
        return res.status(404).json({ message: "Pet não encontrado." });
      }

      console.log("Retornando pet:", pet.nome);
      return res.json(pet);
    } catch (error) {
      console.error("Erro detalhado ao buscar pet:", {
        message: error.message,
        stack: error.stack,
        name: error.name,
        code: error.code
      });
      return res.status(500).json({ 
        message: "Erro ao buscar pet.",
        error: process.env.NODE_ENV === "development" ? error.message : undefined
      });
    }
  },

  async updatePet(req, res) {
    try {
      const { id } = req.params;
      const { error, value } = petUpdateValidation.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        return res
          .status(400)
          .json({ errors: error.details.map((e) => e.message) });
      }
      // Salva apenas o caminho relativo para que funcione com express.static
      const fotoPath = req.file ? `/uploads/${req.file.filename}` : undefined;
      const updateData = { ...value };
      if (fotoPath) updateData.foto = fotoPath;
      const updatedPet = await PetService.updatePet(id, updateData);
      return res.json(updatedPet);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao atualizar pet." });
    }
  },

  async deletePet(req, res) {
    try {
      const { id } = req.params;
      await PetService.deletePet(id);
      return res.json({ message: "Pet removido com sucesso." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao remover pet." });
    }
  },
};
