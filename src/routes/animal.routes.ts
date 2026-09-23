import { Router } from 'express';

import {
  listar,
  buscar,
  criar,
  atualizar,
  excluir,
} from '../controllers/animal.controllers';

const router = Router();

/**
 * @openapi
 * /api/animais:
 *   get:
 *     tags: [Animais]
 *     summary: Lista todos os animais
 *     responses:
 *       200:
 *         description: Lista de animais
 */
router.get('/', listar);

/**
 * @openapi
 * /api/animais/{id}:
 *   get:
 *     tags: [Animais]
 *     summary: Busca um animal pelo id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Animal encontrado
 *       404:
 *         description: Animal não encontrado
 */
router.get('/:id', buscar);

/**
 * @openapi
 * /api/animais:
 *   post:
 *     tags: [Animais]
 *     summary: Cadastra um novo animal
 *     responses:
 *       201:
 *         description: Animal criado
 */
router.post('/', criar);

/**
 * @openapi
 * /api/animais/{id}:
 *   put:
 *     tags: [Animais]
 *     summary: Atualiza um animal
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Animal atualizado
 *       404:
 *         description: Animal não encontrado
 */
router.put('/:id', atualizar);

/**
 * @openapi
 * /api/animais/{id}:
 *   delete:
 *     tags: [Animais]
 *     summary: Exclui um animal
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Animal excluído
 *       404:
 *         description: Animal não encontrado
 */
router.delete('/:id', excluir);

export default router;
