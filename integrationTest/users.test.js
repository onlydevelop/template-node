const app = require('../app');
const request = require('supertest').agent(app.listen());
const { knex } = require('./helpers/db.setup');

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNvbWVvbmVAc29tZXdoZXJlLmNvbSIsImlhdCI6MTYzODI3Njg4MX0.TKNBFwx9JTVHm8m-m6fs4k7ZH_bA7pWRry9PH_12yvg';


describe('Users', () => {
  const test_user = { name: 'David', address: '1 First Street' };
  const update_user = { name: 'Joe', address: '2 Second Street' };

  beforeEach(async () => {
    await knex('users').delete();
  });

  after((done) => {
    knex('users').delete();
    done();
  });

  it('POST /users', (done) => {
    request
      .post('/users')
      .set('Authorization', 'Bearer ' + token)
      .send(test_user)
      .expect('location', new RegExp('^http://127.0.0.1:[0-9]{1,5}/users/[0-9]+$'))
      .expect(201, done);
  });

  it('GET /users/:id - valid gets 200', (done) => {
    knex('users').insert({name: 'David', address: '1 First Street'})
    .returning(['id'])
    .then((res, err) => {
      if (res) {
        const id = res[0].id;
        request
          .get(`/users/${id}`)
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
            },
            done
          );
      } else {
        console.log('error = ' + err);
        done();
      }
    });
  });

  it('GET /users/99 - invalid gets 404', (done) => {
    request
      .get('/users/99')
      .set('Authorization', 'Bearer ' + token)
      .expect(404, done);
  });

  it('GET /users - valid gets 200', (done) => {
    knex('users').insert([{name: 'David', address: '1 First Street'}, {name: 'Romil', address: '2 Second Street'}])
    .then((res, err) => {
      if (res) {
        request
          .get('/users')
          .set('Authorization', 'Bearer ' + token)
          .expect((res) => {
            res.body.length = res.body.length;
          })
          .expect((res) => {
            res.body = res.body.map(({ id, createdAt, updatedAt, ...rest }) => rest);
          })
          .expect(
            200,
            [
              {
                name: 'David',
                address: '1 First Street',
              },
              {
                name: 'Romil',
                address: '2 Second Street',
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

  it('Update /users/:id - valid gets 200', (done) => {
    knex('users').insert({name: 'David', address: '1 First Street'})
    .returning(['id'])
    .then((res, err) => {
      if (res) {
        const id = res[0].id;
        request
          .put(`/users/${id}`)
          .set('Authorization', 'Bearer ' + token)
          .send(update_user)
          .expect('location', new RegExp(`^http://127.0.0.1:[0-9]{1,5}/users/${id}$`))
          .expect(200, done);
      } else {
        console.log('error = ' + err);
        done();
      }
    });
  });

  it('Update /users/99 - gets 404', (done) => {
    request
      .put('/users/99')
      .set('Authorization', 'Bearer ' + token)
      .send(update_user)
      .expect(404, done);
  });

  it('Delete /users/1 - gets 204', (done) => {
    knex('users').insert({name: 'David', address: '1 First Street'})
    .returning(['id'])
    .then((res, err) => {
      if (res) {
        const id = res[0].id;
        request
          .delete(`/users/${id}`)
          .set('Authorization', 'Bearer ' + token)
          .expect(204, done);
      } else {
        console.log('error = ' + err);
        done();
      }
    });
  });

  it('Delete /users/99 - gets 404', (done) => {
    request
      .delete('/users/99')
      .set('Authorization', 'Bearer ' + token)
      .expect(404, done);
  });
});
