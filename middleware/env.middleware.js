const proc = require('process').env;

exports.env = () => {
  return {
    db: {
      user: proc['DB_USER'] || 'user',
      password: proc['DB_PASSWORD'] || 'password',
    },
  };
};
