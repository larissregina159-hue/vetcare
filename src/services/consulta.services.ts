import { prisma } from '../config/prisma';

export const listarConsultas = () =>
  prisma.consulta.findMany({
    include: {
      animal: true,
      veterinario: true,
      prontuario: true,
    },
    orderBy: {
      dataConsulta: 'desc',
    },
  });

export const buscarConsulta = (id: number) =>
  prisma.consulta.findUnique({
    where: {
      id,
    },
    include: {
      animal: true,
      veterinario: true,
      prontuario: true,
    },
  });

export const criarConsulta = (data: any) =>
  prisma.consulta.create({
    data,
    include: {
      animal: true,
      veterinario: true,
    },
  });

export const atualizarConsulta = (
  id: number,
  data: any
) =>
  prisma.consulta.update({
    where: {
      id,
    },
    data,
    include: {
      animal: true,
      veterinario: true,
      prontuario: true,
    },
  });

export const excluirConsulta = (id: number) =>
  prisma.consulta.delete({
    where: {
      id,
    },
  });