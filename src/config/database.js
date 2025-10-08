import { PrismaClient } from "@prisma/client";

const globalForPrisma = global;

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query", "error", "warn"],
    errorFormat: "pretty",
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Log para debug
console.log(
  "DATABASE_URL configurada:",
  process.env.DATABASE_URL ? "✓ SIM" : "✗ NÃO"
);

export default prisma;
