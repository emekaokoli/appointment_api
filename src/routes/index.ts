import { Router } from 'express';
import { router as appointmentRouter } from './appointment';
<<<<<<< HEAD
import { router as patientRouter } from './patients.routes';
import { router as providerRouter } from './providers.routes';
=======
import { router as patientRouter } from './patients';
import { router as providerRouter } from './providers';
>>>>>>> 97a5c09d2715e17801cfff1381195b9c70d3b3e3

import { router as authRouter } from './auth';

const router = Router();

router.use('/patients', patientRouter);
router.use('/providers', providerRouter);
router.use('/appointments', appointmentRouter);
router.use('/login', authRouter);
router.use('/register', authRouter);

export { router };

