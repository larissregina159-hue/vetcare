import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'VetClinic API',
      version: '1.0.0',
      description: 'API RESTful para gerenciamento de uma clínica veterinária.',
    },
    servers: [
      {
        url: 'http://localhost:3333',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
});
