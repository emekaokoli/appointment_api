const environment = process.env.NODE_ENV || 'production';
const config = require('../../knexfile.js')['production'];
console.log(config);
module.exports = require('knex')(config);