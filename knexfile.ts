import dotenv from 'dotenv';
import type { Knex } from 'knex';


dotenv.config();

interface DbConfig {
  test: Knex.Config;
  development: Knex.Config;
  production: Knex.Config;
}

const config: DbConfig = {
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
      max: 20,
    },
    // searchPath: ['knex, public'],
    // debug: true,
    migrations: {
      directory: './src/db/migrations',
    },
    seeds: {
      directory: './src/db/seeds',
    },
  },
  test: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      database: 'test',
      user: 'postgres',
      password: 'master',
      // ssl: { rejectUnauthorized: false },
    },
    pool: {
      min: 2,
      max: 20,
    },
    // searchPath: ['knex, public'],
    // debug: true,
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
      port: process.env.db_port as number | undefined,
      ssl: { rejectUnauthorized: false },
    },
    pool: {
      min: 2,
      max: 20,
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

export default config;
