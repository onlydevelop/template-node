const items = require('../model/Items');
const users = require('../model/Users');
const cart = require('../model/Cart');

const defineModel = async (model, sequelize) => {
  const Model = model.define(sequelize);
  await Model.sync();
  return Model;
};

const defineAssociation = async (model, sequelize, refs) => {
  const Association = model.define(sequelize, refs);
  await Association.sync();
  return Association;
};

exports.load = async (sequelize) => {
  // Add models
  const Items = await defineModel(items, sequelize);
  const Users = await defineModel(users, sequelize);

  // Add associations
  const Cart = await defineAssociation(cart, sequelize, { Items, Users });

  // Send the models
  return { Items, Users, Cart };
};
