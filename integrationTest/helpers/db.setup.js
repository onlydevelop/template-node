exports.knex = require('knex')({
  client: 'pg',
  connection: {
    host : 'localhost',
    user : 'dipanjan',
    password : '',
    database : 'test'
  }
});
