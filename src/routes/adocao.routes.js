import { Router } from "express";
import AdocaoController from "../controllers/AdocaoController.js"; 
// Importa o Controller (assumindo o caminho correto)

const router = Router();

// POST /adocoes -> Cria nova adoção
// Chama o método createAdocao do Controller
router.post("/adocoes", AdocaoController.createAdocao);

// GET /adocoes -> Lista todas as adoções
// Chama o método getAdocoes do Controller
router.get("/adocoes", AdocaoController.getAdocoes);

// GET /adocoes/:id -> Busca adoção por ID
// Chama o método getAdocaoById do Controller
router.get("/adocoes/:id", AdocaoController.getAdocaoById);

// PUT /adocoes/:id -> Atualiza adoção
// Chama o método updateAdocao do Controller
router.put("/adocoes/:id", AdocaoController.updateAdocao);

// DELETE /adocoes/:id -> Remove adoção
// Chama o método deleteAdocao do Controller
router.delete("/adocoes/:id", AdocaoController.deleteAdocao);

export default router;