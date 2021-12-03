exports.add = async (ctx) => {
  const { name, address } = ctx.request.body;
  try {
    const user = await ctx.db.Users.create({ name, address });
    ctx.set('location', `${ctx.request.href}/${user.id}`);
    ctx.status = 201;
  } catch (error) {
    ctx.status = 500;
  } finally {
    ctx.db.sequelize.close();
  }
};

exports.get = async (ctx) => {
  const user = await ctx.db.Users.findOne({
    where: {
      id: ctx.params.id,
    },
  });
  if (user) {
    ctx.body = user;
    ctx.status = 200;
  } else {
    ctx.status = 404;
  }
};

exports.getAll = async (ctx) => {
  const user = await ctx.db.Users.findAll();
  if (user) {
    ctx.body = user;
    ctx.status = 200;
  } else {
    ctx.status = 404;
  }
};

exports.update = async (ctx) => {
  const user = await ctx.db.Users.findOne({
    where: {
      id: ctx.params.id,
    },
  });

  if (user) {
    const { name, address } = ctx.request.body;

    if (name) user.name = name;
    if (address) user.address = address;

    try {
      await user.save();
      ctx.set('location', `${ctx.request.href}`);
      ctx.status = 200;
    } catch (error) {
      ctx.status = 500;
    } finally {
      ctx.db.sequelize.close();
    }
  } else {
    ctx.status = 404;
  }
};

exports.delete = async (ctx) => {
  const user = await ctx.db.Users.findOne({
    where: {
      id: ctx.params.id,
    },
  });

  if (user) {
    try {
      await user.destroy();
      ctx.status = 204;
    } catch (error) {
      ctx.status = 500;
    } finally {
      ctx.db.sequelize.close();
    }
  } else {
    ctx.status = 404;
  }
};
