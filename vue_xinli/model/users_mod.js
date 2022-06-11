const tools = require("../utils/tools");

module.exports = class users_mod extends require("./model") {
  /**
   * 数据库登录
   * @param username
   * @param password
   * @param type
   * @returns {Promise<unknown>}
   * @constructor
   */
  static LoginUser(username, password, type) {
    type = Number(type);
    return new Promise((resolve, reject) => {
      let sql =
        "select * from user where binary username='" +
        username +
        "' and password='" +
        password +
        "' and type= " +
        type;
      console.log(sql);
      this.query(sql)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject("登录失败");
        });
    });
  }

  /**
   * 根据用户类型进行用户信息获取（分页获取总数量与数据）
   * @param type
   * @param currPage
   * @param pageNum
   * @returns {Promise<unknown>}
   */
  static getUserByTypePageMod(type, currPage, pageNum) {
    pageNum = Number(pageNum);
    currPage = Number(currPage);
    currPage = Number(currPage * pageNum);
    return new Promise((resolve, reject) => {
      let sql = "select * from user where type = " + type + " order by modifytime desc LIMIT ?,?";
      console.log(sql);
      this.query(sql, this.formatParams(currPage, pageNum))
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static getUserByTYpePapeTotal(type) {
    return new Promise((resolve, reject) => {
      let sql = "select count(1) as count from user where type=" + type;
      console.log(sql);
      this.query(sql)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /**
   * 删除用户表用户
   * @param id
   */
  static delUserdataMod(username) {
    return new Promise((resolve, reject) => {
      let sql = "delete from user where username=" + username;
      this.query(sql)
        .then((res) => {
          resolve("删除用户表用户成功");
        })
        .catch((err) => {
          reject("删除用户表用户失败");
        });
    });
  }

  /**
   * 删除阅读表用户
   * @param id
   * @returns {Promise<unknown>}
   */
  static delRead(username) {
    return new Promise((resolve, reject) => {
      let sql = "delete from ·read· where u_username= " + username;
      this.query(sql)
        .then((res) => {
          resolve("删除阅读表用户成功");
        })
        .catch((err) => {
          reject("删除阅读表用户失败");
        });
    });
  }

  /**
   * 管理员用户信息修改
   * @param u_id
   * @param username
   * @param sex
   * @param type
   */
  static upUserdataMod(u_id, username, name, sex, address, major, class1) {
    let currTime = tools.getDate19();
    return new Promise((resolve, reject) => {
      let sql =
        "update `user` set username='" +
        username +
        "', sex='" +
        sex +
        "' , address='" +
        address +
        "', name='" +
        name +
        "',major='" +
        major +
        "',class='" +
        class1 +
        "', modifytime='" +
        currTime +
        "' where username='" +
        u_id +
        "'";
      console.log(sql);
      this.query(sql)
        .then((result) => {
          resolve("更新成功");
        })
        .catch((err) => {
          reject("更新失败");
        });
    });
  }

  /**
   * 添加用户
   * @param username
   * @param password
   * @param name
   * @param sex
   * @param address
   * @param major
   * @param class2
   * @param type
   * @returns {Promise<unknown>}
   */
  static addUserdataMod(username, password, name, sex, address, major, class2, type) {
    let currTime = tools.getDate19();
    return new Promise((resolve, reject) => {
      let sql = `insert into user(username,password,name,sex,address,modifytime,major,class,type) value ('${username}','${password}','${name}','${sex}','${address}','${currTime}','${major}','${class2}','${type}')`;
      // let params = [username,password,name,sex,address,currTime,major,class2,type]
      console.log(sql);
      this.query(sql)
        .then((result) => {
          resolve("添加成功");
        })
        .catch((err) => {
          reject("添加失败");
        });
    });
  }
  /**
   * 获取所有用户信息
   */
  static getAllUserX() {
    return new Promise((resolve, reject) => {
      let sql = "select * from user ";
      this.query(sql)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /**
   * 将redis数据未重复的进行插入
   * @param inXlsxArr
   */
  static inXlsxData(inXlsxArr) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < inXlsxArr.length; i++) {
        let sql =
          "insert into user (username,password,name,head,address,sex,major,class,type) values(" +
          inXlsxArr[i].username +
          ", '" +
          inXlsxArr[i].password +
          "' , '" +
          inXlsxArr[i].name +
          "', '" +
          inXlsxArr[i].head +
          "'," +
          "'" +
          inXlsxArr[i].address +
          "', '" +
          inXlsxArr[i].sex +
          "', '" +
          inXlsxArr[i].major +
          "','" +
          inXlsxArr[i].class +
          "', '" +
          inXlsxArr[i].type +
          "')";
        this.query(sql)
          .then((result) => {
            resolve(result);
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  }

  //=========================================================================================================

  /**
   * 根据用户专业班级进行用户信息获取（分页获取总数量与数据）
   * @param type
   * @param currPage
   * @param pageNum
   * @returns {Promise<unknown>}
   */
  static getUserByMajorMod(type, major) {
    return new Promise((resolve, reject) => {
      let sql = "select distinct class from user where  major = '" + major + "' and type = " + type;
      console.log(sql);
      this.query(sql)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};
