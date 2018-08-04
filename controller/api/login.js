// 用于业务的操作

const user = require('../../service/user');

exports.login = async () => {
  // 判断是否输入符合规范
  try {
    await user.login();
  } catch (error) {
    console.log(error);
  }
}
