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
    },
    pool: {
      min: 2,
      max: 10,
    },
    searchPath: ['knex, public'],
    debug: true,
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/db/migrations',
    },
    seeds: {
      directory: './src/db/seeds',
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    searchPath: ['knex, public'],
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/db/migrations',
    },
    seeds: {
      directory: './src/db/seeds',
    },
  },
};
