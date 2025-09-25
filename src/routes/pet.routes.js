import { Router } from "express";
import { upload } from "../config/multer.js";
import { PetController } from "../controllers/PetController.js";

const router = Router();

router.post("/", upload.single("foto"), PetController.createPet);
router.get("/", PetController.getAllPets);
router.get("/:id", PetController.getPetById);
router.put("/:id", upload.single("foto"), PetController.updatePet);
router.delete("/:id", PetController.deletePet);

export default router;
