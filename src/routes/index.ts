import { Router } from 'express';
import { router as appointmentRouter } from './appointment.routes';
import { router as authRouter } from './auth.routes';
import { router as providerRouter } from './providers.routes';

const router = Router();

// router.use('/patients', patientRouter);
router.use('/providers', providerRouter);
router.use('/appointments', appointmentRouter);
router.use('/auth', authRouter);

export { router };

