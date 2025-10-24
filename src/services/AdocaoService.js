// O Service precisa de Repositórios para Adocao, Pet e Usuario.
import AdocaoRepository from "../repositories/AdocaoRepository.js";
import { PetRepository } from "../repositories/PetRepository.js";
import { UsuarioRepository } from "../repositories/UsuarioRepository.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class AdocaoService {
  // Método principal: Lida com a criação de uma nova adoção e todas as regras de negócio.
  async createAdocao(dadosAdocao) {
    const { petId, usuarioId } = dadosAdocao;

    // 1. Validar se o usuário existe (Regra de Negócio)
    const usuario = await UsuarioRepository.findById(usuarioId);
    if (!usuario) {
      throw new Error("Usuário não encontrado.");
    }

    // 2. Verificar se o pet existe (Regra de Negócio)
    const pet = await PetRepository.findById(petId);
    if (!pet) {
      throw new Error("Pet não encontrado.");
    }

    // 3. Verificar se o pet está ADOTADO. (Regra de Negócio)
    if (pet.status === "ADOTADO") {
      throw new Error(
        `Pet não está disponível para adoção. Status atual: ${pet.status}.`
      );
    }

    // 4. Verificar se já existe uma adoção para o mesmo usuário e pet
    const adocaoExistente = await AdocaoRepository.findByUserAndPet(
      usuarioId,
      petId
    );
    if (adocaoExistente) {
      throw new Error(
        "Já existe uma solicitação de adoção para este pet por este usuário."
      );
    }

    // 5. Alterar status do pet para EM_ANALISE (Regra de Negócio)
    // Isso "trava" o pet, indicando que uma solicitação de adoção foi registrada.
    await PetRepository.updateStatus(petId, "EM_ANALISE");

    // 6. Cria a adoção (Usando o Repositório)
    // O AdocaoRepository só salva os campos presentes no schema (petId, usuarioId, dataAdocao, etc.)
    const novaAdocao = await AdocaoRepository.create(dadosAdocao);

    return novaAdocao;
  }

  // -----------------------------------------------------------------
  // Métodos CRUD básicos: Apenas chamam o Repositório
  // -----------------------------------------------------------------

  async getAdocoes() {
    return await AdocaoRepository.findAll();
  }

  async getAdocaoById(id) {
    const adocao = await AdocaoRepository.findById(id);
    if (!adocao) {
      // Lança um erro que o Controller traduzirá para 404
      throw new Error("Adoção não encontrada");
    }
    return adocao;
  }

  async updateAdocao(id, updateData) {
    // Regras de negócio de UPDATE (como alteração de status do Pet após aprovação)
    // seriam implementadas aqui antes de chamar o Repositório.

    const adocaoAtualizada = await AdocaoRepository.update(id, updateData);
    if (!adocaoAtualizada) {
      // Lança um erro que o Controller traduzirá para 404
      throw new Error("Adoção não encontrada");
    }
    return adocaoAtualizada;
  }

  async updateStatus(id, status) {
    try {
      console.info(`Atualizando status da adoção ID: ${id} para ${status}`);
      const updatedAdocao = await prisma.adocao.update({
        where: { id: Number(id) },
        data: { status },
        include: { pet: true }, // Inclui o pet relacionado
      });

      // Se o status da adoção for "APROVADA", atualize o status do pet para "ADOTADO"
      if (status === "APROVADA" && updatedAdocao.pet) {
        console.info(
          `Atualizando status do Pet ID: ${updatedAdocao.pet.id} para ADOTADO`
        );
        await prisma.pet.update({
          where: { id: updatedAdocao.pet.id },
          data: { status: "ADOTADO" },
        });
      }

      console.info(`Status atualizado com sucesso: ${updatedAdocao.status}`);
      return updatedAdocao;
    } catch (error) {
      if (error.code === "P2025") {
        console.error("Adoção não encontrada para atualização de status.");
        return null;
      }
      throw error;
    }
  }

  async deleteAdocao(id) {
    const adocao = await AdocaoRepository.findById(id);

    if (!adocao) {
      throw new Error("Adoção não encontrada");
    }
    if (adocao.pet && adocao.pet.status === "EM_ANALISE") {
      console.info(
        `Atualizando status do Pet ID: ${adocao.petId} para DISPONIVEL`
      );
      await PetRepository.updateStatus(adocao.petId, "DISPONIVEL");
    }

    console.info(`Excluindo adoção ID: ${id}`);
    const deleted = await AdocaoRepository.delete(id);
    if (adocao.endereco) {
      console.info(`Excluindo endereço ID: ${adocao.endereco.id}`);
      await AdocaoRepository.deleteEndereco(adocao.endereco.id);
    }

    return deleted;
  }
}

export default new AdocaoService();
