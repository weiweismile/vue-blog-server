// 用于操作数据库的操作
const mysql = require('../model/mysql.js');

exports.login = async (params) => {
  const sql = 'select * from users where username=? and password=?';
  try {
    const res = await mysql.query(sql, [params.username, params.password]); 
    return res;
  } catch (err) {
    console.log(err);
  }
}

exports.register = async (params) => {
  const sql = 'insert into users set username = ?, password = ?, createTime = ?, avatar = ?';
  try {
    const rsp = await mysql.query(sql, [params.username, params.password, Date.now(), '']);
    if (rsp) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
  }
}
