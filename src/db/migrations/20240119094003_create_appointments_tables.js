/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('users', (table) => {
      table.increments('user_id').primary();
      table.string('email').notNullable();
      table.string('date_of_birth').notNullable();
      table.string('password').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('providers', (table) => {
      table.increments('provider_id').primary();
      table.string('name').notNullable();
      table.string('bio').nullable();
      table.string('title').notNullable();
    })
    .createTable('appointments', (table) => {
      table.increments('appointment_id').primary();
      table
        .integer('provider_id')
        .notNullable()
        .references('provider_id')
        .inTable('providers');
      table
        .integer('patient_id')
        .notNullable()
        .references('user_id')
        .inTable('users');
      table.dateTime('start_time').notNullable();
      table.dateTime('end_time').notNullable();
      table.string('reason_for_visit').notNullable();
      table.text('remark').nullable();
      table.unique(['provider_id', 'start_time', 'end_time']); // Prevent double-booking
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('appointments')
    .dropTableIfExists('users')
    .dropTableIfExists('providers');
};
