import { Router } from "express";
import AdocaoController from "../controllers/AdocaoController.js"; 
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
// Importa o Controller (assumindo o caminho correto)

const router = Router();


router.post("/", authMiddleware, roleMiddleware("USUARIO"), AdocaoController.createAdocao);
router.get("/", AdocaoController.getAdocoes);
router.get("/:id", AdocaoController.getAdocaoById);
router.put("/:id", authMiddleware, AdocaoController.updateAdocao);
router.patch("/:id/status", authMiddleware, AdocaoController.updateAdocaoStatus);
router.delete("/:id", authMiddleware, AdocaoController.deleteAdocao);

export default router;