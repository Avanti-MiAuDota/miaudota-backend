// O Service precisa de Repositórios para Adocao, Pet e Usuario.
import AdocaoRepository from "../repositories/AdocaoRepository.js";
import { PetRepository } from "../repositories/PetRepository.js";
import { UsuarioRepository } from "../repositories/UsuarioRepository.js";

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

  async updateAdocaoStatus(id, status) {
    const adocao = await AdocaoRepository.findById(id);

    if (!adocao) {
      throw new Error("Adoção não encontrada");
    }

    // Atualiza o status da adoção
    const adocaoAtualizada = await AdocaoRepository.update(id, { status });

    // Se a adoção foi rejeitada, verificar se o pet deve voltar para DISPONIVEL
    if (status === "REJEITADA") {
      const adocoesPendentes = await AdocaoRepository.findByPetId(adocao.petId);

      // Se não houver mais adoções relacionadas ao pet, torná-lo DISPONIVEL
      if (adocoesPendentes.length === 0) {
        await PetRepository.updateStatus(adocao.petId, "DISPONIVEL");
      }
    }

    return adocaoAtualizada;
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
