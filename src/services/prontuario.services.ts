import { prisma } from '../config/prisma';

export const listarProntuarios = () =>
  prisma.prontuario.findMany({
    include: {
      animal: true,
      consulta: true,
    },
    orderBy: {
      dataRegistro: 'desc',
    },
  });

export const buscarProntuario = (id: number) =>
  prisma.prontuario.findUnique({
    where: {
      id,
    },
    include: {
      animal: true,
      consulta: true,
    },
  });

export const criarProntuario = (data: any) =>
  prisma.prontuario.create({
    data,
    include: {
      animal: true,
      consulta: true,
    },
  });

export const atualizarProntuario = (
  id: number,
  data: any
) =>
  prisma.prontuario.update({
    where: {
      id,
    },
    data,
    include: {
      animal: true,
      consulta: true,
    },
  });

export const excluirProntuario = (id: number) =>
  prisma.prontuario.delete({
    where: {
      id,
    },
  });
