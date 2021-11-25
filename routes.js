const Router = require('koa-router');
const router = new Router();

const Items = require('./src/apis/item/item');

router.post('/items', Items.add);
router.get('/items/:id', Items.get);

module.exports = router;
