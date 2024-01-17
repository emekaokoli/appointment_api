import { config } from 'config/default';
import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'master',
  database: 'postgres',
  entities: ['src/entity/*.ts'],
  synchronize: true,
});

export const pgclient = require('knex')({
  client: 'pg',
  connection: {
    connectionString: config.DATABASE_URL,
    searchPath: 'knex,public',

    // host: config['DB_HOST'],
    // port: config['DB_PORT'],
    // user: config['DB_USER'],
    // database: config['DB_NAME'],
    // password: config['DB_PASSWORD'],
    // ssl: config['DB_SSL'] ? { rejectUnauthorized: false } : false,
  },
});