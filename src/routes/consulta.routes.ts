import { Router } from 'express';

import {
  listar,
  buscar,
  criar,
  atualizar,
  excluir,
} from '../controllers/consulta.controllers';

const router = Router();

/**
 * @openapi
 * /api/consultas:
 *   get:
 *     tags: [Consultas]
 *     summary: Lista todas as consultas
 *     responses:
 *       200:
 *         description: Lista de consultas
 */
router.get('/', listar);

/**
 * @openapi
 * /api/consultas/{id}:
 *   get:
 *     tags: [Consultas]
 *     summary: Busca uma consulta pelo id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Consulta encontrada
 *       404:
 *         description: Consulta não encontrada
 */
router.get('/:id', buscar);

/**
 * @openapi
 * /api/consultas:
 *   post:
 *     tags: [Consultas]
 *     summary: Cria uma nova consulta
 *     responses:
 *       201:
 *         description: Consulta criada
 */
router.post('/', criar);

/**
 * @openapi
 * /api/consultas/{id}:
 *   put:
 *     tags: [Consultas]
 *     summary: Atualiza uma consulta
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Consulta atualizada
 *       404:
 *         description: Consulta não encontrada
 */
router.put('/:id', atualizar);

/**
 * @openapi
 * /api/consultas/{id}:
 *   delete:
 *     tags: [Consultas]
 *     summary: Exclui uma consulta
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Consulta excluída
 *       404:
 *         description: Consulta não encontrada
 */
router.delete('/:id', excluir);

export default router;
