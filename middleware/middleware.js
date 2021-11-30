const envCache = require('./env.middleware');
const { initilize } = require('./db.middleware');
const { handle401, authenticate } = require('./auth.middleware');

exports.env = async (ctx, next) => {
  ctx.env = envCache.env();
  await next();
};

exports.db = async (ctx, next) => {
  ctx.db = await initilize(ctx);
  await next();
};

exports.auth = async (ctx, next) => {
  ctx.auth = { handle401, authenticate };
  await next();
};
