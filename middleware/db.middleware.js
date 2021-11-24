const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('dipanjan', 'dipanjan', '', {
  host: 'localhost',
  dialect: 'postgres',
  logging: console.log,
});

exports.Items = sequelize.define('items', {
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

exports.postgres = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
