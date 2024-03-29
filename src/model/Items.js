const { DataTypes } = require('sequelize');

exports.define = (sequelize) => {
  return sequelize.define('items', {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(11, 2),
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
