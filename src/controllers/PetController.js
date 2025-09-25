import { PetService } from "../services/PetService.js";

export const PetController = {
  async createPet(req, res) {
    try {
      const {
        nome,
        especie,
        sexo,
        dataNascimento,
        descricao,
        status,
      } = req.body;

      const fotoPath = req.file ? req.file.path : null;

      const dataNascimentoDate =
        dataNascimento && !isNaN(Date.parse(dataNascimento))
          ? new Date(dataNascimento)
          : null;

      if (!nome || !especie || !sexo) {
        return res.status(400).json({
          message: "Nome, espécie e sexo são obrigatórios.",
        });
      }

      const newPet = await PetService.createPet({
        nome,
        especie,
        sexo,
        dataNascimento: dataNascimentoDate,
        descricao: descricao || null,
        status: status || "DISPONIVEL",
        foto: fotoPath,
      });

      return res.status(201).json(newPet);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao criar pet." });
    }
  },

  async getAllPets(req, res) {
    try {
      const pets = await PetService.getAllPets();
      return res.json(pets);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar pets." });
    }
  },

  async getPetById(req, res) {
    try {
      const { id } = req.params;
      const pet = await PetService.getPetById(id);

      if (!pet) {
        return res.status(404).json({ message: "Pet não encontrado." });
      }

      return res.json(pet);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar pet." });
    }
  },

  async updatePet(req, res) {
    try {
      const { id } = req.params;
      const {
        nome,
        especie,
        sexo,
        dataNascimento,
        descricao,
        status,
      } = req.body;

      const fotoPath = req.file ? req.file.path : undefined;

      const updateData = {
        ...(nome && { nome }),
        ...(especie && { especie }),
        ...(sexo && { sexo }),
        ...(dataNascimento !== undefined && {
          dataNascimento: dataNascimento ? new Date(dataNascimento) : null,
        }),
        ...(descricao !== undefined && { descricao }),
        ...(status && { status }),
        ...(fotoPath && { foto: fotoPath }),
      };

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
