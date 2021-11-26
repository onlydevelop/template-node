const addItem = async (ctx) => {};

exports.add = async (ctx) => {
  const { name, price } = ctx.request.body;
  try {
    const item = await ctx.db.Items.create({ name, price });
    ctx.set('location', `${ctx.request.href}/${item.id}`);
    ctx.status = 201;
  } catch (error) {
    ctx.status = 500;
  } finally {
  }
};

exports.get = async (ctx) => {
  const item = await ctx.db.Items.findOne({
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

exports.getAll = async (ctx) => {
  const item = await ctx.db.Items.findAll();
  if (item) {
    ctx.body = item;
    ctx.status = 200;
  } else {
    ctx.status = 404;
  }
};

exports.update = async (ctx) => {
  const item = await ctx.db.Items.findOne({
    where: {
      id: ctx.params.id,
    },
  });

  if (item) {
    const { name, price } = ctx.request.body;

    if (name) item.name = name;
    if (price) item.price = price;

    try {
      await item.save();
      ctx.set('location', `${ctx.request.href}`);
      ctx.status = 200;
    } catch (error) {
      ctx.status = 500;
    } finally {
    }
  } else {
    ctx.status = 404;
  }
};

exports.delete = async (ctx) => {
  const item = await ctx.db.Items.findOne({
    where: {
      id: ctx.params.id,
    },
  });

  if (item) {
    try {
      await item.destroy();
      ctx.status = 204;
    } catch (error) {
      ctx.status = 500;
    } finally {
    }
  } else {
    ctx.status = 404;
  }
};
