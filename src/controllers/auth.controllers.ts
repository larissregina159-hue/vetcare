import { Request, Response } from 'express';
import {
  autenticarUsuario,
  cadastrarUsuario,
} from '../services/auth.services';

export async function register(
  req: Request,
  res: Response
) {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({
        erro: 'Nome, e-mail e senha são obrigatórios.',
      });
    }

    if (String(senha).length < 6) {
      return res.status(400).json({
        erro: 'A senha deve ter pelo menos 6 caracteres.',
      });
    }

    const usuario = await cadastrarUsuario(
      String(nome),
      String(email),
      String(senha)
    );

    return res.status(201).json({
      usuario,
    });
  } catch (error: any) {
    if (error?.code === 'P2002') {
      return res.status(409).json({
        erro: 'Este e-mail já está cadastrado.',
      });
    }

    console.error(error);

    return res.status(500).json({
      erro: 'Erro interno do servidor.',
    });
  }
}

export async function login(
  req: Request,
  res: Response
) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        erro: 'E-mail e senha são obrigatórios.',
      });
    }

    const resultado = await autenticarUsuario(
      String(email),
      String(senha)
    );

    if (!resultado) {
      return res.status(401).json({
        erro: 'E-mail ou senha inválidos.',
      });
    }

    return res.status(200).json(resultado);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: 'Erro interno do servidor.',
    });
  }
}

export function me(
  req: Request,
  res: Response
) {
  return res.json({
    usuario: req.usuario,
  });
}