const Koa = require('koa');
const app = new Koa();
const router = require('./routes');
const middleware = require('./middleware/middleware');

// middlewares
app.use(middleware.env).use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log('Server listening on port 3000...');
});

module.exports = app;
