import { Router } from 'express';

import {
  listar,
  buscar,
  criar,
  atualizar,
  excluir,
} from '../controllers/veterinario.controllers';

const router = Router();

/**
 * @openapi
 * /api/veterinarios:
 *   get:
 *     tags: [Veterinários]
 *     summary: Lista todos os veterinários
 *     responses:
 *       200:
 *         description: Lista de veterinários
 */
router.get('/', listar);

/**
 * @openapi
 * /api/veterinarios/{id}:
 *   get:
 *     tags: [Veterinários]
 *     summary: Busca um veterinário pelo id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Veterinário encontrado
 *       404:
 *         description: Veterinário não encontrado
 */
router.get('/:id', buscar);

/**
 * @openapi
 * /api/veterinarios:
 *   post:
 *     tags: [Veterinários]
 *     summary: Cadastra um novo veterinário
 *     responses:
 *       201:
 *         description: Veterinário criado
 */
router.post('/', criar);

/**
 * @openapi
 * /api/veterinarios/{id}:
 *   put:
 *     tags: [Veterinários]
 *     summary: Atualiza um veterinário
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Veterinário atualizado
 *       404:
 *         description: Veterinário não encontrado
 */
router.put('/:id', atualizar);

/**
 * @openapi
 * /api/veterinarios/{id}:
 *   delete:
 *     tags: [Veterinários]
 *     summary: Exclui um veterinário
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Veterinário excluído
 *       404:
 *         description: Veterinário não encontrado
 */
router.delete('/:id', excluir);

export default router;
