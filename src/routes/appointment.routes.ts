import { Request, Response, Router } from 'express';
import { validate } from '../middleware/validate';
import { appointmentSchema } from '../schema/appointment';
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

    ResponseBuilder.success(res, 200, { appointments });
  } catch (error) {
    ResponseBuilder.failure(res, 500, 'Internal Server Error');
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

    ResponseBuilder.success(res, 200, { booked });
  } catch (error: any) {
    console.trace(error.stack);

    ResponseBuilder.failure(res, 500, error.message);
  }
};

async function FindOneAppointment(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const existingAppointment = await CheckIfAppointmentExists(id);
    if (existingAppointment) {
      ResponseBuilder.failure(res, 404, 'Appointment not found');
    }

    const appointment = await FindOne(id);
    ResponseBuilder.success(res, 200, { appointment });
  } catch (error) {
    ResponseBuilder.failure(res, 500, 'Internal Server Error');
  }
}

// eslint-disable-next-line
router.get('/:id', FindOneAppointment);
// eslint-disable-next-line
router.get('/', getAllAppointments);
// eslint-disable-next-line
router.post('/', validate(appointmentSchema), createAppointment);

export { router };
