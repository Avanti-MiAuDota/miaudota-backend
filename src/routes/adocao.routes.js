import { Router } from "express";
import AdocaoController from "../controllers/AdocaoController.js"; 
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
// Importa o Controller (assumindo o caminho correto)

const router = Router();

// POST /adocoes -> Cria nova adoção
// Chama o método createAdocao do Controller
router.post("/", authMiddleware, roleMiddleware("USUARIO"), AdocaoController.createAdocao);

// GET /adocoes -> Lista todas as adoções
// Chama o método getAdocoes do Controller
router.get("/", AdocaoController.getAdocoes);

// GET /adocoes/:id -> Busca adoção por ID
// Chama o método getAdocaoById do Controller
router.get("/:id", AdocaoController.getAdocaoById);

// PUT /adocoes/:id -> Atualiza adoção
// Chama o método updateAdocao do Controller
router.put("/:id", authMiddleware, AdocaoController.updateAdocao);

// DELETE /adocoes/:id -> Remove adoção
// Chama o método deleteAdocao do Controller
router.delete("/:id", authMiddleware, roleMiddleware("ADMIN"), AdocaoController.deleteAdocao);

export default router;