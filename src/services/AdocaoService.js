// O Service precisa de Repositórios para Adocao, Pet e Usuario.
import AdocaoRepository from '../repositories/AdocaoRepository.js';
import { PetRepository } from '../repositories/PetRepository.js'; 
import { UsuarioRepository } from '../repositories/UsuarioRepository.js'; 

class AdocaoService {

    // Método principal: Lida com a criação de uma nova adoção e todas as regras de negócio.
    async createAdocao(dadosAdocao) {
        const { petId, usuarioId } = dadosAdocao;

        // 1. Validar se o usuário existe (Regra de Negócio)
        const usuario = await UsuarioRepository.findById(usuarioId);
        if (!usuario) {
            throw new Error('Usuário não encontrado.');
        }

        // 2. Verificar se o pet existe (Regra de Negócio)
        const pet = await PetRepository.findById(petId);
        if (!pet) {
            throw new Error('Pet não encontrado.');
        }

        // 3. Verificar se o pet está com status DISPONIVEL (Regra de Negócio)
        if (pet.status !== 'DISPONIVEL') {
            throw new Error(`Pet não está disponível para adoção. Status atual: ${pet.status}.`);
        }

        // 4. Garantir que não exista outra adoção ativa para o mesmo pet (Regra de Negócio)
        // Heurística adaptada: Se o Pet tem o status EM_ANALISE ou ADOTADO,
        // consideramos que o processo já está em andamento/finalizado.
        if (pet.status === 'EM_ANALISE' || pet.status === 'ADOTADO') {
            throw new Error('Já existe um processo de adoção ativo ou finalizado para este pet.');
        }

        // 5. Alterar status do pet para EM_ANALISE (Regra de Negócio)
        // Isso "trava" o pet, indicando que uma solicitação de adoção foi registrada.
        await PetRepository.updateStatus(petId, 'EM_ANALISE');

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
            throw new Error('Adoção não encontrada'); 
        }
        return adocao;
    }

    async updateAdocao(id, updateData) {
        // Regras de negócio de UPDATE (como alteração de status do Pet após aprovação)
        // seriam implementadas aqui antes de chamar o Repositório.
        
        const adocaoAtualizada = await AdocaoRepository.update(id, updateData);
        if (!adocaoAtualizada) {
            // Lança um erro que o Controller traduzirá para 404
            throw new Error('Adoção não encontrada');
        }
        return adocaoAtualizada;
    }

    async deleteAdocao(id) {
        // Regra de Negócio: Ao deletar uma adoção em análise, o Pet deve voltar para DISPONIVEL.
        const adocao = await AdocaoRepository.findById(id);
        
        if (adocao) {
            // Se o Pet estava em análise devido a esta adoção, ele volta a ser DISPONIVEL
            if (adocao.pet.status === 'EM_ANALISE') {
                await PetRepository.updateStatus(adocao.petId, 'DISPONIVEL');
            }
        }
        
        const deleted = await AdocaoRepository.delete(id);
        
        return deleted; // Retorna true ou false (que o Controller usa para 404)
    }
}

export default new AdocaoService();