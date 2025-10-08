import express from "express";
import cors from "cors";
import routes from "./src/routes/index.js";
import { ensureUploadsDir } from "./src/utils/fileUtils.js";

// Garantir que o diretório existe apenas em desenvolvimento
if (process.env.NODE_ENV !== "production") {
  ensureUploadsDir();
}

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "https://miaudota-frontend-eta.vercel.app",
    ],
  })
);

app.use(express.json());

// Rota raiz para teste
app.get("/", (req, res) => {
  res.json({
    message: "MiAuDota API está funcionando! 🐾",
    endpoints: {
      pets: "/api/pets",
      usuarios: "/api/usuarios",
      adocoes: "/api/adocoes",
    },
  });
});

app.use("/uploads", express.static("uploads"));
app.use("/images", express.static("prisma/pet_images_seed"));

app.use("/api", routes);

// Para desenvolvimento local
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Para Vercel (serverless)
export default app;
