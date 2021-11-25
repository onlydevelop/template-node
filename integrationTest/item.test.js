const app = require('../app');
const request = require('supertest').agent(app.listen());

describe('Items', () => {
  const test_item = { name: 'Apple', price: 5 };

  it('POST /items', (done) => {
    request
      .post('/items')
      .send(test_item)
      .expect(
        'location',
        new RegExp('^http://127.0.0.1:[0-9]{1,5}/items/[0-9]*$')
      )
      .expect(201, done);
  });

  it('GET /items/:id - valid gets 200', (done) => {
    request
      .get('/items/1')
      .expect(new RegExp('"id":[0-9]+'))
      .expect(new RegExp('"name":[^ ]+'))
      .expect(new RegExp('"price":"[0-9]{1,9}(.)[0-9]{2}'))
      .expect(200, done);
  });

  it('GET /items/:id - invalid gets 404', (done) => {
    request.get('/items/0').expect(404, done);
  });
});
