import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class AdocaoRepository {
  // Cria um novo registro de adoção
  async create(data) {
    return await prisma.adocao.create({
      data: {
        pet: {
          connect: { id: data.petId },
        },
        usuario: {
          connect: { id: data.usuarioId },
        },
        dataAdocao: data.dataAdocao,
        motivo: data.motivo,
        aceitouTermo: data.aceitouTermo ?? false,
        endereco: {
          create: {
            cep: data.endereco.cep,
            logradouro: data.endereco.logradouro,
            numero: data.endereco.numero,
            complemento: data.endereco.complemento,
            bairro: data.endereco.bairro,
            cidade: data.endereco.cidade,
            estado: data.endereco.estado,
            telefone: data.endereco.telefone,
            pais: data.endereco.pais ?? "Brasil",
          },
        },
      },
      include: {
        pet: true,
        usuario: true,
        endereco: true,
      },
    });
  }

  // Retorna todas as adoções
  async findAll() {
    return await prisma.adocao.findMany({
      include: {
        pet: true,
        usuario: true,
        endereco: true,
      },
      orderBy: {
        dataAdocao: "desc",
      },
    });
  }

  // Busca adoção por ID
  async findById(id) {
    return await prisma.adocao.findUnique({
      where: { id: Number(id) },
      include: {
        pet: true,
        usuario: true,
        endereco: true,
      },
    });
  }

  // Atualiza informações da adoção
  async update(id, data) {
    try {
      return await prisma.adocao.update({
        where: { id: Number(id) },
        data: {
          motivo: data.motivo, // atualiza o motivo
          endereco: data.endereco
            ? {
                create: {
                  cep: data.endereco.cep,
                  logradouro: data.endereco.logradouro,
                  numero: data.endereco.numero,
                  complemento: data.endereco.complemento,
                  bairro: data.endereco.bairro,
                  cidade: data.endereco.cidade,
                  estado: data.endereco.estado,
                  telefone: data.endereco.telefone,
                  pais: data.endereco.pais ?? "Brasil",
                },
              }
            : undefined,
        },
        include: {
          pet: true,
          usuario: true,
          endereco: true,
        },
      });
    } catch (error) {
      if (error.code === "P2025") return null;
      throw error;
    }
  }

  // Remove registro de adoção
  async delete(id) {
    try {
      await prisma.adocao.delete({
        where: { id: Number(id) },
      });
      return true;
    } catch (error) {
      // Se não encontrar o registro, retorna false
      if (error.code === "P2025") return false;
      throw error;
    }
  }

  async deleteEndereco(enderecoId) {
    try {
      await prisma.endereco.delete({
        where: { id: Number(enderecoId) },
      });
      return true;
    } catch (error) {
      if (error.code === "P2025") return false;
      throw error;
    }
  }

  async findByUsuarioId(usuarioId) {
    return await prisma.adocao.findMany({
      where: { usuarioId: Number(usuarioId) },
      include: {
        pet: true,
        usuario: true,
        endereco: true,
      },
      orderBy: {
        dataAdocao: "desc",
      },
    });
  }

  async findByPetId(petId) {
    console.log("Buscando adoções para petId:", petId); // Log para depuração
    try {
      return await prisma.adocao.findMany({
        where: { petId: Number(petId) },
        include: {
          pet: true,
          usuario: true,
          endereco: true,
        },
        orderBy: {
          dataAdocao: "desc",
        },
      });
    } catch (error) {
      console.error("Erro ao buscar adoções por pet no repositório:", error);
      throw error;
    }
  }

  // Busca adoção por usuário e pet
  async findByUserAndPet(usuarioId, petId) {
    return await prisma.adocao.findFirst({
      where: {
        usuarioId: Number(usuarioId),
        petId: Number(petId),
      },
    });
  }

  async updateStatus(id, status) {
    try {
      console.info(`Atualizando status da adoção ID: ${id} para ${status}`);
      const updatedAdocao = await prisma.adocao.update({
        where: { id: Number(id) },
        data: { status },
      });
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
}

export default new AdocaoRepository();
