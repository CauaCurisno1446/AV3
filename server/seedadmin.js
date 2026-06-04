require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const senhaHash = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.create({
    data: {
      nome: "Bruce Wayne",
      telefone: "12 99999-9999",
      endereco: "Mountain Drive, 1007, Gotham City - NJ",
      usuario: "batman",
      senha: senhaHash,
      role: "Administrador",
    },
  });

  console.log("Admin criado:", admin.usuario);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
