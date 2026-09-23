import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/auth.routes';
import clienteRoutes from './routes/cliente.routes';
import animalRoutes from './routes/animal.routes';
import veterinarioRoutes from './routes/veterinario.routes';
import consultaRoutes from './routes/consulta.routes';
import prontuarioRoutes from './routes/prontuario.routes';
import usuarioRoutes from './routes/usuario.routes';

import {
  authMiddleware,
} from './middlewares/auth.middlewares';

import {
  errorMiddleware,
} from './middlewares/error.middlewares';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    mensagem: 'VetCare API funcionando!',
  });
});

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
  });
});

app.use(
  '/api/auth',
  authRoutes
);

app.use(
  '/api/clientes',
  authMiddleware,
  clienteRoutes
);

app.use(
  '/api/animais',
  authMiddleware,
  animalRoutes
);

app.use(
  '/api/veterinarios',
  authMiddleware,
  veterinarioRoutes
);

app.use(
  '/api/consultas',
  authMiddleware,
  consultaRoutes
);

app.use(
  '/api/prontuarios',
  authMiddleware,
  prontuarioRoutes
);

app.use(
  '/api/usuarios',
  authMiddleware,
  usuarioRoutes
);

app.use(errorMiddleware);

const PORT =
  Number(process.env.PORT) || 3333;

app.listen(PORT, () => {
  console.log(
    `VetCare API rodando em http://localhost:${PORT}`
  );
});

export default app;
