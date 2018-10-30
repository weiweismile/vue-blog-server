const config = require('../config/default');
const mysql = require('mysql');

const pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  port: config.database.PORT,
});

// // 原生写法
// pool.getConnection((err, connection) => {
//   // not connected!
//   if (err) throw err;
//   // Use the connection
//   connection.query('select * from user', (error, result, filed) => {
//     // When done with the connection, release it.
//     connection.release();
//     // Handle error after the release.
//     if (error) throw error;
//      // Don't use the connection here, it has been returned to the pool.
//   });
// });

// 使用promise对mysql查询到的回调进行封装,在之后的操作中可以使用await
const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) reject(err);
      connection.query(sql, values, (error, result, filed) => {
        connection.release();
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    })
  });
}

// 创建用户表
let users = `create table if not exists users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(100) NOT NULL COMMENT '用户名',
  password VARCHAR(100) NOT NULL COMMENT '密码',
  createTime VARCHAR(100) NOT NULL COMMENT '注册时间',
  avatar VARCHAR(100) NOT NULL COMMENT '头像',
  PRIMARY KEY ( id )
);`

let article = `create table if not exists article (
  id INT NOT NULL AUTO_INCREMENT,
  title TEXT NOT NULL COMMENT '文章标题',
  content TEXT NOT NULL COMMENT '文章内容',
  date VARCHAR(100) NOT NULL COMMENT '创建时间',
  author VARCHAR(100) NOT NULL COMMENT '作者',
  authorID INT NOT NULL COMMENT '作者id',
  pv VARCHAR(40) NOT NULL DEFAULT '0' COMMENT '浏览量',
  PRIMARY KEY ( id )
)charset utf8 collate utf8_general_ci;`

let createTable = (sql) => {
  return query(sql, []);
};


// 注册用户
createTable(users)
createTable(article)

module.exports = {query};
