const koaJwt = require('koa-jwt');
const jwt = require('jsonwebtoken');

const secret = process.env.AUTH_SECRET || 'secret';
const profile = {
  email: 'someone@somewhere.com',
};

exports.showToken = () => {
  console.log('TOKEN = ' + jwt.sign(profile, secret));
};

exports.auth = koaJwt({
  secret,
});
