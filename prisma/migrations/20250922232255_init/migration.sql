-- CreateEnum
CREATE TYPE "public"."TipoUsuario" AS ENUM ('USUARIO', 'ADMIN');

-- CreateEnum
CREATE TYPE "public"."EspeciePet" AS ENUM ('CAO', 'GATO');

-- CreateEnum
CREATE TYPE "public"."SexoPet" AS ENUM ('MACHO', 'FEMEA');

-- CreateEnum
CREATE TYPE "public"."StatusPet" AS ENUM ('DISPONIVEL', 'EM_ANALISE', 'ADOTADO');

-- CreateTable
CREATE TABLE "public"."Usuario" (
    "id" SERIAL NOT NULL,
    "nome_completo" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT,
    "senha_hash" TEXT NOT NULL,
    "enderecoId" INTEGER,
    "role" "public"."TipoUsuario" NOT NULL DEFAULT 'USUARIO',
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Endereco" (
    "id" SERIAL NOT NULL,
    "cep" TEXT NOT NULL,
    "logradouro" TEXT,
    "numero" TEXT,
    "complemento" TEXT,
    "bairro" TEXT,
    "cidade" TEXT,
    "estado" TEXT,
    "pais" TEXT NOT NULL DEFAULT 'Brasil',

    CONSTRAINT "Endereco_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Pet" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "especie" "public"."EspeciePet" NOT NULL,
    "sexo" "public"."SexoPet" NOT NULL,
    "data_nascimento" TIMESTAMP(3),
    "descricao" TEXT,
    "status" "public"."StatusPet" NOT NULL DEFAULT 'DISPONIVEL',
    "foto" TEXT,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Adocao" (
    "id" SERIAL NOT NULL,
    "petId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "data_adocao" TIMESTAMP(3) NOT NULL,
    "motivo" TEXT NOT NULL,
    "aceitouTermo" BOOLEAN NOT NULL DEFAULT false,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Adocao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "public"."Usuario"("email");

-- AddForeignKey
ALTER TABLE "public"."Usuario" ADD CONSTRAINT "Usuario_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "public"."Endereco"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Adocao" ADD CONSTRAINT "Adocao_petId_fkey" FOREIGN KEY ("petId") REFERENCES "public"."Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Adocao" ADD CONSTRAINT "Adocao_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
