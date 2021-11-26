const addItem = async (ctx, isPut) => {
  const { name, price } = ctx.request.body;
  try {
    const item = await ctx.db.Items.create({ name, price });
    const id = item.id;

    let href = ctx.request.href;
    if (isPut) {
      const index = ctx.request.href.lastIndexOf('/');
      href = ctx.request.href.slice(0, index);
    }

    ctx.set('location', `${href}/${id}`);
    ctx.status = 201;
  } catch (error) {
    ctx.status = 500;
  } finally {
  }
};

exports.add = async (ctx) => {
  return addItem(ctx);
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
    const index = ctx.request.href.lastIndexOf('/');
    ctx.request.href = ctx.request.href.slice(0, index);
    return addItem(ctx, true);
  }
};
