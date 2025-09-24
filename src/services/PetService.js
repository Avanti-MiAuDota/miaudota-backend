import * as PetRepository from "../repositories/PetRepository.js";

export async function createPet({
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
    status,
    foto,
  };

  return PetRepository.createPet(petData);
}
