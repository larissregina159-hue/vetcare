
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';

const app = express();

app.use(express.json());

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.get('/api-docs.json', (_req, res) => {
  res.json(swaggerSpec);
});

app.get('/', (_req, res) => {
  res.json({
    mensagem: 'ClÃ­nica VeterinÃ¡ria API estÃ¡ no ar!',
  });
});

export { app };
