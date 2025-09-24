import { Router } from "express";
import { createPet } from "../controllers/PetController.js";

const router = Router();

router.post("/", createPet);

export default router;
