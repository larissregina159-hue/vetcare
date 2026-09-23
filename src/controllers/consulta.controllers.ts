import { Request, Response } from 'express';
import * as service from '../services/consulta.services';

const idOf = (req: Request) =>
  Number(req.params.id);

const parseDate = (value: any) =>
  new Date(value);

export async function listar(
  _req: Request,
  res: Response
) {
  return res.json(
    await service.listarConsultas()
  );
}

export async function buscar(
  req: Request,
  res: Response
) {
  const consulta =
    await service.buscarConsulta(
      idOf(req)
    );

  return consulta
    ? res.json(consulta)
    : res.status(404).json({
        erro: 'Consulta não encontrada.',
      });
}

export async function criar(
  req: Request,
  res: Response
) {
  const {
    animalId,
    veterinarioId,
    dataConsulta,
    motivo,
    observacoes,
    valor,
    status,
  } = req.body;

  if (
    !animalId ||
    !veterinarioId ||
    !dataConsulta ||
    !motivo ||
    valor == null
  ) {
    return res.status(400).json({
      erro:
        'animalId, veterinarioId, dataConsulta, motivo e valor são obrigatórios.',
    });
  }

  return res.status(201).json(
    await service.criarConsulta({
      animalId: Number(animalId),
      veterinarioId: Number(veterinarioId),
      dataConsulta:
        parseDate(dataConsulta),
      motivo,
      observacoes,
      valor: Number(valor),
      status: status || 'Agendada',
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

    if (body.veterinarioId != null) {
      data.veterinarioId =
        Number(body.veterinarioId);
    }

    if (body.dataConsulta) {
      data.dataConsulta =
        parseDate(body.dataConsulta);
    }

    if (body.valor != null) {
      data.valor =
        Number(body.valor);
    }

    return res.json(
      await service.atualizarConsulta(
        idOf(req),
        data
      )
    );
  } catch (e: any) {
    if (e?.code === 'P2025') {
      return res.status(404).json({
        erro: 'Consulta não encontrada.',
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
    await service.excluirConsulta(
      idOf(req)
    );

    return res.status(204).send();
  } catch (e: any) {
    if (e?.code === 'P2025') {
      return res.status(404).json({
        erro: 'Consulta não encontrada.',
      });
    }

    throw e;
  }
}