const envCache = require('./env.middleware');
const { initilize } = require('./db.middleware');

exports.env = async (ctx, next) => {
  ctx.env = envCache.env();
  await next();
};

exports.db = async (ctx, next) => {
  ctx.db = await initilize();
  await next();
};
