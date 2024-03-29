const Koa = require('koa');
const app = new Koa();
var json = require('koa-json');
var bodyParser = require('koa-bodyparser');
const router = require('./routes');
const middleware = require('./middleware/middleware');
const { showToken } = require('./middleware/auth.middleware');

// middlewares
app
  .use(json())
  .use(middleware.env)
  .use(bodyParser())
  .use(middleware.db)
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, () => {
  console.log('Server listening on port 3000...');
  // showToken(); // For debug purpose
});

module.exports = app;
