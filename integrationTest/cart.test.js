const app = require('../app');
const request = require('supertest').agent(app.listen());
const { populate } = require('./test_helpers/db.setup');

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNvbWVvbmVAc29tZXdoZXJlLmNvbSIsImlhdCI6MTYzODI3Njg4MX0.TKNBFwx9JTVHm8m-m6fs4k7ZH_bA7pWRry9PH_12yvg';

// Setup
before(async () => {
  await populate();
});

// Teardown
after(async () => {
  await populate();
});

describe('Cart', () => {
  const test_cart_1 = { itemId: 1, quantity: 5 };
  const test_cart_2 = { itemId: 2, quantity: 2 };

  it('POST /carts', (done) => {
    request
      .post('/carts/1')
      .set('Authorization', 'Bearer ' + token)
      .send(test_cart_1)
      .expect('location', new RegExp('^http://127.0.0.1:[0-9]{1,5}/carts/1$'))
      .expect(201, done);
  });

  // it('GET /users/1 - valid gets 200', (done) => {
  //   request
  //     .get('/users/1')
  //     .expect((res) => {
  //       const { createdAt, updatedAt, ...rest } = res.body;
  //       res.body = rest;
  //     })
  //     .expect(
  //       200,
  //       {
  //         id: 1,
  //         name: 'David',
  //         address: '1 First Street',
  //       },
  //       done
  //     );
  // });

  // it('GET /users/2 - invalid gets 404', (done) => {
  //   request.get('/users/2').expect(404, done);
  // });

  // it('GET /users - valid gets 200', (done) => {
  //   request
  //     .get('/users')
  //     .expect((res) => {
  //       res.body.length = res.body.length;
  //     })
  //     .expect((res) => {
  //       res.body = res.body.map(({ createdAt, updatedAt, ...rest }) => rest);
  //     })
  //     .expect(
  //       200,
  //       [
  //         {
  //           id: 1,
  //           name: 'David',
  //           address: '1 First Street',
  //         },
  //       ],
  //       done
  //     );
  // });

  // it('Update /users/1 - valid gets 200', (done) => {
  //   request
  //     .put('/users/1')
  //     .send(update_user)
  //     .expect('location', new RegExp('^http://127.0.0.1:[0-9]{1,5}/users/1$'))
  //     .expect(200, done);
  // });

  // it('Update /users/2 - gets 404', (done) => {
  //   request.put('/users/2').send(update_user).expect(404, done);
  // });

  // it('Delete /users/1 - gets 204', (done) => {
  //   request.delete('/users/1').expect(204, done);
  // });

  // it('Delete /users/1 - gets 404', (done) => {
  //   request.delete('/users/2').expect(404, done);
  // });
});
