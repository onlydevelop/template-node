const { Sequelize, Model, DataTypes } = require('sequelize');

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

const defineItems = (sequelize) => {
  return sequelize.define('items', {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.TIME,
    },
    updatedAt: {
      type: DataTypes.TIME,
    },
  });
};

const defineUsers = (sequelize) => {
  return sequelize.define('users', {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.TIME,
    },
    updatedAt: {
      type: DataTypes.TIME,
    },
  });
};

exports.initilize = async (ctx) => {
  try {
    const sequelize = init(ctx.env.db);
    const Items = defineItems(sequelize);
    const Users = defineUsers(sequelize);
    await Items.sync();
    await Users.sync();

    await sequelize.authenticate();
    return { Items, Users };
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
