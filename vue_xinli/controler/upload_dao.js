module.exports = class upload_dao extends require("../model/upload_mod") {
  static async leaveMessage(req, resp) {
    let body = req.body;
    let id = body.id;
    let title = body.title;
    let content = body.content;
    let type = body.type;
    let results = await this.leaveMessageMod(id, title, content, type);
    resp.send(results);
  }

  /**
   * 分页获取所有留言与数量
   * @param req
   * @param resp
   * @returns {Promise<void>}
   */
  static async getAllTip(req, resp) {
    let pageNum = req.query.pageNum;
    let currPage = req.query.currPage;
    let data = await this.getAllTipMod(pageNum, currPage);
    let total = await this.getAllTipTotal();
    resp.send({ data, total: total[0].count });
  }

  /**
   * 发布公告
   * @param req
   * @param resp
   * @returns {Promise<void>}
   */
  static async announce(req, resp) {
    let title = req.body.title;
    let content = req.body.content;
    let major = req.body.major;
    let classes = req.body.classes;
    let publisher = req.body.publisher;
    let publisher_id = req.body.publisher_id;
    let re_type = req.body.re_type;
    let results = await this.announceMod(
      title,
      content,
      major,
      classes,
      publisher,
      publisher_id,
      re_type,
    );
    resp.send(results);
  }
  // 获取我发送出去的通知
  static async myannounce(req, resp) {
    let id = req.query.id;
    let pageNum = req.query.pageNum;
    let currPage = req.query.currPage;
    let data = await this.myannounceMod(id, pageNum, currPage);
    resp.send(data);
  }

  /**
   * f分页获取我的通知与数量
   * @param req
   * @param resp
   * @returns {Promise<void>}
   */
  static async getNotice(req, resp) {
    let u_type = req.query.type;
    let u_major = req.query.major;
    let u_class = req.query.class;
    let pageNum = req.query.pageNum;
    let currPage = req.query.currPage;
    console.log(u_major);
    let data = await this.getNoticeMod(u_type, u_major, u_class, pageNum, currPage);
    let total = await this.getNoticeTotal(u_type, u_major, u_class);
    resp.send({ data, total: total[0].count });
  }

  /**
   * 获取的我通知已读列表(供已读未读状态渲染
   * @param req
   * @param resp
   * @returns {Promise<void>}
   */
  static async getNoticeRead(req, resp) {
    let u_id = req.query.id;
    let data = await this.getNoticeReadMod(u_id);
    resp.send(data);
  }

  /**
   * 已读转未读
   * @param req
   * @param resp
   * @returns {Promise<void>}
   */
  static async gounreaded(req, resp) {
    let u_id = req.query.id;
    let n_id = req.query.n_id;
    let results = await this.gounreadedMod(u_id, n_id);
    resp.send(results);
  }

  /**
   * 未读转已读
   * @param req
   * @param resp
   * @returns {Promise<void>}
   */
  static async goreaded(req, resp) {
    let u_id = req.query.id;
    let n_id = req.query.n_id;
    let results = await this.goreadedMod(u_id, n_id);
    resp.send(results);
  }

  /**
   *发送预约申请
   * @param {*} req
   * @param {*} resp
   */
  static async setconsult(req, resp) {
    let body = req.body;
    let id = body.id;
    let name = body.name;
    let sex = body.sex;
    let tel = body.tel;
    let major = body.major;
    let title = body.title;
    let content = body.content;
    let help = body.help;
    let time = body.time;

    let data = await this.setconsultMod(id, name, sex, tel, major, title, content, help, time);
    resp.send(data);
  }

  /**
   * 获取所有申请表
   * @param req
   * @param resp
   * @returns {Promise<void>}
   */
  static async getAllconsult(req, resp) {
    let data = await this.getAllconsultMod();
    resp.send(data);
  }

  /**
   * 预约表审核提交
   * @param req
   * @param resp
   * @returns {Promise<void>}
   */
  static async setConsultState(req, resp) {
    let c_id = req.body.c_id;
    let state = req.body.state;
    let c_teacher = req.body.c_teacher;
    let data = await this.setConsultStatetMod(c_id, state, c_teacher);
    resp.send(data);
  }

  /**
   * 发布文章
   * @param req
   * @param resp
   * @returns {Promise<void>}
   */
  static async article(req, resp) {
    let title = req.body.title;
    let content = req.body.content;
    let tag = req.body.tag;
    let writer = req.body.writer;
    let results = await this.articleMod(title, content, tag, writer);
    resp.send(results);
  }
  // 获取所有的文章
  static async getarticle(req, resp) {
    let data = await this.getarticleMod();
    resp.send(data);
  }
  // 获取所有的公告
  static async getAllnotice(req, resp) {
    let data = await this.getAllnoticeMod();
    resp.send(data);
  }
  // 获取公告已读名单
  static async getReaded(req, resp) {
    let id = req.query.id;
    let data = await this.getReadedMod(id);
    resp.send(data);
  }

  static async getNoReaded(req, resp) {
    let major = req.query.major;
    let class1 = req.query.class1;
    let data = await this.getNoReadedMod(class1, major);
    resp.send(data);
  }
};
