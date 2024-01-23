import moment from 'moment';
import knex from '../db/knex';
import { appointmentInput } from '../schema/appointment';
import { Booked } from '../schema/response';

export async function AllAppointments() {
  return knex('appointments').select('*');
}

export async function FindOne(
  appointment_id: string
): Promise<appointmentInput[]> {
  return knex('appointments').select('*').where({ appointment_id });
}

// export async function checkDoubleBooking(
//   start_time: string,
//   end_time: string,
//   provider_id: string
// ): Promise<boolean> {
//   return await knex('appointments')
//     .where({ provider_id })
//     .whereBetween('start_time', [start_time, end_time]) // Check overlap
//     .orWhereBetween('end_time', [start_time, end_time]) // Check overlap
//     .first();
// .where({
//   provider_id,
// })
// .andWhere(knex.raw(`"start_time" <= ?::timestamptz`, [end_time]))
// .andWhere(knex.raw(`"end_time" >= ?::timestamptz`, [start_time]))
// .first();
// .andWhere(knex.raw(`"start_time" <= ?`, [end_time]))
// .andWhere(knex.raw(`"end_time" >= ?`, [start_time]))
// .first();
// .andWhere(knex.raw(`"start_time" <= ?::timestamp`, [end_time]))
// .andWhere(knex.raw(`"end_time" >= ?::timestamp`, [start_time]))
// .first();
// .where({
//   provider_id,
//   // start_time: knex.raw(`<= ?`, [end_time]),
//   // end_time: knex.raw(`>= ?`, [start_time]),

//   // start_time: knex.raw(`<= '${end_time}'`), // raw query for <= comparison
//   // end_time: knex.raw(`>= '${start_time}'`), // raw query for <= comparison

//   // start_time: knex.raw(`<= '${end_time}'`), // Corrected query
//   // end_time: knex.raw(`>= '${start_time}'`), // Corrected query

// })
// .first();
// }

export async function checkDoubleBooking(
  provider_id: string,
  start_time: string,
  end_time: string
) {
  console.log({ start_time, end_time });

  // Ensure consistent time zone handling
  const startTime = moment.utc(start_time);
  const endTime = moment.utc(end_time);
  console.log('{ startTime, endTime }');
  console.log({ startTime, endTime });

  return await knex('appointments')
    .where({ provider_id })
    .whereBetween('start_time', [startTime, endTime])
    .orWhereBetween('end_time', [startTime, endTime])
    .select();
}

export async function create(
  appointment: appointmentInput
): Promise<appointmentInput> {
  return knex('appointments').insert(appointment);
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
      'appointments.start_time',
      'appointments.end_time',
      'appointments.reason_for_visit'
    );
}
