// knex.ts

import knex from 'knex';
import Config from '../../knexfile';
const environment = 'development';
const knexConfig = Config[environment];
const knexInstance = knex(knexConfig);

export default knexInstance;
