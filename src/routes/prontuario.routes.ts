import { Router } from 'express';

import {
  listar,
  buscar,
  criar,
  atualizar,
  excluir,
} from '../controllers/prontuario.controllers';

const router = Router();

/**
 * @openapi
 * /api/prontuarios:
 *   get:
 *     tags: [Prontuários]
 *     summary: Lista todos os prontuários
 *     responses:
 *       200:
 *         description: Lista de prontuários
 */
router.get('/', listar);

/**
 * @openapi
 * /api/prontuarios/{id}:
 *   get:
 *     tags: [Prontuários]
 *     summary: Busca um prontuário pelo id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Prontuário encontrado
 *       404:
 *         description: Prontuário não encontrado
 */
router.get('/:id', buscar);

/**
 * @openapi
 * /api/prontuarios:
 *   post:
 *     tags: [Prontuários]
 *     summary: Cria um novo prontuário
 *     responses:
 *       201:
 *         description: Prontuário criado
 */
router.post('/', criar);

/**
 * @openapi
 * /api/prontuarios/{id}:
 *   put:
 *     tags: [Prontuários]
 *     summary: Atualiza um prontuário
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Prontuário atualizado
 *       404:
 *         description: Prontuário não encontrado
 */
router.put('/:id', atualizar);

/**
 * @openapi
 * /api/prontuarios/{id}:
 *   delete:
 *     tags: [Prontuários]
 *     summary: Exclui um prontuário
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Prontuário excluído
 *       404:
 *         description: Prontuário não encontrado
 */
router.delete('/:id', excluir);

export default router;
