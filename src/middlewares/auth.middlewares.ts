import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

type TokenPayload = {
  id: number;
  email: string;
};

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const header = req.headers.authorization;

  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({
      erro: 'Token não informado.',
    });
  }

  const token = header.slice(7).trim();
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return res.status(500).json({
      erro: 'JWT_SECRET não configurado.',
    });
  }

  try {
    const payload = jwt.verify(token, secret) as TokenPayload;

    if (!payload?.id || !payload?.email) {
      return res.status(401).json({
        erro: 'Token inválido.',
      });
    }

    req.usuario = {
      id: payload.id,
      email: payload.email,
      nome: '',
    };

    next();
  } catch {
    return res.status(401).json({
      erro: 'Token inválido ou expirado.',
    });
  }
}