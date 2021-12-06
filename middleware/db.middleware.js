const { Sequelize } = require('sequelize');
const models = require('../src/model/models');

const init = ({ name, user, password, host, dialect, test }) => {
  if (test) {
    // TODO: Use Sqlite3 for testing
    // return new Sequelize({
    //   dialect: 'sqlite',
    //   storage: ':memory:',
    // });
    name = 'test';
    user = 'dipanjan';
  }

  const seq = new Sequelize(name, user, password, {
    host,
    dialect,
    logging: false,
  });

  return seq;
};

exports.initilize = async (ctx) => {
  try {
    // Initialize
    const sequelize = init(ctx.env.db);

    // Authenticate
    await sequelize.authenticate();

    // Load models
    const db = await models.load(sequelize);
    db.sequelize = sequelize;

    return db;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
