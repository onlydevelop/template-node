const app = require('../app');
const request = require('supertest').agent(app.listen());
const { Pool } = require('pg');
const fs = require('fs');

// cleanup
const cleanup = () => {
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
    console.log(err, res);
    pool.end();
  });
  console.log('===============');
};

// Setup
before(cleanup);
// Teardown
after(cleanup);

describe('Items', () => {
  const test_item = { name: 'Apple', price: 5 };
  const update_item = { name: 'Banana', price: 1.5 };

  it('POST /items', (done) => {
    request
      .post('/items')
      .send(test_item)
      .expect('location', new RegExp('^http://127.0.0.1:[0-9]{1,5}/items/1$'))
      .expect(201, done);
  });

  it('GET /items/:id - valid gets 200', (done) => {
    request
      .get('/items/1')
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

  it('GET /items/:id - invalid gets 404', (done) => {
    request.get('/items/0').expect(404, done);
  });

  it('GET /items - valid gets 200', (done) => {
    request
      .get('/items')
      .expect((res) => {
        res.body.length = res.body.length;
      })
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
      .send(update_item)
      .expect('location', new RegExp('^http://127.0.0.1:[0-9]{1,5}/items/1$'))
      .expect(200, done);
  });

  it('Update /items/2 - new gets 201', (done) => {
    request
      .put('/items/9')
      .send(update_item)
      .expect(
        'location',
        new RegExp('^http://127.0.0.1:[0-9]{1,5}/items/[0-9]+$')
      )
      .expect(201, done);
  });
});
