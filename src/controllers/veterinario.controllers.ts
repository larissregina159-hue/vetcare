import { Request, Response } from 'express';
import * as service from '../services/veterinario.services';

const idOf = (req: Request) =>
  Number(req.params.id);

export async function listar(
  _req: Request,
  res: Response
) {
  return res.json(
    await service.listarVeterinarios()
  );
}

export async function buscar(
  req: Request,
  res: Response
) {
  const veterinario =
    await service.buscarVeterinario(
      idOf(req)
    );

  return veterinario
    ? res.json(veterinario)
    : res.status(404).json({
        erro: 'Veterinário não encontrado.',
      });
}

export async function criar(
  req: Request,
  res: Response
) {
  const {
    nome,
    crmv,
    especialidade,
    email,
    telefone,
  } = req.body;

  if (!nome || !crmv || !email) {
    return res.status(400).json({
      erro:
        'nome, crmv e email são obrigatórios.',
    });
  }

  return res.status(201).json(
    await service.criarVeterinario({
      nome,
      crmv,
      especialidade,
      email,
      telefone,
    })
  );
}

export async function atualizar(
  req: Request,
  res: Response
) {
  try {
    return res.json(
      await service.atualizarVeterinario(
        idOf(req),
        req.body
      )
    );
  } catch (e: any) {
    if (e?.code === 'P2025') {
      return res.status(404).json({
        erro:
          'Veterinário não encontrado.',
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
    await service.excluirVeterinario(
      idOf(req)
    );

    return res.status(204).send();
  } catch (e: any) {
    if (e?.code === 'P2025') {
      return res.status(404).json({
        erro:
          'Veterinário não encontrado.',
      });
    }

    throw e;
  }
}