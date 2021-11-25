const { Items } = require('../../../middleware/db.middleware');

exports.add = async (ctx) => {
  const { name, price } = ctx.request.body;
  const item = await Items.create({ name, price });
  const id = item.id;
  ctx.set('location', `${ctx.request.href}/${id}`);
  ctx.status = 201;
};

exports.get = async (ctx) => {
  const item = await Items.findOne({
    where: {
      id: ctx.params.id,
    },
  });
  if (item) {
    ctx.body = item;
    ctx.status = 200;
  } else {
    ctx.status = 404;
  }
};
