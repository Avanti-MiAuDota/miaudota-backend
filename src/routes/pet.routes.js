import { Router } from "express";
import { upload } from "../config/multer.js";
import { PetController } from "../controllers/PetController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", authMiddleware, upload.single("foto"), PetController.createPet);
router.get("/", PetController.getAllPets);
router.get("/:id", PetController.getPetById);
router.put("/:id", authMiddleware, upload.single("foto"), PetController.updatePet);
router.delete("/:id", authMiddleware, PetController.deletePet);

export default router;
