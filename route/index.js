const router = require('koa-router')();
const login = require('../controller/api/login');

router.get('/api/blog', ctx => {
  console.log(ctx.session, 323232);
});

router.post('/api/login', login.login);

router.post('/api/register', login.register);

module.exports = router;
