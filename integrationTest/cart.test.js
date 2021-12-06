const app = require('../app');
const request = require('supertest').agent(app.listen());
const { token, knex } = require('./helper');

describe('Cart', () => {
  // Setup
  let item1, item2, user1;
  let itemId1, itemId2, userId1;

  beforeEach(async () => {
    await knex('items').delete();
    await knex('users').delete();
    item1 = await knex('items').insert({name: 'Apple', price: 5}).returning(['id']);
    item2 = await knex('items').insert({name: 'Banana', price: 1}).returning(['id']);
    user1 = await knex('users').insert({name: 'David', address: '1 First Street'}).returning(['id']);
    itemId1 = item1[0].id;
    itemId2 = item2[0].id;
    userId1 = user1[0].id;
  });

  // Teardown
  afterEach(async () => {
    await knex('carts').delete();
    await knex('users').delete();
    await knex('items').delete();
  });

  it('POST /carts', (done) => {
    const test_cart_1 = { itemId: itemId1, quantity: 5 };
    const test_cart_2 = { itemId: itemId2, quantity: 2 };

    request
      .post(`/carts/${userId1}`)
      .set('Authorization', 'Bearer ' + token)
      .send(test_cart_1)
      .expect('location', new RegExp(`^http://127.0.0.1:[0-9]{1,5}/carts/${userId1}$`))
      .expect(201, done);
  });

  it('GET /carts/:userId - valid gets 200', (done) => {
    const test_cart_1 = { itemId: itemId1, userId: userId1, quantity: 5 };
    knex(`carts`).insert(test_cart_1)
    .returning(['id'])
    .then((res, err) => {
      if (res) {
        const cartsId = res[0].id;
        request
          .get(`/carts/${userId1}`)
          .set('Authorization', 'Bearer ' + token)
          .expect((res) => {
            const { id, createdAt, updatedAt, ...rest } = res.body;
            res.body = rest;
          })
          .expect(
            200,
            {
              name: 'David',
              address: '1 First Street',
              carts: [
                {
                  id: 2,
                  item: {
                    id: 3,
                    name: "Apple",
                    price: "5.00",
                  },
                  quantity: 5,
                  userId: "2",
                }
              ]
            },
            done
          );
      } else {
        console.log('error = ' + err);
        done();
      }
    });  
  });

it('GET /carts/:userId/:cartsId - valid gets 200', (done) => {
    const test_cart_1 = { itemId: itemId1, userId: userId1, quantity: 5 };
    knex(`carts`).insert(test_cart_1)
    .returning(['id'])
    .then((res, err) => {
      if (res) {
        const cartsId = res[0].id;
        request
          .get(`/carts/${userId1}/${cartsId}`)
          .set('Authorization', 'Bearer ' + token)
          .expect((res) => {
            const { id, createdAt, updatedAt, ...rest } = res.body;
            res.body = rest;
          })
          .expect(
            200,
            {
              name: 'David',
              address: '1 First Street',
              carts: [
                {
                  id: cartsId,
                  item: {
                    id: itemId1,
                    name: "Apple",
                    price: "5.00",
                  },
                  quantity: 5,
                  userId: userId1.toString(),
                }
              ]
            },
            done
          );
      } else {
        console.log('error = ' + err);
        done();
      }
    });  
  });

  it('GET /carts/99 - invalid gets 404', (done) => {
    request.get('/carts/')
    .set('Authorization', 'Bearer ' + token)
    .expect(404, done);
  });

  it('Update /carts/:userId/:cartsId - valid gets 200', (done) => {
    const test_cart_1 = { itemId: itemId1, userId: userId1, quantity: 5 };
    const update_cart_1 = { itemId: itemId1, userId: userId1, quantity: 3 };

    knex(`carts`).insert(test_cart_1)
    .returning(['id'])
    .then((res, err) => {
      if (res) {
        const cartsId = res[0].id;
        request
          .put(`/carts/${userId1}/${cartsId}`)
          .set('Authorization', 'Bearer ' + token)
          .send(update_cart_1)
          .expect('location', new RegExp(`^http://127.0.0.1:[0-9]{1,5}/carts/${userId1}/${cartsId}$`))
          .expect(200, done);
      } else {
        console.log('error = ' + err);
        done();
      }
    });
  });

  it('Update /carts/:userId/99 - gets 404', (done) => {
    const update_cart_1 = { itemId: itemId1, userId: userId1, quantity: 3 };

    request.put(`/carts/${userId1}/99`)
    .set('Authorization', 'Bearer ' + token)
    .send(update_cart_1)
    .expect(404, done);
  });

  it('Update /carts/99/99 - gets 404', (done) => {
    const update_cart_1 = { itemId: itemId1, userId: userId1, quantity: 3 };

    request.put(`/carts/99/99`)
    .set('Authorization', 'Bearer ' + token)
    .send(update_cart_1)
    .expect(404, done);
  });

  it('Delete /carts/:userId/:cartsId - gets 204', (done) => {
    const test_cart_1 = { itemId: itemId1, userId: userId1, quantity: 5 };
    knex(`carts`).insert(test_cart_1)
    .returning(['id'])
    .then((res, err) => {
      if (res) {
        const cartsId = res[0].id;
        request
          .delete(`/carts/${userId1}/${cartsId}`)
          .set('Authorization', 'Bearer ' + token)
          .expect(204, done);
      } else {
        console.log('error = ' + err);
        done();
      }
    });
  });

it('Delete /carts/:userId - gets 204', (done) => {
    const test_cart_1 = { itemId: itemId1, userId: userId1, quantity: 5 };
    knex(`carts`).insert(test_cart_1)
    .returning(['id'])
    .then((res, err) => {
      if (res) {
        const cartsId = res[0].id;
        request
          .delete(`/carts/${userId1}`)
          .set('Authorization', 'Bearer ' + token)
          .expect(204, done);
      } else {
        console.log('error = ' + err);
        done();
      }
    });
  });

  it('Delete /carts/99/99 - gets 404', (done) => {
    request.delete('/carts/99/99')
    .set('Authorization', 'Bearer ' + token)
    .expect(404, done);
  });
});
