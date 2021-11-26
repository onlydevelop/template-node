const items = require('../model/Items');
const users = require('../model/Users');

const defineModel = async (model, sequelize) => {
  const Model = model.define(sequelize);
  await Model.sync();
  return Model;
};

exports.load = async (sequelize) => {
  // Add models
  const Items = await defineModel(items, sequelize);
  const Users = await defineModel(users, sequelize);

  // Send the models
  return { Items, Users };
};
