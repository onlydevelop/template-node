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

exports.get = async (ctx) => {
  const userId = ctx.params.userId;

  const items = await ctx.db.Users.findOne({
    where: { id: userId },
    attributes: ['id', 'name', 'address'],
    include: {
      model: ctx.db.Cart,
      attributes: ['id', 'quantity'],
      include: {
        model: ctx.db.Items,
        attributes: ['id', 'name', 'price'],
      },
    },
  });

  if (items) {
    ctx.body = items;
    ctx.status = 200;
  } else {
    ctx.status = 404;
  }
};

// exports.getAll = async (ctx) => {
//   const item = await ctx.db.Items.findAll();
//   if (item) {
//     ctx.body = item;
//     ctx.status = 200;
//   } else {
//     ctx.status = 404;
//   }
// };

// exports.update = async (ctx) => {
//   const item = await ctx.db.Items.findOne({
//     where: {
//       id: ctx.params.id,
//     },
//   });

//   if (item) {
//     const { name, price } = ctx.request.body;

//     if (name) item.name = name;
//     if (price) item.price = price;

//     try {
//       await item.save();
//       ctx.set('location', `${ctx.request.href}`);
//       ctx.status = 200;
//     } catch (error) {
//       ctx.status = 500;
//     } finally {
//     }
//   } else {
//     ctx.status = 404;
//   }
// };

// exports.delete = async (ctx) => {
//   const item = await ctx.db.Items.findOne({
//     where: {
//       id: ctx.params.id,
//     },
//   });

//   if (item) {
//     try {
//       await item.destroy();
//       ctx.status = 204;
//     } catch (error) {
//       ctx.status = 500;
//     } finally {
//     }
//   } else {
//     ctx.status = 404;
//   }
// };
