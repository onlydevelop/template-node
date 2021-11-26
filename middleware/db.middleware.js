const { Sequelize } = require('sequelize');
const models = require('../model/models');

const init = ({ name, user, password, host, dialect, test }) => {
  if (test) {
    // TODO: Use Sqlite3 for testing
    // return new Sequelize({
    //   dialect: 'sqlite',
    //   storage: ':memory:',
    // });
    name = 'test';
  }

  return new Sequelize(name, user, password, {
    host,
    dialect,
    logging: false,
  });
};

exports.initilize = async (ctx) => {
  try {
    // Initialize
    const sequelize = init(ctx.env.db);

    // Authenticate
    await sequelize.authenticate();

    // Load models
    return models.load(sequelize);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
