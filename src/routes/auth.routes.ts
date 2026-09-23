import { Router } from 'express';

const router = Router();

router.post('/login', (_req, res) => {
  res.json({
    mensagem: 'Login realizado com sucesso',
  });
});

export default router;
