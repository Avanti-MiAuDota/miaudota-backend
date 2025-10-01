import express from "express";
import cors from "cors";
import routes from "./src/routes/index.js";
import { ensureUploadsDir } from "./src/utils/fileUtils.js";

ensureUploadsDir();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
  })
);
app.use(express.json());
app.use("/api", routes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
