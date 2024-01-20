import { Router } from 'express';
import { router as appointmentRouter } from './appointment';
import { router as patientRouter } from './patients.routes';
import { router as providerRouter } from './providers.routes';

import { router as authRouter } from './auth';

const router = Router();

router.use('/patients', patientRouter);
router.use('/providers', providerRouter);
router.use('/appointments', appointmentRouter);
router.use('/login', authRouter);
router.use('/register', authRouter);

export { router };

