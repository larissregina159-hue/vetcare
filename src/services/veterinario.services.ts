import { prisma } from '../config/prisma';

export const listarVeterinarios = () =>
  prisma.veterinario.findMany({
    include: {
      consultas: true,
    },
    orderBy: {
      id: 'desc',
    },
  });

export const buscarVeterinario = (id: number) =>
  prisma.veterinario.findUnique({
    where: {
      id,
    },
    include: {
      consultas: true,
    },
  });

export const criarVeterinario = (data: any) =>
  prisma.veterinario.create({
    data,
  });

export const atualizarVeterinario = (
  id: number,
  data: any
) =>
  prisma.veterinario.update({
    where: {
      id,
    },
    data,
  });

export const excluirVeterinario = (id: number) =>
  prisma.veterinario.delete({
    where: {
      id,
    },
  });
