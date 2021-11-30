const { DataTypes } = require('sequelize');

exports.define = (sequelize, refs) => {
  const { Items, Users } = refs;

  const Cart = sequelize.define('carts', {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      default: 0,
    },
  });

  Users.belongsToMany(Items, { through: Cart });
  Items.belongsToMany(Users, { through: Cart });

  Users.hasMany(Cart, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  Cart.belongsTo(Users);
  Items.hasMany(Cart, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  Cart.belongsTo(Items);

  return Cart;
};
