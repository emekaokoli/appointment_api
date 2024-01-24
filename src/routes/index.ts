import { Request, Response, Router } from 'express';
import { router as appointmentRouter } from './appointment.routes';
import { router as authRouter } from './auth.routes';
import { router as providerRouter } from './providers.routes';

const router = Router();
router.get('/healthcheck', (_: Request, res: Response) => {
  res.sendStatus(200);
});
router.use('/providers', providerRouter);
router.use('/appointments', appointmentRouter);
router.use('/auth', authRouter);

export { router };
