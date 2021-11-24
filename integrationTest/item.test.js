const app = require('../app');
const request = require('supertest').agent(app.listen());

describe('Items', () => {
  const test_item = { name: 'Apple', price: 5 };

  it('POST /items', (done) => {
    request
      .post('/items')
      .send(test_item)
      .expect('location', new RegExp('^/items/[0-9a-fA-F]{8}$'))
      .expect(201, done);
  });
});
