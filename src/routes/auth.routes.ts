import { Router } from 'express';

import {
  login,
  me,
  register,
} from '../controllers/auth.controllers';

import {
  authMiddleware,
} from '../middlewares/auth.middlewares';

const router = Router();

router.post('/register', register);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags: [Autenticação]
 *     summary: Faz login e devolve um token JWT
 *     description: >
 *       Troca e-mail + senha por um token JWT com validade de 1 dia.
 *       Use o token no botão **Authorize** para acessar as rotas protegidas.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: cliente@teste.com
 *               senha:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *       401:
 *         description: E-mail ou senha inválidos
 */
router.post('/login', login);

router.get('/me', authMiddleware, me);

export default router;
