const Router = require('koa-router');
const router = new Router();

const validators = require('./middleware/validate.middleware');
const { auth } = require('./middleware/auth.middleware');

const Items = require('./src/apis/item');
const Users = require('./src/apis/user');
const Carts = require('./src/apis/cart');

router.post('/items', validators.postItems, auth, Items.add);
router.get('/items/:id', Items.get);
router.get('/public/items', auth, Items.getAll);
router.put('/items/:id', auth, Items.update);
router.delete('/items/:id', auth, Items.delete);

router.post('/users', validators.postUsers, auth, Users.add);
router.get('/users/:id', auth, Users.get);
router.get('/users', auth, Users.getAll);
router.put('/users/:id', auth, Users.update);
router.delete('/users/:id', auth, Users.delete);

// The decrypted profile from jwt token is available in ctx.state.user
router.post('/carts/:userId', validators.postCart, auth, Carts.add);
// curl -i "localhost:3000/carts/3?desc=true&offset=2&limit=2"
router.get('/carts/:userId', auth, Carts.getAll);
router.get('/carts/:userId/:cartId', auth, Carts.get);
router.put('/carts/:userId/:cartId', auth, Carts.update);
router.delete('/carts/:userId/:cartId', auth, Carts.delete);
router.delete('/carts/:userId', auth, Carts.deleteAll);

module.exports = router;
