import * as PetService from "../services/PetService.js";

export async function createPet(req, res) {
  try {
    const { nome, especie, sexo, dataNascimento, descricao, status, foto } =
      req.body;

    // Validação mínima (pode usar Joi depois)
    if (!nome || !especie || !sexo) {
      return res
        .status(400)
        .json({ message: "Nome, espécie e sexo são obrigatórios." });
    }

    const newPet = await PetService.createPet({
      nome,
      especie,
      sexo,
      dataNascimento,
      descricao,
      status,
      foto,
    });
    return res.status(201).json(newPet);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao criar pet." });
  }
}
