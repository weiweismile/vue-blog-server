const koa = require('koa');
const app = new koa();
const index = require('./route/index.js');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');


app.use(bodyParser());

// 加密cookie
app.keys = ['koa-blog'];
const CONFIG = {
  key: 'koa:sess',
  maxAge: 86400000,
};
app.use(session(CONFIG, app));
//router
app.use(index.routes(),index.allowedMethods());

app.listen(3000, () => {
  console.log(3000);
});
