import { NextFunction, Request, Response } from 'express';
import { Prisma } from '@prisma/client';

export function errorMiddleware(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(error);

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      return res.status(409).json({
        erro: 'Registro duplicado.',
      });
    }

    if (error.code === 'P2025') {
      return res.status(404).json({
        erro: 'Registro não encontrado.',
      });
    }

    if (error.code === 'P2003') {
      return res.status(409).json({
        erro:
          'Não é possível concluir a operação por causa de registros relacionados.',
      });
    }
  }

  return res.status(500).json({
    erro: 'Erro interno do servidor.',
  });
}