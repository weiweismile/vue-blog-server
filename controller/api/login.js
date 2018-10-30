// 用于业务的操作

const user = require('../../service/user');

// 不论是get 还是 post 前台发送成功给后台 后台都需要给前台一些响应 不然前台也知道怎么操作，前台会报404，
// 例如： ctx.body = {
//   status:100,
//   name:'1',
//   dec:'密码错误'
// };
exports.login = async (ctx) => {
  // 判断是否输入符合规范
  try {
    // node 原始写法
    // let postdata="";
    //   ctx.req.on('data',(data)=>{
    //       postdata += data
    //   })
    //   ctx.req.on('end',function(){
    //     console.log(postdata, 'postdata');
    // })

    // 使用koa-bodyparser插件
    const { username, password } = ctx.request.body;
    const params = {username, password};
    const result = await user.login(params);
    if (result.length) {
      ctx.session.username = username;
      ctx.session.user = result[0] || {};
      ctx.body = {
        code: 200,
        data: ctx.session,
        msg: 'success',
      };
    } else {
      ctx.body = {
        code: 500,
        data: {},
        msg: '无该用户',
      };
    }
  } catch (error) {
    console.log(error);
  }
}

exports.logout = async (ctx) => {
  ctx.session = null;
  ctx.body = {
    code: 200,
    data: ctx.session,
    msg: 'success',
  };
}

exports.register = async (ctx) => {
  try {
    const { username, password } = ctx.request.body;
    const params = {username, password};
    const users = await user.login(params);
    if (users) {
      // 已存在该用户
      ctx.body = {
        code: 20001,
        data: {},
        msg: '该用户已注册',
      };
      return;
    }
    const result = await user.register(params);
    if (result) {
      console.log('注册成功');
      ctx.body = {
        code: 200,
        message: '注册成功'
      };
    } else {
      ctx.body = {
        code: 500,
        data: {},
        msg: '注册失败',
      };
    }
  } catch (error) {
    console.log(error);
  }
}


exports.getInfo = async (ctx) => {
  ctx.body = {
    code: 200,
    data: ctx.session,
    msg: 'success',
  };
}