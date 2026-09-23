import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/prisma';

export async function cadastrarUsuario(
  nome: string,
  email: string,
  senha: string
) {
  const senhaHash = await bcrypt.hash(senha, 10);

  return prisma.usuario.create({
    data: {
      nome,
      email: email.toLowerCase().trim(),
      senha: senhaHash,
    },
    select: {
      id: true,
      nome: true,
      email: true,
      criadoEm: true,
    },
  });
}

export async function autenticarUsuario(
  email: string,
  senha: string
) {
  const usuario = await prisma.usuario.findUnique({
    where: {
      email: email.toLowerCase().trim(),
    },
  });

  if (!usuario) {
    return null;
  }

  const senhaValida = await bcrypt.compare(
    senha,
    usuario.senha
  );

  if (!senhaValida) {
    return null;
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET não configurado.');
  }

  const token = jwt.sign(
    {
      id: usuario.id,
      email: usuario.email,
    },
    secret,
    {
      expiresIn: '1d',
    }
  );

  return {
    token,
    usuario: {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
    },
  };
}