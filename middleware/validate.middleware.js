const joi = require('joi');
const validateMiddleware = require('koa-joi-validate-middleware');

const errorCallback = (ctx, error) => {
  ctx.status = 422;
  ctx.body = error.message;
};

const postItemsSchema = {
  body: joi.object({
    name: joi.string().min(1).max(40).required(),
    price: joi.number().positive().precision(2),
  }),
};

const postUsersSchema = {
  body: joi.object({
    name: joi.string().min(1).max(40).required(),
    address: joi.string().required(),
  }),
};

const postCartSchema = {
  params: joi.object({
    userId: joi.number().positive().integer().required(),
  }),
  body: joi.object({
    itemId: joi.number().positive().integer().required(),
    quantity: joi.number().positive().integer().required(),
  }),
};

exports.postItems = validateMiddleware.create(postItemsSchema, errorCallback);
exports.postUsers = validateMiddleware.create(postUsersSchema, errorCallback);
exports.postCart = validateMiddleware.create(postCartSchema, errorCallback);
