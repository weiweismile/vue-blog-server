const koa = require('koa');
const app = new koa();
const index = require('./route/index.js');
const bodyParser = require('koa-bodyparser');


app.use(bodyParser());

//router
app.use(index.routes(),index.allowedMethods());

app.listen(3000, () => {
  console.log(3000);
});
