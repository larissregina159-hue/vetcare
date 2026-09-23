import { Request, Response } from 'express';
import * as service from '../services/animail.services';

const idOf = (req: Request) =>
  Number(req.params.id);

const parseDate = (value: any) =>
  value ? new Date(value) : null;

export async function listar(
  _req: Request,
  res: Response
) {
  return res.json(
    await service.listarAnimais()
  );
}

export async function buscar(
  req: Request,
  res: Response
) {
  const animal = await service.buscarAnimal(
    idOf(req)
  );

  return animal
    ? res.json(animal)
    : res.status(404).json({
        erro: 'Animal não encontrado.',
      });
}

export async function criar(
  req: Request,
  res: Response
) {
  const {
    clienteId,
    nome,
    especie,
    raca,
    sexo,
    dataNascimento,
    peso,
    cor,
    observacoes,
  } = req.body;

  if (
    !clienteId ||
    !nome ||
    !especie ||
    !sexo
  ) {
    return res.status(400).json({
      erro:
        'clienteId, nome, especie e sexo são obrigatórios.',
    });
  }

  return res.status(201).json(
    await service.criarAnimal({
      clienteId: Number(clienteId),
      nome,
      especie,
      raca,
      sexo,
      dataNascimento:
        parseDate(dataNascimento),
      peso:
        peso == null ? null : Number(peso),
      cor,
      observacoes,
    })
  );
}

export async function atualizar(
  req: Request,
  res: Response
) {
  try {
    return res.json(
      await service.atualizarAnimal(
        idOf(req),
        req.body
      )
    );
  } catch (e: any) {
    if (e?.code === 'P2025') {
      return res.status(404).json({
        erro: 'Animal não encontrado.',
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
    await service.excluirAnimal(idOf(req));

    return res.status(204).send();
  } catch (e: any) {
    if (e?.code === 'P2025') {
      return res.status(404).json({
        erro: 'Animal não encontrado.',
      });
    }

    throw e;
  }
}