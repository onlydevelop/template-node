const proc = require('process').env;

exports.env = () => {
  return {
    db: {
      name: proc['DB_NAME'] || 'name',
      user: proc['DB_USER'] || 'user',
      password: proc['DB_PASSWORD'] || '',
      host: proc['DB_HOST'] || 'localhost',
      dialect: proc['DB_DIALECT'] || 'postgres',
      test: proc['DB_TEST'] || false,
    },
    auth: {
      secret: proc['AUTH_SECRET'] || 'super-secret',
    },
  };
};
