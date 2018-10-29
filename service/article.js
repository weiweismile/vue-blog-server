// 用于操作数据库的操作
const mysql = require('../model/mysql.js');
exports.publish = async (params) => {
    const sql = 'select into article set title=?,content=?,date=?,author=?,authorID=?,';
    try {
      const res = await mysql.query(sql, [params.title, params.content,params.date, params.author,params.authorID]); 
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  exports.getArticle = async (params) => {
      const sql = 'select * from article where authorID=？';
      try {
          const rsp = await mysql.query(sql, [params.authorID]);
          return rsp;
      } catch (err) {
          console.log(err);
      }
  }