module.exports = class admin_dao extends require("../model/admin_mod") {
  /**
   * 根据用户类型与查询字段进行模糊查询
   * @param req
   * @param resp
   * @returns {Promise<void>}
   */
  static async getUserByTypeAndChar(req, resp) {
    let query = req.query;
    let type = query.type;
    let inputText = query.inputText;
    let CharType = query.CharType;
    let pageNum = query.pageNum;
    let currPage = query.currPage;

    let data = await this.getUserByTypeAndCharMod(type, inputText, CharType, currPage, pageNum);
    let total = await this.getUserByTypeAndCharTotal(type, inputText, CharType);
    resp.send({ data, total: total[0].count });
  }
  // 根据用户id获取用户信息
  static async getUserInfo(req, resp) {
    let query = req.query;
    let id = query.id;
    let data = await this.getUserInfoMod(id);
    resp.send(data);
  }
  // 更新留言信息
  static async upTipdata(req, resp) {
    let body = req.body;
    let id = body.id;
    let w_name = body.w_name;
    let title = body.title;
    let content = body.content;
    let type = body.type;

    let result = await this.upTipdataMod(id, w_name, title, content, type);
    resp.send(result);
  }
  //   分页获取搜索留言信息;
  static async getTipByTypeAndChar(req, resp) {
    let query = req.query;
    // console.log(query);
    let inputText = query.inputText;
    let CharType = query.CharType;
    let pageNum = query.pageNum;
    let currPage = query.currPage;
    let data = await this.getTipByTypeAndCharMod(inputText, CharType, currPage, pageNum);
    resp.send(data);
  }
  // 删除留言
  static async delTip(req, resp) {
    let result = await this.delTipMod(req.query.id);
    resp.send(result);
  }

  // 更新公告信息
  static async upNoticeData(req, resp) {
    let n_id = req.body.n_id;
    let title = req.body.title;
    let content = req.body.content;

    let result = await this.upNoticeDataMod(n_id, title, content);
    resp.send(result);
  }
  //   分页获取搜索公告信息;
  static async getNoticeByTypeAndChar(req, resp) {
    let query = req.query;
    // console.log(query);
    let inputText = query.inputText;
    let CharType = query.CharType;
    let pageNum = query.pageNum;
    let currPage = query.currPage;
    let data = await this.getNoticeByTypeAndCharMod(inputText, CharType, currPage, pageNum);
    resp.send(data);
  }
  // 删除公告
  static async delNotice(req, resp) {
    let result = await this.delNoticeMod(req.query.n_id);
    resp.send(result);
  }

  // 更新文章信息
  static async upActicleData(req, resp) {
    let a_id = req.body.a_id;
    let a_type = req.body.a_type;
    let title = req.body.title;
    let content = req.body.content;

    let result = await this.upActicleDataMod(a_id, a_type, title, content);
    resp.send(result);
  }
  //   分页获取搜索文章信息;
  static async getActicleByTypeAndChar(req, resp) {
    let query = req.query;
    // console.log(query);
    let inputText = query.inputText;
    let CharType = query.CharType;
    let pageNum = query.pageNum;
    let currPage = query.currPage;
    let data = await this.getActicleByTypeAndCharMod(inputText, CharType, currPage, pageNum);
    resp.send(data);
  }
  // 删除文章
  static async delActicle(req, resp) {
    let result = await this.delActicleMod(req.query.a_id);
    resp.send(result);
  }
};
