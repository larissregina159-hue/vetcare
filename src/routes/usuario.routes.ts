import { Router } from 'express';

import {
  listar,
  buscar,
  atualizar,
  excluir,
} from '../controllers/usuario.controllers';

const router = Router();

/**
 * @openapi
 * /api/usuarios:
 *   get:
 *     tags: [Usuários]
 *     summary: Lista todos os usuários
 *     responses:
 *       200:
 *         description: Lista de usuários
 */
router.get('/', listar);

/**
 * @openapi
 * /api/usuarios/{id}:
 *   get:
 *     tags: [Usuários]
 *     summary: Busca um usuário pelo id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/:id', buscar);

/**
 * @openapi
 * /api/usuarios/{id}:
 *   put:
 *     tags: [Usuários]
 *     summary: Atualiza um usuário
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Usuário atualizado
 *       404:
 *         description: Usuário não encontrado
 */
router.put('/:id', atualizar);

/**
 * @openapi
 * /api/usuarios/{id}:
 *   delete:
 *     tags: [Usuários]
 *     summary: Exclui um usuário
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Usuário excluído
 *       404:
 *         description: Usuário não encontrado
 */
router.delete('/:id', excluir);

export default router;
