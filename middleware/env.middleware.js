const proc = require('process').env;

exports.env = () => {
  return {
    db: {
      name: proc['DB_NAME'] || 'name',
      user: proc['DB_USER'] || 'user',
      password: proc['DB_PASSWORD'] || 'password',
      host: proc['DB_HOST'] || 'localhost',
      dialect: proc['DB_DIALECT'] || 'postgres',
      test: proc['DB_TEST'] || false,
    },
  };
};
