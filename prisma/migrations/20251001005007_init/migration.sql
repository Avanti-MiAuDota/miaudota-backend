/*
  Warnings:

  - You are about to drop the column `enderecoId` on the `Usuario` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[enderecoId]` on the table `Adocao` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."Usuario" DROP CONSTRAINT "Usuario_enderecoId_fkey";

-- AlterTable
ALTER TABLE "public"."Adocao" ADD COLUMN     "enderecoId" INTEGER;

-- AlterTable
ALTER TABLE "public"."Usuario" DROP COLUMN "enderecoId";

-- CreateIndex
CREATE UNIQUE INDEX "Adocao_enderecoId_key" ON "public"."Adocao"("enderecoId");

-- AddForeignKey
ALTER TABLE "public"."Adocao" ADD CONSTRAINT "Adocao_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "public"."Endereco"("id") ON DELETE SET NULL ON UPDATE CASCADE;
