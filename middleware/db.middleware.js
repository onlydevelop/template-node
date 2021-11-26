const { Sequelize } = require('sequelize');
const items = require('../model/Items');
const users = require('../model/Users');

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

    // Item
    const Items = items.define(sequelize);
    await Items.sync();

    // User
    const Users = users.define(sequelize);
    await Users.sync();

    // Authenticate
    await sequelize.authenticate();

    // Send the models
    return { Items, Users };
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
