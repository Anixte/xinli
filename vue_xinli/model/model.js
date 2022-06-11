const mysql = require("mysql");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "20000508",
  port: "3306",
  database: "vue_xinli",
  timezone: "08:00",
});
/**
 * 封装一个数据库基类
 * @type {module.Model}
 */
module.exports = class Model {
  /**
   * 通用的查询方法
   * @param sql    要执行的sql语句
   * @param params   给sql语句的占位符进行赋值的参数数组
   */
  static query(sql, params) {
    return new Promise((resolve, reject) => {
      pool.getConnection(function (err, connection) {
        if (err) {
          console.error(err);
          // 发生错误也释放连接
          connection.release();
        } else {
          // query 执行 sql 语句
          connection.query(sql, params, (err, results) => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              resolve(results);
            }
            // 结束会话，释放连接
            connection.release();
          });
        }
      });
    });
  }

  static formatParams() {
    let array = [];
    for (let i = 0, l = arguments.length; i < l; i++) {
      array.push(arguments[i]);
    }
    return array;
  }
};
