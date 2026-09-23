import { prisma } from '../config/prisma';

export const listarClientes = () =>
  prisma.cliente.findMany({
    include: {
      animais: true,
    },
    orderBy: {
      id: 'desc',
    },
  });

export const buscarCliente = (id: number) =>
  prisma.cliente.findUnique({
    where: {
      id,
    },
    include: {
      animais: true,
    },
  });

export const criarCliente = (data: any) =>
  prisma.cliente.create({
    data,
  });

export const atualizarCliente = (
  id: number,
  data: any
) =>
  prisma.cliente.update({
    where: {
      id,
    },
    data,
  });

export const excluirCliente = (id: number) =>
  prisma.cliente.delete({
    where: {
      id,
    },
  });