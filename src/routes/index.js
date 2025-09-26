import { Router } from "express";
import petRoutes from "./pet.routes.js";
import usuarioRoutes from "./usuario.routes.js";
import adocaoRoutes from "./adocao.routes.js";
import authRoutes from "./auth.routes.js";

const router = Router();

router.use("/auth", authRoutes);

router.use("/pets", petRoutes);
router.use("/usuarios", usuarioRoutes);
router.use("/adocoes", adocaoRoutes);

export default router;
