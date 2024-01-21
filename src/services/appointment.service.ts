import knex from '../db/knex';
import { appointmentInput } from '../schema/appointment';

export async function AllAppointments() {
  return knex('providers').select('*');
}

export async function FindOne(
  appointment_id: string
): Promise<appointmentInput[]> {
  return knex('providers').select('*').where({ appointment_id });
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
  start_time: Date | string,
  end_time: Date | string,
  provider_id: string
) {
  console.log({ start_time, end_time, provider_id });

  return await knex('appointments')
    .where({ provider_id })
    .whereBetween('start_time', [start_time, end_time])
    .orWhereBetween('end_time', [start_time, end_time])
    .limit(1);
}

export async function create(
  appointment: appointmentInput
): Promise<appointmentInput> {
  return knex('providers').insert(appointment);
}

export async function CheckIfAppointmentExists(
  appointment_id: string
): Promise<boolean> {
  const appointment = await knex('appointments')
    .where({ appointment_id })
    .first();
  return appointment !== undefined;
}
