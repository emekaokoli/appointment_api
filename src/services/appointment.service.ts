import moment from 'moment';
import knex from '../db/knex';
import { appointmentInput } from '../schema/appointment';
import { Booked } from '../schema/response';
import { DomainErrror } from '../utils/error';

export async function AllAppointments() {
  return knex('appointments').select('*');
}

export async function FindOne(
  appointment_id: string
): Promise<appointmentInput[]> {
  return knex('appointments').select('*').where({ appointment_id });
}

export async function checkDoubleBooking(
  provider_id: number,
  start_time: string,
  end_time: string
) {
  // Ensure consistent time zone handling
  const startTime = moment.utc(start_time);
  const endTime = moment.utc(end_time);

  return await knex('appointments')
    .where({ provider_id })
    .whereBetween('start_time', [startTime, endTime])
    .orWhereBetween('end_time', [startTime, endTime])
    .select();
}

export async function create(appointment: appointmentInput): Promise<number[]> {
  try {
    const createdAppointment = await knex('appointments').insert(appointment);
    return createdAppointment;
  } catch (error: any) {
    throw DomainErrror.internalError([error.message]);
  }
}

export async function CheckIfAppointmentExists(
  appointment_id: string
): Promise<boolean> {
  const appointment = await knex('appointments')
    .where({ appointment_id })
    .first();
  return appointment !== undefined;
}

export async function updateAppointments(
  appointmentId: string,
  updatedata: appointmentInput
): Promise<number[]> {
  const updatedData = await knex('appointments')
    .where({ appointment_id: appointmentId })
    .update(updatedata)
    .returning('*');
  return updatedData;
}

export async function bookedSessions(provider_id: number): Promise<Booked[]> {
  return await knex('appointments')
    .join('users', function () {
      this.on('appointments.user_id', '=', 'users.user_id');
    })
    .where({ 'appointments.provider_id': provider_id })
    .select(
      'appointments.appointment_id',
      'users.user_id',
      'users.email',
      'appointments.start_time',
      'appointments.end_time',
      'appointments.reason_for_visit',
      'appointments.remark'
    );
}
