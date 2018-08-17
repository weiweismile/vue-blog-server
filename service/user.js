// 用于操作数据库的操作
const mysql = require('../model/mysql.js');

exports.login = async (params) => {
  const sql = 'select username=? and password=? from users';
  try {
    const res = await mysql.query(sql, [params.username, params.password]);    
    if (res.length) {
      return true;
    }
    return false;
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
