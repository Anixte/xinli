var express = require("express");
var router = express.Router();
const admin = require("../controler/admin_dao");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("admin进入路由根目录");
});
// 根据用户类型与查询字段进行模糊查询
router.get("/getUserByTypeAndChar", function (req, res, next) {
  admin.getUserByTypeAndChar(req, res);
});
// 根据id获取用户信息
router.get("/getUserInfo", function (req, res, next) {
  admin.getUserInfo(req, res);
});
// 更改留言数据
router.post("/upTipdata", function (req, res) {
  admin.upTipdata(req, res);
});

// 根据查询字段进行模糊查询
router.get("/getTipByTypeAndChar", function (req, res, next) {
  admin.getTipByTypeAndChar(req, res);
});

// 删除留言
router.get("/delTip", function (req, res) {
  admin.delTip(req, res);
});

// 更改公告数据
router.post("/upNoticeData", function (req, res) {
  admin.upNoticeData(req, res);
});

// 根据查询字段进行公告模糊查询
router.get("/getNoticeByTypeAndChar", function (req, res, next) {
  admin.getNoticeByTypeAndChar(req, res);
});

// 删除公告
router.get("/delNotice", function (req, res) {
  admin.delNotice(req, res);
});

// 更改文章数据
router.post("/upActicleData", function (req, res) {
  admin.upActicleData(req, res);
});

// 根据查询字段进行文章模糊查询
router.get("/getActicleByTypeAndChar", function (req, res, next) {
  admin.getActicleByTypeAndChar(req, res);
});

// 删除文章
router.get("/delActicle", function (req, res) {
  admin.delActicle(req, res);
});
module.exports = router;
