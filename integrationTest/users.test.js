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

describe('Users', () => {
  const test_user = { name: 'David', address: '1 First Street' };
  const update_user = { name: 'Joe', address: '2 Second Street' };

  it('POST /users', (done) => {
    request
      .post('/users')
      .set('Authorization', 'Bearer ' + token)
      .send(test_user)
      .expect('location', new RegExp('^http://127.0.0.1:[0-9]{1,5}/users/1$'))
      .expect(201, done);
  });

  it('GET /users/1 - valid gets 200', (done) => {
    request
      .get('/users/1')
      .set('Authorization', 'Bearer ' + token)
      .expect((res) => {
        const { createdAt, updatedAt, ...rest } = res.body;
        res.body = rest;
      })
      .expect(
        200,
        {
          id: 1,
          name: 'David',
          address: '1 First Street',
        },
        done
      );
  });

  it('GET /users/2 - invalid gets 404', (done) => {
    request
      .get('/users/2')
      .set('Authorization', 'Bearer ' + token)
      .expect(404, done);
  });

  it('GET /users - valid gets 200', (done) => {
    request
      .get('/users')
      .set('Authorization', 'Bearer ' + token)
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
            name: 'David',
            address: '1 First Street',
          },
        ],
        done
      );
  });

  it('Update /users/1 - valid gets 200', (done) => {
    request
      .put('/users/1')
      .set('Authorization', 'Bearer ' + token)
      .send(update_user)
      .expect('location', new RegExp('^http://127.0.0.1:[0-9]{1,5}/users/1$'))
      .expect(200, done);
  });

  it('Update /users/2 - gets 404', (done) => {
    request
      .put('/users/2')
      .set('Authorization', 'Bearer ' + token)
      .send(update_user)
      .expect(404, done);
  });

  it('Delete /users/1 - gets 204', (done) => {
    request
      .delete('/users/1')
      .set('Authorization', 'Bearer ' + token)
      .expect(204, done);
  });

  it('Delete /users/1 - gets 404', (done) => {
    request
      .delete('/users/2')
      .set('Authorization', 'Bearer ' + token)
      .expect(404, done);
  });
});
