import AdocaoService from "../services/AdocaoService.js";

class AdocaoController {
  // POST /adocoes
  async createAdocao(req, res) {
    try {
      const { petId, usuarioId, motivo, aceitouTermo, endereco } = req.body;

      if (!petId || !usuarioId || !motivo) {
        return res.status(400).json({ error: "Campos obrigatórios faltando" });
      }

      const dataAdocao = new Date();

      const adocao = await AdocaoService.createAdocao({
        petId,
        usuarioId,
        motivo,
        aceitouTermo: aceitouTermo ?? false,
        dataAdocao,
        endereco,
      });

      return res.status(201).json(adocao);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }

  // GET /adocoes
  async getAdocoes(req, res) {
    try {
      const adocoes = await AdocaoService.getAdocoes();
      return res.status(200).json(adocoes);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }

  // GET /adocoes/:id
  async getAdocaoById(req, res) {
    try {
      const { id } = req.params;
      const adocao = await AdocaoService.getAdocaoById(Number(id));

      if (!adocao) {
        return res.status(404).json({ error: "Adoção não encontrada" });
      }

      return res.status(200).json(adocao);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }

  // PUT /adocoes/:id
  async updateAdocao(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const adocao = await AdocaoService.updateAdocao(Number(id), updateData);

      if (!adocao) {
        return res.status(404).json({ error: "Adoção não encontrada" });
      }

      return res.status(200).json(adocao);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }

  // DELETE /adocoes/:id
  async deleteAdocao(req, res) {
    try {
      const { id } = req.params;
      const deleted = await AdocaoService.deleteAdocao(Number(id));

      if (!deleted) {
        return res.status(404).json({ error: "Adoção não encontrada" });
      }

      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new AdocaoController();
