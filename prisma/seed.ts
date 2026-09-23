import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const senha = await bcrypt.hash('123456', 10);

  await prisma.usuario.upsert({
    where: {
      email: 'admin@vetcare.com',
    },
    update: {},
    create: {
      nome: 'Administrador',
      email: 'admin@vetcare.com',
      senha,
    },
  });

  console.log('Usuário criado: admin@vetcare.com / 123456');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());