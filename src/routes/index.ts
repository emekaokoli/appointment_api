import { Router } from 'express';
import { router as appointmentRouter } from './appointment';
import { router as patientRouter } from './patients';

import { router as authRouter } from './auth';

const router = Router();

router.use('/patients', patientRouter);
router.use('/appointment', appointmentRouter);
router.use('/providers', appointmentRouter);
router.use('/', authRouter);

export { router };
