const { DataTypes } = require('sequelize');

exports.define = (sequelize, refs) => {
  const { Items, Users } = refs;

  const Cart = sequelize.define('carts', {
    // Model attributes are defined here
    quantity: {
      type: DataTypes.INTEGER,
      default: 0,
    },
  });

  Users.belongsToMany(Items, { through: Cart });
  Items.belongsToMany(Users, { through: Cart });

  return Cart;
};
