const envCache = require('./env.middleware');

exports.env = (ctx, next) => {
  ctx.env = envCache.env;
  next();
};
