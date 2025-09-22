import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const prismaClient = new PrismaClient();

async function testConnection() {
  try {
    await prismaClient.$connect();
    console.log("Conexão com o banco OK!");
  } catch (err) {
    console.error("Erro na conexão:", err.message);
  } finally {
    await prismaClient.$disconnect();
  }
}

testConnection();

app.listen(8080, () => {
  console.log('Server is running on port 8080');
})
