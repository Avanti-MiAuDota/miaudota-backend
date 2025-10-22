-- CreateEnum
CREATE TYPE "public"."StatusAdocao" AS ENUM ('PENDENTE', 'APROVADA', 'REJEITADA');

-- AlterTable
ALTER TABLE "public"."Adocao" ADD COLUMN     "status" "public"."StatusAdocao" NOT NULL DEFAULT 'PENDENTE';
