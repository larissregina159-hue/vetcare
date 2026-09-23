import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';

dotenv.config();

const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    mensagem: 'VetCare API funcionando!',
  });
});

app.use('/api/auth', authRoutes);

const PORT = Number(process.env.PORT) || 3333;

app.listen(PORT, () => {
  console.log(`VetCare API rodando em http://localhost:${PORT}`);
});
