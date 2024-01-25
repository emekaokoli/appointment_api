const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      database: 'postgres',
      user: 'postgres',
      password: 'master',
      // ssl: { rejectUnauthorized: false },
    },
    pool: {
      min: 2,
      max: 10,
    },
    // searchPath: ['knex, public'],
    debug: true,
    migrations: {
      directory: './src/db/migrations',
    },
    seeds: {
      directory: './src/db/seeds',
    },
  },

  production: {
    client: 'pg',
    connection: {
      host: process.env.host,
      user: process.env.user,
      password: process.env.password,
      database: process.env.database,
      port: process.env.db_port,
      ssl: { rejectUnauthorized: false },
    },
    // searchPath: ['knex, public'],
    migrations: {
      // tableName: 'knex_migrations',
      directory: './src/db/migrations',
    },
    seeds: {
      directory: './src/db/seeds',
    },
  },
};
