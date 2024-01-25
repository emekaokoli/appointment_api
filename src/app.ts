import 'dotenv/config';
import express, { Application, json, urlencoded } from 'express';
import pino from 'pino-http';
import swaggerUi from 'swagger-ui-express';
import { errorHandler } from './middleware/errorHandler';
import { openAPIValidatorErrorMiddleware } from './middleware/openApiValidatorError';
import { setUpRoutes } from './module/setupRoutes';
import { spec } from './schema/spec';

export const createApp = (): Application => {
  const app = express();
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(pino());
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(spec));

  app.use(openAPIValidatorErrorMiddleware());
  app.use(errorHandler());
  setUpRoutes(app);

  return app;
};
