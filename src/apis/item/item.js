exports.add = (ctx) => {
  // FIXME: Implement
  const id = 'abcd1234';
  ctx.set('location', `/items/${id}`);
  ctx.status = 201;
};
