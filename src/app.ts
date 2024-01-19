import express, { Application, json, urlencoded } from 'express';
import pino from 'pino-http';
import { errorHandler } from './middleware/errorHandler';
import { setUpRoutes } from './module/setupRoutes';

export const createApp = (): Application => {
  const app = express();

  app.use(urlencoded({ extended: true }));
  app.use(json());
  app.use(pino());

  setUpRoutes(app);

  app.use(errorHandler());

  return app;
};
