const { Sequelize, Model, DataTypes } = require('sequelize');

const init = ({ name, user, password, host, dialect }) => {
  return new Sequelize(name, user, password, {
    host,
    dialect,
    logging: console.log,
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

exports.initilize = async (ctx) => {
  try {
    const sequelize = init(ctx.env.db);
    const Items = defineItems(sequelize);
    await sequelize.authenticate();
    return { Items };
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
