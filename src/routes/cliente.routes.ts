import { Router } from 'express';

import {
  listar,
  buscar,
  criar,
  atualizar,
  excluir,
} from '../controllers/cliente.controllers';

const router = Router();

/**
 * @openapi
 * /api/clientes:
 *   post:
 *     tags: [Clientes]
 *     summary: Cadastra um novo cliente (rota pública)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - cpf
 *               - email
 *               - telefone
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Marina Souza"
 *               cpf:
 *                 type: string
 *                 example: "98765432100"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "marina@teste.com"
 *               telefone:
 *                 type: string
 *                 example: "11988887777"
 *     responses:
 *       201:
 *         description: Cliente criado
 *       400:
 *         description: Dados obrigatórios não informados
 */
router.post('/', criar);

/**
 * @openapi
 * /api/clientes/{id}:
 *   get:
 *     tags: [Clientes]
 *     summary: Busca um cliente pelo id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *       401:
 *         description: Token ausente, inválido ou expirado
 *       404:
 *         description: Cliente não encontrado
 */
router.get('/:id', buscar);

router.get('/', listar);

router.put('/:id', atualizar);

router.delete('/:id', excluir);

export default router;


