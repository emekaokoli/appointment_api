import knex from '../../knexfile';

knex.schema
  .createTable('providers', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('bio').nullable();
    table.string('title').notNullable();
  })
  .createTable('patients', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
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
  })
  .then(() => console.log('Tables created successfully'))
  .catch((error) => console.error('Error creating tables:', error));
