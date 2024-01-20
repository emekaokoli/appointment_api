import knex from 'knex';
import config from '../../knexfile.js';

const environment = 'development';
const knexConfig = config[environment];
const knexInstance = knex(knexConfig);

export default knexInstance;
