import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

type KnexConfig = {
  development: {
    client: string;
    connection: {
      connectionString: string | undefined;
      searchPath: string[];
      host: string | undefined;
      port: number | undefined;
      database: string | undefined;
      user: string | undefined;
      password: string | undefined;
    };
    pool: {
      min: number;
      max: number;
    };
    migrations: {
      tableName: string;
      directory: string;
    };
    seeds: {
      directory: string;
    };
  };
};

const knexConfig: KnexConfig = {
  development: {
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      searchPath: ['knex, public'],
      host: process.env.DB_HOST,
      port: process.env.PORT ? parseInt(process.env.PORT, 10) : undefined,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_USER,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/db/migrations',
    },
    seeds: {
      directory: './src/db/seeds',
    },
  },
};

export default knexConfig;
