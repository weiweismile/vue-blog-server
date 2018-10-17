const router = require('koa-router')();
const login = require('../controller/api/login');

router.get('/api/blog', ctx => {
  console.log(ctx, 323232);
});

router.post('/api/login', login.login);
router.post('/api/logout', login.logout);

router.post('/api/register', login.register);

router.get('/api/getInfo', login.getInfo);

module.exports = router;
