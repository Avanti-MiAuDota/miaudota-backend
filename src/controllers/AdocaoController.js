import AdocaoService from "../services/AdocaoService.js";
import {
  adocaoValidation,
  adocaoUpdateValidation,
} from "../validations/adocaoValidation.js";

class AdocaoController {
  // POST /adocoes
  async createAdocao(req, res) {
    try {
      const { error, value } = adocaoValidation.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        return res
          .status(400)
          .json({ errors: error.details.map((e) => e.message) });
      }
      const adocao = await AdocaoService.createAdocao({
        ...value,
        dataAdocao: value.dataAdocao || new Date(),
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
      const { error, value } = adocaoUpdateValidation.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        return res
          .status(400)
          .json({ errors: error.details.map((e) => e.message) });
      }
      const adocao = await AdocaoService.updateAdocao(Number(id), value);
      if (!adocao) {
        return res.status(404).json({ error: "Adoção não encontrada" });
      }
      return res.status(200).json(adocao);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }

  // PATCH /adocoes/:id/status
  async updateAdocaoStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!["PENDENTE", "APROVADA", "REJEITADA"].includes(status)) {
        return res.status(400).json({ error: "Status inválido." });
      }

      const adocaoAtualizada = await AdocaoService.updateAdocaoStatus(
        Number(id),
        status
      );

      if (!adocaoAtualizada) {
        return res.status(404).json({ error: "Adoção não encontrada." });
      }

      return res.status(200).json(adocaoAtualizada);
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
