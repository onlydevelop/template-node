const Koa = require('koa');
const app = new Koa();

app.use((ctx, next) => {
  ctx.body = 'Hello world!';
  next();
});

app.listen(3000, () => {
  console.log('Server listening on port 3000...');
});
