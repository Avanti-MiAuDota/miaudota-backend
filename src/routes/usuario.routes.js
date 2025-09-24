import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController.js";

const router = Router();

router.get("/", UsuarioController.getAll);
router.get("/:id", UsuarioController.getById);
router.post("/", UsuarioController.create);
router.put("/:id", UsuarioController.update);
router.delete("/:id", UsuarioController.delete);

export default router;

