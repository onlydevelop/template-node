const app = require('../app');
const request = require('supertest').agent(app.listen());
const { knex } = require('./helpers/db.setup');

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNvbWVvbmVAc29tZXdoZXJlLmNvbSIsImlhdCI6MTYzODI3Njg4MX0.TKNBFwx9JTVHm8m-m6fs4k7ZH_bA7pWRry9PH_12yvg';

describe('Items', () => {
  const test_item = { name: 'Apple', price: 5 };
  const update_item = { name: 'Banana', price: 1.5 };

  beforeEach(async () => {
    await knex('items').delete();
  });

  after((done) => {
    knex('items').delete();
    done();
  });

  it('POST /items', (done) => {
    request
      .post('/items')
      .set('Authorization', 'Bearer ' + token)
      .send(test_item)
      .expect('location', new RegExp('^http://127.0.0.1:[0-9]{1,5}/items/[0-9]+$'))
      .expect(201, done);
  });

  it('GET /items/:id - valid gets 200', (done) => {
    knex('items').insert({name: 'Mango', price: 2.50})
    .returning(['id'])
    .then((res, err) => {
      if (res) {
        const id = res[0].id;
        request
          .get(`/items/${id}`)
          .set('Authorization', 'Bearer ' + token)
          .expect((res) => {
            const { createdAt, updatedAt, ...rest } = res.body;
            res.body = rest;
          })
          .expect(
            200,
            {
              id: id,
              name: 'Mango',
              price: '2.50',
            },
            done
          );
      } else {
        console.log('error = ' + err);
        done();
      }
    });
  });

  it('GET /items/99 - invalid gets 404', (done) => {
    request
      .get('/items/99')
      .set('Authorization', 'Bearer ' + token)
      .expect(404, done);
  });

  it('GET /items - valid gets 200', (done) => {
    knex('items').insert([{name: 'Apple', price: 5}, {name: 'Mango', price: 2.50}])
    .then((res, err) => {
      if (res) {
        request
          .get('/items')
          .set('Authorization', 'Bearer ' + token)
          .expect((res) => {
            res.body = res.body.map(({ id, createdAt, updatedAt, ...rest }) => rest);
          })
          .expect(
            200,
            [
              {
                name: 'Apple',
                price: '5.00',
              },
              {
                name: 'Mango',
                price: '2.50',
              },
            ],
            done
          );
      } else {
        console.log('error = ' + err);
        done();
      }
    });
  });

  it('Update /items/:id - valid gets 200', (done) => {
    knex('items').insert({name: 'Mango', price: 2.50})
    .returning(['id'])
    .then((res, err) => {
      if (res) {
        const id = res[0].id;

      request
        .put(`/items/${id}`)
        .set('Authorization', 'Bearer ' + token)
        .send(update_item)
        .expect('location', new RegExp(`^http://127.0.0.1:[0-9]{1,5}/items/${id}$`))
        .expect(200, done);
      } else {
        console.log('error = ' + err);
        done();
      }
    });
  });

  it('Update /items/99 - gets 404', (done) => {
    request
      .put('/items/99')
      .set('Authorization', 'Bearer ' + token)
      .send(update_item)
      .expect(404, done);
  });

  it('Delete /items/1 - gets 204', (done) => {
    knex('items').insert({name: 'Mango', price: 2.50})
    .returning(['id'])
    .then((res, err) => {
      if (res) {
        const id = res[0].id;
        request
          .delete(`/items/${id}`)
          .set('Authorization', 'Bearer ' + token)
          .expect(204, done);
      } else {
        console.log('error = ' + err);
        done();
      }
    });
  });

  it('Delete /items/1 - gets 404', (done) => {
    request
      .delete('/items/2')
      .set('Authorization', 'Bearer ' + token)
      .expect(404, done);
  });
});
