// 用于操作数据库的操作
const mysql = require('../model/mysql.js');

exports.login = async (params) => {
  const sql = 'select username=? and password=? from users';
  await mysql.query(sql, [params.username, params.password]).then((res) => {
    if (res.length) {
      return true;
    }
    return false;
  }).catch((err) => {
    console.log(err);
  });
}
