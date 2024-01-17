// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'pg',
    connection: {
      // connectionString: process.env.DATABASE_URl,
      searchPath: ['knex, public'],
      // this is for development
      host: '127.0.0.1',
      port: 5432,
      database: 'postgres',
      user: 'postgres',
      password: 'master',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './src/data',
    },
    seeds: {
      directory: './src/data',
    },
  },
};
