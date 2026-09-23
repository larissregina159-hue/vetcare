import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const senha = await bcrypt.hash('123456', 10);

  console.log('Senha criada:', senha);

  const clientes = await prisma.cliente.findMany();

  console.log('Clientes:', clientes);
}

main()
  .catch((erro) => {
    console.error('Erro:', erro);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
