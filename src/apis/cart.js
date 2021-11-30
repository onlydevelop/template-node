const { Op } = require('sequelize');

exports.add = async (ctx) => {
  const userId = ctx.params.userId;
  const { itemId, quantity } = ctx.request.body;

  try {
    const user = await ctx.db.Users.findByPk(userId);
    const item = await ctx.db.Items.findByPk(itemId);

    if (!user || !item) {
      ctx.status = 404;
      return;
    }
    await ctx.db.Cart.create({
      userId: user.id,
      itemId: item.id,
      quantity,
    });

    ctx.set('location', `${ctx.request.href}`);
    ctx.status = 201;
  } catch (error) {
    ctx.status = 500;
  } finally {
  }
};

exports.getAll = async (ctx) => {
  const query = {
    where: { id: ctx.params.userId },
    attributes: ['id', 'name', 'address'],
    include: {
      model: ctx.db.Cart,
      attributes: ['id', 'userId', 'quantity'],
      include: {
        model: ctx.db.Items,
        attributes: ['id', 'name', 'price'],
      },
    },
  };

  // Order
  query.include.order = ctx.request.query.desc ? [['id', 'DESC']] : '';
  // Pagination
  query.include.offset = ctx.request.query.offset || 0;
  query.include.limit = ctx.request.query.limit || 3;
  // Between condition
  // query.include.where = {
  //   id: {
  //     [Op.between]: [10, 17],
  //   },
  // };

  const items = await ctx.db.Users.findOne(query);

  if (items) {
    ctx.body = items;
    ctx.status = 200;
  } else {
    ctx.status = 404;
  }
};

exports.get = async (ctx) => {
  const userId = ctx.params.userId;
  const cartId = ctx.params.cartId;
  try {
    const user = await ctx.db.Users.findByPk(userId);
    const cart = await ctx.db.Cart.findByPk(cartId);

    if (!user || !cart) {
      ctx.status = 404;
      return;
    }

    const query = {
      where: { id: userId },
      attributes: ['id', 'name', 'address'],
      include: {
        model: ctx.db.Cart,
        where: { id: cartId },
        attributes: ['id', 'userId', 'quantity'],
        include: {
          model: ctx.db.Items,
          attributes: ['id', 'name', 'price'],
        },
      },
    };

    const item = await ctx.db.Users.findOne(query);

    if (item) {
      ctx.body = item;
      ctx.status = 200;
    } else {
      ctx.status = 404;
    }
  } catch (error) {
    ctx.status = 500;
  } finally {
  }
};

exports.update = async (ctx) => {
  const userId = ctx.params.userId;
  const cartId = ctx.params.cartId;
  const { itemId, quantity } = ctx.request.body;

  try {
    const user = await ctx.db.Users.findByPk(userId);
    const item = await ctx.db.Items.findByPk(itemId);
    const cart = await ctx.db.Cart.findByPk(cartId);

    if (!user || !item || !cart) {
      ctx.status = 404;
      return;
    }

    cart.quantity = quantity;
    await cart.save();

    ctx.set('location', `${ctx.request.href}`);
    ctx.status = 200;
  } catch (error) {
    ctx.status = 500;
  } finally {
  }
};

exports.delete = async (ctx) => {
  const userId = ctx.params.userId;
  const cartId = ctx.params.cartId;

  try {
    const user = await ctx.db.Users.findByPk(userId);
    const cart = await ctx.db.Cart.findByPk(cartId);

    if (!user || !cart) {
      ctx.status = 404;
      return;
    }

    await cart.destroy();
    ctx.status = 204;
  } catch (error) {
    ctx.status = 500;
  } finally {
  }
};

exports.deleteAll = async (ctx) => {
  const userId = ctx.params.userId;
  try {
    const user = await ctx.db.Users.findByPk(userId);
    if (!user) {
      ctx.status = 404;
      return;
    }

    await cart.destroy({
      where: {
        userId,
      },
    });
    ctx.status = 204;
  } catch (error) {
    ctx.status = 500;
  } finally {
  }
};
