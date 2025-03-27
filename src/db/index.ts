import { knex } from 'knex';

import config from '../../knexfile';

type ConfigKeys = keyof typeof config;

const allowedEnvs: ConfigKeys[] = ['test', 'development', 'production'];
const nodeEnv = process.env.NODE_ENV;

const environment: ConfigKeys = allowedEnvs.find((env: string) => env === nodeEnv) || 'development';

const database = knex(config[environment]);

export default database;
