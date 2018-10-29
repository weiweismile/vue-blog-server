const router = require('koa-router')();
const login = require('../controller/api/login');
const article = require('../controller/api/article');

router.get('/api/blog', ctx => {
  console.log(ctx, 323232);
});

router.post('/api/login', login.login);
router.post('/api/logout', login.logout);

router.post('/api/register', login.register);

router.get('/api/getInfo', login.getInfo);
router.post('/api/publishText', article.publishArticle);

module.exports = router;
