exports.knex = require('knex')({
  client: 'pg',
  connection: {
    host : 'localhost',
    user : 'dipanjan',
    password : '',
    database : 'test'
  }
});

exports.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNvbWVvbmVAc29tZXdoZXJlLmNvbSIsImlhdCI6MTYzODI3Njg4MX0.TKNBFwx9JTVHm8m-m6fs4k7ZH_bA7pWRry9PH_12yvg';