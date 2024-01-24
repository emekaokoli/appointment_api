import { Request, Response, Router } from 'express';
import { isEmpty } from 'lodash';
import { AuthenticatedRequest } from '../../type';
import { deserializeUser } from '../middleware/authenticate';
import requireUser from '../middleware/requireUser';
import { validate } from '../middleware/validate';
import { appointmentId, appointmentSchema } from '../schema/appointment';
import {
  AllAppointments,
  CheckIfAppointmentExists,
  FindOne,
  bookedSessions,
  checkDoubleBooking,
  create,
  updateAppointments,
} from '../services/appointment.service';
import { DomainErrror } from '../utils/error';
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
    user_id,
  } = req.body;

  try {
    const existingAppointment = await checkDoubleBooking(
      provider_id,
      start_time,
      end_time
    );
    if (existingAppointment.length > 0) {
      return ResponseBuilder.failure(
        res,
        400,
        'Time slot is already booked, please try another time slot'
      );
    }

    await create({
      user_id,
      provider_id,
      start_time,
      end_time,
      reason_for_visit,
      remark,
    });

    return ResponseBuilder.success(res, 201, { message: 'Success' });
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
    return ResponseBuilder.success(res, 200, { results: appointment });
  } catch (error) {
    return ResponseBuilder.failure(res, 500, 'Internal Server Error');
  }
}

async function updatehandler(req: AuthenticatedRequest, res: Response) {
  const { appointmentId } = req.params;

  try {
    const appointment = await updateAppointments(appointmentId, req.body);

    if (isEmpty(appointment) || !appointment) {
      return DomainErrror.notFound(['Appointment not found']);
    }

    return ResponseBuilder.success(res, 200, { results: appointment });
  } catch (error: any) {
    return ResponseBuilder.failure(res, 500, error.message);
  }
}
async function bookingHandler(req: AuthenticatedRequest, res: Response) {
  const { providerId } = req.params;

  try {
    const booked = await bookedSessions(Number(providerId));
    if (booked.length === 0 || isEmpty(booked)) {
      return ResponseBuilder.failure(res, 404, 'Appointment not found');
    }

    return ResponseBuilder.success(res, 200, { results: booked });
  } catch (error: any) {
    return ResponseBuilder.failure(res, 500, error.message);
  }
}

router.get('/', deserializeUser, requireUser, getAllAppointments);
router.post(
  '/',
  deserializeUser,
  requireUser,
  validate(appointmentSchema),
  createAppointment
);
router.get(
  '/:appointmentId',
  deserializeUser,
  requireUser,
  validate(appointmentId),
  FindOneAppointment
);

router.get(
  '/booked/:providerId',
  deserializeUser,
  requireUser,
  // validate(providerId),
  bookingHandler
);

router.put(
  '/:appointmentId',
  deserializeUser,
  requireUser,
  validate(appointmentSchema),
  updatehandler
);

export { router };

