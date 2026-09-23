import { prisma } from '../config/prisma';

export const listarUsuarios = () =>
  prisma.usuario.findMany({
    select: {
      id: true,
      nome: true,
      email: true,
      criadoEm: true,
    },
    orderBy: {
      id: 'desc',
    },
  });

export const buscarUsuario = (id: number) =>
  prisma.usuario.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      nome: true,
      email: true,
      criadoEm: true,
    },
  });

export const atualizarUsuario = (
  id: number,
  data: any
) =>
  prisma.usuario.update({
    where: {
      id,
    },
    data,
    select: {
      id: true,
      nome: true,
      email: true,
      criadoEm: true,
    },
  });

export const excluirUsuario = (id: number) =>
  prisma.usuario.delete({
    where: {
      id,
    },
  });