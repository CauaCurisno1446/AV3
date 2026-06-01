require('dotenv').config();

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const senhaHash = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.create({
    data: {
      nome: "Admin Modelo",
      telefone: "12 99999-9999",
      endereco: "Rua das Flores, 135, São José dos Campos - SP",
      usuario: "admin",
      senha: senhaHash,
      role: "Administrador",
    },
  });

  console.log("Admin criado:", admin.usuario);
}

main().catch(console.error).finally(() => prisma.$disconnect());
