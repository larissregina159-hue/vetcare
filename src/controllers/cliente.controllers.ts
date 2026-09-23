
import { Request, Response } from 'express';
import * as service from '../services/cliente.services';

const idOf = (req: Request): number => {
  return Number(req.params.id);
};

export async function listar(
  _req: Request,
  res: Response
): Promise<Response> {
  const clientes = await service.listarClientes();

  return res.json(clientes);
}

export async function buscar(
  req: Request,
  res: Response
): Promise<Response> {
  const id = idOf(req);

  const cliente = await service.buscarCliente(id);

  if (!cliente) {
    return res.status(404).json({
      erro: 'Cliente não encontrado.',
    });
  }

  return res.json(cliente);
}

export async function criar(
  req: Request,
  res: Response
): Promise<Response> {
  const {
    nome,
    cpf,
    email,
    telefone,
  } = req.body;

  if (!nome || !cpf || !email || !telefone) {
    return res.status(400).json({
      erro: 'nome, cpf, email e telefone são obrigatórios.',
    });
  }

  const cliente = await service.criarCliente({
    nome,
    cpf,
    email,
    telefone,
  });

  return res.status(201).json(cliente);
}

export async function atualizar(
  req: Request,
  res: Response
): Promise<Response> {
  const id = idOf(req);

  const {
    nome,
    cpf,
    email,
    telefone,
  } = req.body;

  try {
    const cliente = await service.atualizarCliente(id, {
      nome,
      cpf,
      email,
      telefone,
    });

    return res.json(cliente);
  } catch (e: any) {
    if (e?.code === 'P2025') {
      return res.status(404).json({
        erro: 'Cliente não encontrado.',
      });
    }

    throw e;
  }
}

export async function excluir(
  req: Request,
  res: Response
): Promise<Response> {
  const id = idOf(req);

  try {
    await service.excluirCliente(id);

    return res.status(204).send();
  } catch (e: any) {
    if (e?.code === 'P2025') {
      return res.status(404).json({
        erro: 'Cliente não encontrado.',
      });
    }

    throw e;
  }
}
