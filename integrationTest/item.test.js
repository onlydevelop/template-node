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
});
