import { Router } from "express";
import { upload } from "../config/multer.js";
import { PetController } from "../controllers/PetController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = Router();

router.post("/", authMiddleware, roleMiddleware("ADMIN"), upload.single("foto"), PetController.createPet);
router.get("/", PetController.getAllPets);
router.get("/:id", PetController.getPetById);
router.put("/:id", authMiddleware, roleMiddleware("ADMIN"), upload.single("foto"), PetController.updatePet);
router.delete("/:id", authMiddleware, roleMiddleware("ADMIN"), PetController.deletePet);

export default router;
