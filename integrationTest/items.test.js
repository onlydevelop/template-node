const app = require('../app');
const request = require('supertest').agent(app.listen());
const { Pool } = require('pg');
const fs = require('fs');
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNvbWVvbmVAc29tZXdoZXJlLmNvbSIsImlhdCI6MTYzODI3Njg4MX0.TKNBFwx9JTVHm8m-m6fs4k7ZH_bA7pWRry9PH_12yvg';

// cleanup
const cleanup = (doneCleanup) => {
  const pool = new Pool({
    user: 'dipanjan',
    host: 'localhost',
    database: 'test',
    password: '',
  });

  const seedQuery = fs.readFileSync(`${__dirname}/seed.sql`, {
    encoding: 'utf-8',
  });

  pool.query(seedQuery, (err, res) => {
    pool.end();
    doneCleanup();
  });
};

// Setup
before((done) => cleanup(done));
// Teardown
after((done) => cleanup(done));

describe('Items', () => {
  const test_item = { name: 'Apple', price: 5 };
  const update_item = { name: 'Banana', price: 1.5 };

  it('POST /items', (done) => {
    request
      .post('/items')
      .set('Authorization', 'Bearer ' + token)
      .send(test_item)
      .expect('location', new RegExp('^http://127.0.0.1:[0-9]{1,5}/items/1$'))
      .expect(201, done);
  });

  it('GET /items/1 - valid gets 200', (done) => {
    request
      .get('/items/1')
      .set('Authorization', 'Bearer ' + token)
      .expect((res) => {
        const { createdAt, updatedAt, ...rest } = res.body;
        res.body = rest;
      })
      .expect(
        200,
        {
          id: 1,
          name: 'Apple',
          price: '5.00',
        },
        done
      );
  });

  it('GET /items/2 - invalid gets 404', (done) => {
    request
      .get('/items/2')
      .set('Authorization', 'Bearer ' + token)
      .expect(404, done);
  });

  it('GET /items - valid gets 200', (done) => {
    request
      .get('/items')
      .set('Authorization', 'Bearer ' + token)
      .expect((res) => {
        res.body = res.body.map(({ createdAt, updatedAt, ...rest }) => rest);
      })
      .expect(
        200,
        [
          {
            id: 1,
            name: 'Apple',
            price: '5.00',
          },
        ],
        done
      );
  });

  it('Update /items/1 - valid gets 200', (done) => {
    request
      .put('/items/1')
      .set('Authorization', 'Bearer ' + token)
      .send(update_item)
      .expect('location', new RegExp('^http://127.0.0.1:[0-9]{1,5}/items/1$'))
      .expect(200, done);
  });

  it('Update /items/2 - gets 404', (done) => {
    request
      .put('/items/2')
      .set('Authorization', 'Bearer ' + token)
      .send(update_item)
      .expect(404, done);
  });

  it('Delete /items/1 - gets 204', (done) => {
    request
      .delete('/items/1')
      .set('Authorization', 'Bearer ' + token)
      .expect(204, done);
  });

  it('Delete /items/1 - gets 404', (done) => {
    request
      .delete('/items/2')
      .set('Authorization', 'Bearer ' + token)
      .expect(404, done);
  });
});
