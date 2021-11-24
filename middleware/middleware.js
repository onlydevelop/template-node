const envCache = require('./env.middleware');
const db = require('./db.middleware');

exports.env = async (ctx, next) => {
  ctx.env = envCache.env();
  await next();
};

exports.db = async (ctx, next) => {
  ctx.db = db;
  await next();
};
