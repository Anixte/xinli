const tools = require("../utils/tools");

module.exports = class upload_mod extends require("./model") {
  // 发布留言
  static leaveMessageMod(id, title, content, type) {
    let time = tools.getDate19();
    return new Promise((resolve, reject) => {
      let sql = `insert into tip(w_name,title,content,type,time) value ('${id}','${title}','${content}','${type}','${time}')`;
      //   console.log(sql);
      this.query(sql)
        .then((result) => {
          resolve("发布成功");
        })
        .catch((err) => {
          console.log(`发布留言出错:${err.message}`);
          reject("由于网络原因,您的留言并没有发出");
        });
    });
  }

  /**
   * 分页获取所有留言与数量
   * @param pageNum
   * @param currPage
   */
  static getAllTipMod(pageNum, currPage) {
    pageNum = Number(pageNum);
    currPage = Number(currPage);
    currPage = Number(pageNum * currPage);
    return new Promise((resolve, reject) => {
      let sql = "select * from tip order by time desc LIMIT ?,? ";
      //   console.log(sql);
      this.query(sql, this.formatParams(currPage, pageNum))
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static getAllTipTotal() {
    return new Promise((resolve, reject) => {
      let sql = "select count(1) as count from tip";
      this.query(sql)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject("由于网络原因:获取数量失败");
        });
    });
  }

  /**
   * f发布公告
   * @param title
   * @param classes
   * @returns {Promise<any>}
   */
  static announceMod(title, content, major, classes, publisher, publisher_id, re_type) {
    let time = tools.getDate19();
    return new Promise((resolve, reject) => {
      let sql =
        "insert into `notice` (title, content,createtime, major, classes, publisher, publisher_id, re_type) values (?,?,?,?,?,?,?,?)";
      this.query(
        sql,
        this.formatParams(title, content, time, major, classes, publisher, publisher_id, re_type),
      )
        .then((result) => {
          resolve("发布成功");
        })
        .catch((err) => {
          console.log(`发布公告出错:${err.message}`);
          reject("由于网络原因,您的公告并没有发出");
        });
    });
  }

  /**
   * 获取我发布的公告
   * @param pageNum
   * @param currPage
   */
  static myannounceMod(id, pageNum, currPage) {
    pageNum = Number(pageNum);
    currPage = Number(currPage);
    currPage = Number(pageNum * currPage);
    return new Promise((resolve, reject) => {
      let sql =
        "select * from notice where publisher_id = " + id + " order by createtime desc LIMIT ?,? ";
      //   console.log(sql);
      this.query(sql, this.formatParams(currPage, pageNum))
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /**
   * 分页获取我的通知与数量
   * @param u_classes
   * @param pageNum
   * @param currPage
   * @returns {Promise<any>}
   */
  static getNoticeMod(u_type, u_major, u_class, pageNum, currPage) {
    pageNum = Number(pageNum);
    currPage = Number(currPage);
    currPage = Number(currPage * pageNum);
    return new Promise((resolve, reject) => {
      if (u_type == 2) {
        var sql =
          "select * from notice where major = '" +
          u_major +
          "' and classes like '%" +
          u_class +
          "%' order by createtime desc limit ?,? ";
      } else {
        var sql =
          "select * from notice where major like '%" +
          u_major +
          "%' order by createtime desc limit ?,? ";
      }

      //   console.log(sql);
      this.query(sql, this.formatParams(currPage, pageNum))
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static getNoticeTotal(u_type, u_major, u_class) {
    return new Promise((resolve, reject) => {
      if (u_type == 2) {
        var sql =
          "select count(1) as count from notice where major = '" +
          u_major +
          "'  and classes like '%" +
          u_class +
          "%'";
      } else {
        var sql = ` select count(1) as count from notice where major = '${u_major}'`;
      }
      //   console.log(sql);
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
   * 获取的我通知已读列表(供已读未读状态渲染
   * @param u_id
   */
  static getNoticeReadMod(u_id) {
    return new Promise((resolve, reject) => {
      let sql = "select * from `read` where u_id= ? ";
      this.query(sql, this.formatParams(u_id))
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /**
   * 已读转未读
   * @param u_id
   * @param n_id
   */
  static gounreadedMod(u_id, n_id) {
    u_id = Number(u_id);
    n_id = Number(n_id);
    return new Promise((resolve, reject) => {
      let sql = "delete from `read` where u_id = ? and n_id = ? ";
      this.query(sql, this.formatParams(u_id, n_id))
        .then((result) => {
          resolve("已读转未读成功");
        })
        .catch((err) => {
          reject("已读转未读失败");
        });
    });
  }

  /**
   * 未读转已读
   * @param u_id
   * @param n_id
   */
  static goreadedMod(u_id, n_id) {
    u_id = Number(u_id);
    n_id = Number(n_id);
    let time = tools.getDate19();
    return new Promise((resolve, reject) => {
      // let sql= "delete from `read` where u_id = ? and n_id = ? "
      let sql = "insert into `read` (u_id,n_id,readtime) values (?,?,?) ";
      this.query(sql, this.formatParams(u_id, n_id, time))
        .then((result) => {
          resolve("未读转已读成功");
        })
        .catch((err) => {
          reject("未读转已读失败");
        });
    });
  }

  /**
   *预约表申请
   * @param {*} id
   * @param {*} name
   * @param {*} sex
   * @param {*} major
   * @param {*} title
   * @param {*} content
   * @param {*} help
   * @param {*} time
   * @returns
   */
  static setconsultMod(id, name, sex, tel, major, title, content, help, time) {
    let timer = tools.getDate19();
    return new Promise((resolve, reject) => {
      let sql =
        "insert into consult(u_id,u_name,u_sex,u_tel,u_major,c_title,c_content,c_help,c_time,state,createtime) values (?,?,?,?,?,?,?,?,?,1,?)";
      this.query(
        sql,
        this.formatParams(id, name, sex, tel, major, title, content, help, time, timer),
      )
        .then((result) => {
          resolve("预约申请表提交成功");
        })
        .catch((err) => {
          reject("预约申请表提交失败");
        });
    });
  }

  /**
   * 获取预约申请表
   */
  static getAllconsultMod() {
    return new Promise((resolve, reject) => {
      let sql = "select * from consult order by createtime desc";
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
   *审核预约表
   * @param {*} c_id
   * @param {*} state
   * @param {*} c_teacher
   * @returns
   */
  static setConsultStatetMod(c_id, state, c_teacher) {
    return new Promise((resolve, reject) => {
      let sql =
        "update `consult` set state = '" +
        state +
        "' , c_teacher = '" +
        c_teacher +
        "' where c_id = " +
        c_id;
      this.query(sql)
        .then((result) => {
          resolve("预约申请表审核成功");
        })
        .catch((err) => {
          reject("预约申请表审核失败");
        });
    });
  }

  // 发表文章
  static articleMod(title, content, tag, writer) {
    let time = tools.getDate19();
    return new Promise((resolve, reject) => {
      let sql = "insert into `article` (title, content,a_type,writer,w_time) values (?,?,?,?,?)";
      this.query(sql, this.formatParams(title, content, tag, writer, time))
        .then((result) => {
          resolve("发表成功");
        })
        .catch((err) => {
          reject("发表失败");
        });
    });
  }
  // 获取所有文章
  static getarticleMod() {
    return new Promise((resolve, reject) => {
      let sql = "select * from `article` order by w_time desc";
      this.query(sql)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  // 获取所有公告
  static getAllnoticeMod() {
    return new Promise((resolve, reject) => {
      let sql = "select * from `notice` order by createtime desc";
      this.query(sql)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  // 获取公告已读名单
  static getReadedMod(id) {
    return new Promise((resolve, reject) => {
      let sql =
        "SELECT user.name,readtime FROM `user`,`notice`,`read` where user.id = read.u_id and user.type = 2 and read.n_id = " +
        id +
        " GROUP BY user.name";
      this.query(sql)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static getNoReadedMod(class1, major) {
    return new Promise((resolve, reject) => {
      let sql =
        "SELECT user.name  FROM `user` where user.type = 2 and user.class = '" +
        class1 +
        "' and user.major = '" +
        major +
        "'";
      this.query(sql)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};
