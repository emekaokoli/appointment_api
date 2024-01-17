import cors from 'cors';
import express from 'express';
import pino from 'pino-http';
import 'reflect-metadata';
import swaggerUi from 'swagger-ui-express';
// import { router as LoginRouter } from '../routes/login.routes';
// import { router as MeRouter } from '../routes/me.routes';
// import { router as RegisterRouter } from '../routes/register.routes';
import { spec } from '../schemas/spec';

export default function Server() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(pino());

  app.use('/api/v1/login', LoginRouter);
  app.use('/api/register', RegisterRouter);
  app.use('/api/v1/users/me', MeRouter);
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(spec));

  return app;
}
