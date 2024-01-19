import { Knex } from 'knex';
// import knex from '../../knexfile';

export const up = async (knex: Knex): Promise<void> => {
  return knex.schema
    .createTable('providers', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('bio').nullable();
      table.string('title').notNullable();
    })
    .createTable('patients', (table) => {
      table.increments('id').primary();
      table.string('email').notNullable();
      table.string('date_of_birth').notNullable();
      table.string('password').notNullable();
    })
    .createTable('appointments', (table) => {
      table.increments('id').primary();
      table
        .integer('provider_id')
        .notNullable()
        .references('id')
        .inTable('providers');
      table
        .integer('patient_id')
        .notNullable()
        .references('id')
        .inTable('patients');
      table.dateTime('start_time').notNullable();
      table.dateTime('end_time').notNullable();
      table.unique(['provider_id', 'start_time', 'end_time']); // Prevent double-booking
    });
};

export const down = async (knex: Knex): Promise<void> => {
  return knex.schema
    .dropTableIfExists('appointments')
    .dropTableIfExists('patients')
    .dropTableIfExists('providers');
};
