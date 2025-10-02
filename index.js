import express from "express";
import cors from "cors";
import routes from "./src/routes/index.js";
import { ensureUploadsDir } from "./src/utils/fileUtils.js";

ensureUploadsDir();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  })
);
app.use(express.json());

app.use("/uploads", express.static("uploads"));
app.use("/images", express.static("prisma/pet_images_seed"));

app.use("/api", routes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
