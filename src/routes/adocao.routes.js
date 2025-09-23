import { Router } from "express";

const router = Router();

// Rotas de exemplo
router.get("/", (req, res) => {
  res.send("Lista de adoções");
});

export default router;
