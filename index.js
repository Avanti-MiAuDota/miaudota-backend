import express from "express";
import cors from "cors";
import routes from "./src/routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", routes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
