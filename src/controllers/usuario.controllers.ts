import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import * as service from '../services/usuario.services';

const idOf = (req: Request) =>
  Number(req.params.id);

export async function listar(
  _req: Request,
  res: Response
) {
  return res.json(
    await service.listarUsuarios()
  );
}

export async function buscar(
  req: Request,
  res: Response
) {
  const usuario =
    await service.buscarUsuario(
      idOf(req)
    );

  return usuario
    ? res.json(usuario)
    : res.status(404).json({
        erro: 'Usuário não encontrado.',
      });
}

export async function atualizar(
  req: Request,
  res: Response
) {
  try {
    const {
      nome,
      email,
      senha,
    } = req.body;

    const data: any = {};

    if (nome !== undefined) {
      data.nome = nome;
    }

    if (email !== undefined) {
      data.email = email;
    }

    if (senha !== undefined) {
      if (String(senha).length < 6) {
        return res.status(400).json({
          erro:
            'A senha deve ter pelo menos 6 caracteres.',
        });
      }

      data.senha = await bcrypt.hash(
        String(senha),
        10
      );
    }

    return res.json(
      await service.atualizarUsuario(
        idOf(req),
        data
      )
    );
  } catch (e: any) {
    if (e?.code === 'P2025') {
      return res.status(404).json({
        erro: 'Usuário não encontrado.',
      });
    }

    throw e;
  }
}

export async function excluir(
  req: Request,
  res: Response
) {
  try {
    await service.excluirUsuario(
      idOf(req)
    );

    return res.status(204).send();
  } catch (e: any) {
    if (e?.code === 'P2025') {
      return res.status(404).json({
        erro: 'Usuário não encontrado.',
      });
    }

    throw e;
  }
}