module.exports = class users_mod extends require("./model") {
  /**
   * 分页获取搜索结果
   * @param type
   * @param inputText
   * @param CharType
   * @param currPage
   * @param pageNum
   * @returns {Promise<unknown>}
   */
  static getUserByTypeAndCharMod(type, inputText, CharType, currPage, pageNum) {
    pageNum = Number(pageNum);
    currPage = Number(currPage);
    currPage = Number(currPage * pageNum);
    return new Promise((resolve, reject) => {
      let sql =
        "select * from `user` where " +
        CharType +
        ' like "%' +
        inputText +
        '%" and type = ' +
        type +
        " order by modifytime desc LIMIT ?,?";
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

  static getUserByTypeAndCharTotal(type, inputText, CharType) {
    return new Promise((resolve, reject) => {
      let sql =
        "select count(1) as count from user  where " +
        CharType +
        ' like "%' +
        inputText +
        '%" and type = ' +
        type;
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

  // 根据用户id获取用户信息
  static getUserInfoMod(id) {
    return new Promise((resolve, reject) => {
      let sql = "select * from user where id=" + id;
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

  //   留言信息修改;
  static upTipdataMod(id, w_name, title, content, type) {
    return new Promise((resolve, reject) => {
      let sql =
        "update `tip` set w_name='" +
        w_name +
        "' , title='" +
        title +
        "', content='" +
        content +
        "',type='" +
        type +
        "' where id=" +
        id +
        "";
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

  // 模糊搜索留言
  static getTipByTypeAndCharMod(inputText, CharType, currPage, pageNum) {
    pageNum = Number(pageNum);
    currPage = Number(currPage);
    currPage = Number(currPage * pageNum);
    return new Promise((resolve, reject) => {
      let sql =
        "select * from `tip` where " +
        CharType +
        ' like "%' +
        inputText +
        '%"  order by time desc LIMIT ?,?';
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

  // 删除留言
  static delTipMod(id) {
    return new Promise((resolve, reject) => {
      let sql = "delete from tip where id=" + id;
      this.query(sql)
        .then((res) => {
          resolve("删除留言成功");
        })
        .catch((err) => {
          reject("删除留言失败");
        });
    });
  }

  //   公告修改;
  static upNoticeDataMod(n_id, title, content) {
    return new Promise((resolve, reject) => {
      let sql =
        "update `notice` set title='" +
        title +
        "' , content='" +
        content +
        "' where n_id=" +
        n_id +
        "";
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

  // 模糊搜索公告
  static getNoticeByTypeAndCharMod(inputText, CharType, currPage, pageNum) {
    pageNum = Number(pageNum);
    currPage = Number(currPage);
    currPage = Number(currPage * pageNum);
    return new Promise((resolve, reject) => {
      let sql =
        "select * from `notice` where " +
        CharType +
        ' like "%' +
        inputText +
        '%"  order by createtime desc LIMIT ?,?';
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

  // 删除公告
  static delNoticeMod(n_id) {
    return new Promise((resolve, reject) => {
      let sql = "delete from notice where n_id=" + n_id;
      this.query(sql)
        .then((res) => {
          resolve("删除公告成功");
        })
        .catch((err) => {
          reject("删除公告失败");
        });
    });
  }

  //   文章信息修改;
  static upActicleDataMod(a_id, a_type, title, content) {
    return new Promise((resolve, reject) => {
      let sql =
        "update `article` set title='" +
        title +
        "' , a_type='" +
        a_type +
        "', content='" +
        content +
        "' where a_id=" +
        a_id +
        "";
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

  // 模糊搜索文章
  static getActicleByTypeAndCharMod(inputText, CharType, currPage, pageNum) {
    pageNum = Number(pageNum);
    currPage = Number(currPage);
    currPage = Number(currPage * pageNum);
    return new Promise((resolve, reject) => {
      let sql =
        "select * from `article` where " +
        CharType +
        ' like "%' +
        inputText +
        '%"  order by w_time desc LIMIT ?,?';
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

  // 删除文章
  static delActicleMod(a_id) {
    return new Promise((resolve, reject) => {
      let sql = "delete from article where a_id=" + a_id;
      this.query(sql)
        .then((res) => {
          resolve("删除文章成功");
        })
        .catch((err) => {
          reject("删除文章失败");
        });
    });
  }
};
