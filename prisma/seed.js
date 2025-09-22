import prisma from "../src/config/database.js";
import bcrypt from "bcrypt";

async function main() {
  const senhaHash = await bcrypt.hash("admin123", 10);

  const adminExists = await prisma.usuario.findUnique({
    where: { email: "admin@admin.com" },
  });

  if (!adminExists) {
    await prisma.usuario.create({
      data: {
        nomeCompleto: "Administrador do Abrigo",
        email: "admin@admin.com",
        senhaHash,
        role: "ADMIN",
      },
    });
    console.log("Admin criado com sucesso!");
  } else {
    console.log("Admin já existe.");
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
