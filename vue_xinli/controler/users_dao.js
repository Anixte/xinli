global.globalKey = "123456";
const jwtUtil = require("../utils/jwtUtils");
const redisUtils = require("../utils/redisUtils");
module.exports = class users_dao extends require("../model/users_mod") {
  /**
   * 登录
   * @param req   请求参数
   * @param resp   响应参数
   * @constructor
   */
  static async Login(req, resp) {
    let body = req.body;
    let loginData = await this.LoginUser(body.username, body.password, body.type);
    // 如果获取到了登录用户信息则登录成功
    if (loginData.length != 0) {
      let jwt_token = jwtUtil.sign(
        {
          id: loginData[0].id,
          username: loginData[0].username,
          head: loginData[0].head,
          type: loginData[0].type,
          name: loginData[0].name,
          address: loginData[0].address,
          major: loginData[0].major,
          class: loginData[0].class,
        },
        global.globalKey,
        3600,
      );
      resp.send({ loginData, jwt_token });
    } else resp.status(500).send("用户名或者账号输入错误");
  }

  /**
   * 根据token解析成用户信息
   * @param req
   * @param resp
   */
  static async getUserDataByToken(req, resp) {
    let result = await jwtUtil.verifysync(req.query.token, global.globalKey);

    resp.send(result);
  }

  /**
   * 根据用户类型进行用户信息获取（分页获取总数量与数据）
   * @param req
   * @param resp
   * @returns {Promise<void>}
   */

  static async getUserByTypePage(req, resp) {
    // console.log(req.query)
    let query = req.query;
    let data = await this.getUserByTypePageMod(query.type, query.currPage, query.pageNum);
    let total = await this.getUserByTYpePapeTotal(query.type);
    resp.send({ data, total: total[0].count });
  }

  /**
   * 用户删除 （同时删除用户阅读记录）
   * @param req
   * @param resp
   * @returns {Promise<void>}
   */
  static async delUserdata(req, resp) {
    let result = await this.delUserdataMod(req.query.username);
    // result+=await this.delRead(req.query.username)
    resp.send(result);
  }

  /**
   * 用户更改
   * @param req
   * @param resp
   * @returns {Promise<void>}
   */
  static async upUserdata(req, resp) {
    let body = req.body;
    let u_id = body.u_id;
    let username = body.username;
    let name = body.name;
    let sex = body.sex;
    let address = body.address;
    let major = body.major;
    let class1 = body.class1;
    let result = await this.upUserdataMod(u_id, username, name, sex, address, major, class1);
    resp.send(result);
  }

  /**
   * 添加用户数据 (初始密码为12345678)
   * @param req
   * @param resp
   * @returns {Promise<void>}
   */
  static async addUserdata(req, resp) {
    let body = req.body;
    let username = body.username;
    let password = 12345678;
    let name = body.name;
    let sex = body.sex;
    let address = body.address;
    let major = body.major;
    let class2 = body.class2;
    let type = body.type;
    let result = await this.addUserdataMod(
      username,
      password,
      name,
      sex,
      address,
      major,
      class2,
      type,
    );
    resp.send(result);
  }

  /**
   * 将redis的xlsx数据写入数据库
   * @param req
   * @param resp
   * @returns {Promise<void>}
   */
  static async setXlsxData(req, resp) {
    // console.log("点击导入")
    let xlsxData = await redisUtils.get("xlsxData");
    let AllUsers = await this.getAllUserX();
    if (xlsxData == "err") {
      resp.send("导入失败,不是标准的文件格式");
      return;
    }
    xlsxData = JSON.parse(xlsxData)[0].data;
    let inXlsxArr = [];
    let infalg = true;
    // console.log(xlsxData[0].length)
    if (xlsxData[0].length != 9) resp.send("导入的表格数据格式错误");

    for (let i = 1; i < xlsxData.length; i++) {
      if (xlsxData[i][0] != 0) {
        let falg = true;
        let xlsxObj = {};
        if (
          xlsxData[i][0] == null ||
          xlsxData[i][1] == null ||
          xlsxData[i][2] == null ||
          xlsxData[i][4] == null ||
          xlsxData[i][5] == null ||
          xlsxData[i][6] == null ||
          xlsxData[i][7] == null
        ) {
          infalg = false;
        }

        xlsxObj.username = xlsxData[i][0];
        xlsxObj.password = xlsxData[i][1];
        xlsxObj.name = xlsxData[i][2];
        xlsxObj.head = xlsxData[i][3] || "1.jpg";
        xlsxObj.address = xlsxData[i][4];
        xlsxObj.sex = xlsxData[i][5];
        xlsxObj.major = xlsxData[i][6];
        xlsxObj.class = xlsxData[i][7];
        xlsxObj.type = xlsxData[i][8];
        for (let j = 0; j < AllUsers.length; j++) {
          if (xlsxObj.id == AllUsers[j].id) falg = false;
        }
        if (falg) inXlsxArr.push(xlsxObj);
      }
    }
    if (infalg) {
      if (inXlsxArr.length != 0) this.inXlsxData(inXlsxArr);
      resp.send("导入数据成功");
    } else resp.status(500).send("导入文件中的数据部分格式错误,导入失败");
  }

  /**
   * 根据用户类型进行用户信息获取（分页获取总数量与数据）
   * @param req
   * @param resp
   * @returns {Promise<void>}
   */

  static async getUserByMajor(req, resp) {
    console.log(req.query);
    let query = req.query;
    let data = await this.getUserByMajorMod(query.type, query.major);
    resp.send(data);
  }
};
