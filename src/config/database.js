import { PrismaClient } from "@prisma/client";

// Configuração específica para ambiente serverless
let prisma;

if (process.env.NODE_ENV === "production") {
  // Em produção (Vercel), cria nova instância sempre para evitar prepared statement conflicts
  prisma = new PrismaClient({
    log: ["error"],
    errorFormat: "minimal",
  });
} else {
  // Em desenvolvimento, usa singleton global
  const globalForPrisma = globalThis;

  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({
      log: ["error", "warn"],
      errorFormat: "pretty",
    });
  }

  prisma = globalForPrisma.prisma;
}

export default prisma;
