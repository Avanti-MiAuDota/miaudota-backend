import fs from "fs";
import path from "path";

export function ensureUploadsDir() {
  const uploadsPath = path.resolve("uploads");
  if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath, { recursive: true });
  }
}
