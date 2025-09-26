import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", UsuarioController.getAll);
router.get("/:id", UsuarioController.getById);
router.post("/", UsuarioController.create);
router.put("/:id", authMiddleware, UsuarioController.update);
router.delete("/:id", authMiddleware, UsuarioController.delete);

export default router;

