const Router = require('koa-router');
const router = new Router();

const Items = require('./src/apis/item');
const Users = require('./src/apis/user');

router.post('/items', Items.add);
router.get('/items/:id', Items.get);
router.get('/items', Items.getAll);
router.put('/items/:id', Items.update);
router.delete('/items/:id', Items.delete);

router.post('/users', Users.add);
router.get('/users/:id', Users.get);
router.get('/users', Users.getAll);
router.put('/users/:id', Users.update);
router.delete('/users/:id', Users.delete);

module.exports = router;
