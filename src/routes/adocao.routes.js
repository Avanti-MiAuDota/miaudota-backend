import { Router } from "express";
import AdocaoController from "../controllers/AdocaoController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("USUARIO"),
  AdocaoController.createAdocao
);

router.get("/", AdocaoController.getAdocoes);
router.get("/:id", AdocaoController.getAdocaoById);
router.put("/:id", authMiddleware, AdocaoController.updateAdocao);
router.delete("/:id", authMiddleware, AdocaoController.deleteAdocao);
router.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware("ADMIN"),
  AdocaoController.updateAdocaoStatus
);

export default router;
