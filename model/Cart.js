const { DataTypes } = require('sequelize');

exports.define = (sequelize, refs) => {
  const { Items, Users } = refs;

  const Cart = sequelize.define('carts', {
    // Model attributes are defined here
    userid: {
      type: DataTypes.INTEGER,
      references: {
        model: Users,
        key: 'id',
      },
    },
    itemid: {
      type: DataTypes.INTEGER,
      references: {
        model: Items,
        key: 'id',
      },
    },
  });

  Users.belongsToMany(Items, { through: Cart });
  Items.belongsToMany(Users, { through: Cart });

  return Cart;
};
