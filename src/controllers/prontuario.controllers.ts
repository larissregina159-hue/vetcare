import { Request, Response } from 'express';
import * as service from '../services/prontuario.services';

const idOf = (req: Request) =>
  Number(req.params.id);

export async function listar(
  _req: Request,
  res: Response
) {
  return res.json(
    await service.listarProntuarios()
  );
}

export async function buscar(
  req: Request,
  res: Response
) {
  const prontuario =
    await service.buscarProntuario(
      idOf(req)
    );

  return prontuario
    ? res.json(prontuario)
    : res.status(404).json({
        erro:
          'Prontuário não encontrado.',
      });
}

export async function criar(
  req: Request,
  res: Response
) {
  const {
    animalId,
    consultaId,
    diagnostico,
    tratamento,
    medicamentos,
    observacoes,
  } = req.body;

  if (
    !animalId ||
    !consultaId ||
    !diagnostico
  ) {
    return res.status(400).json({
      erro:
        'animalId, consultaId e diagnostico são obrigatórios.',
    });
  }

  return res.status(201).json(
    await service.criarProntuario({
      animalId: Number(animalId),
      consultaId: Number(consultaId),
      diagnostico,
      tratamento,
      medicamentos,
      observacoes,
    })
  );
}

export async function atualizar(
  req: Request,
  res: Response
) {
  try {
    const body = req.body;

    const data: any = {
      ...body,
    };

    if (body.animalId != null) {
      data.animalId =
        Number(body.animalId);
    }

    if (body.consultaId != null) {
      data.consultaId =
        Number(body.consultaId);
    }

    return res.json(
      await service.atualizarProntuario(
        idOf(req),
        data
      )
    );
  } catch (e: any) {
    if (e?.code === 'P2025') {
      return res.status(404).json({
        erro:
          'Prontuário não encontrado.',
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
    await service.excluirProntuario(
      idOf(req)
    );

    return res.status(204).send();
  } catch (e: any) {
    if (e?.code === 'P2025') {
      return res.status(404).json({
        erro:
          'Prontuário não encontrado.',
      });
    }

    throw e;
  }
}
