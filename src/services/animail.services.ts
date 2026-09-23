import { prisma } from '../config/prisma';

export const listarAnimais = () =>
  prisma.animal.findMany({
    include: {
      cliente: true,
    },
    orderBy: {
      id: 'desc',
    },
  });

export const buscarAnimal = (id: number) =>
  prisma.animal.findUnique({
    where: {
      id,
    },
    include: {
      cliente: true,
      consultas: true,
      prontuarios: true,
    },
  });

export const criarAnimal = (data: any) =>
  prisma.animal.create({
    data,
  });

export const atualizarAnimal = (
  id: number,
  data: any
) =>
  prisma.animal.update({
    where: {
      id,
    },
    data,
  });

export const excluirAnimal = (id: number) =>
  prisma.animal.delete({
    where: {
      id,
    },
  });
