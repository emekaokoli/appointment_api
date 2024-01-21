import { Request, Response, Router } from 'express';
import { deserializeUser } from '../middleware/authenticate';
import requireUser from '../middleware/requireUser';
import { validate } from '../middleware/validate';
import { appointmentId, appointmentSchema } from '../schema/appointment';
import {
  AllAppointments,
  CheckIfAppointmentExists,
  FindOne,
  checkDoubleBooking,
  create,
} from '../services/appointment.service';
import { ResponseBuilder } from '../utils/responseBuilder';

const router = Router();

async function getAllAppointments(req: Request, res: Response) {
  try {
    const appointments = await AllAppointments();

    return ResponseBuilder.success(res, 200, { appointments });
  } catch (error) {
    return ResponseBuilder.failure(res, 500, 'Internal Server Error');
  }
}

const createAppointment = async (req: Request, res: Response) => {
  const {
    provider_id,
    start_time,
    end_time,
    reason_for_visit,
    remark,
    patient_id,
  } = req.body;

  try {
    const existingAppointment = await checkDoubleBooking(
      provider_id,
      start_time,
      end_time
    );

    console.log({ existingAppointment });

    if (existingAppointment) {
      return ResponseBuilder.failure(
        res,
        400,
        'Time slot is already booked, please try another time slot'
      );
    }

    const booked = create({
      patient_id,
      provider_id,
      start_time,
      end_time,
      reason_for_visit,
      remark,
    });

    return ResponseBuilder.success(res, 200, { booked });
  } catch (error: any) {
    return ResponseBuilder.failure(res, 500, error.message);
  }
};

async function FindOneAppointment(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const existingAppointment = await CheckIfAppointmentExists(id);
    if (existingAppointment) {
      return ResponseBuilder.failure(res, 404, 'Appointment not found');
    }

    const appointment = await FindOne(id);
    return ResponseBuilder.success(res, 200, { appointment });
  } catch (error) {
    return ResponseBuilder.failure(res, 500, 'Internal Server Error');
  }
}

router.get('/', deserializeUser, requireUser, getAllAppointments);
router.get(
  '/:id',
  deserializeUser,
  requireUser,
  validate(appointmentId),
  FindOneAppointment
);

router.post(
  '/',
  deserializeUser,
  requireUser,
  validate(appointmentSchema),
  createAppointment
);

export { router };
