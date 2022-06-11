var express = require("express");
var router = express.Router();
const user = require("../controler/users_dao");
const fileUp = require("../utils/fileUtils");
const jwtUtil = require("../utils/jwtUtils");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("user进入路由根目录");
});

// 登录接口
router.post("/login", function (req, res) {
  user.Login(req, res);
});

// 通过token获取用户信息
router.get("/getUserDataByToken", function (req, res) {
  user.getUserDataByToken(req, res);
});

// 分页获取用户信息
router.get("/getUserByTypePage", function (req, res) {
  user.getUserByTypePage(req, res);
});

// 删除用户
router.get("/delUserdata", function (req, res) {
  if (req.query.username == 18251106144) {
    res.send("您不能删除管理员");
  } else user.delUserdata(req, res);
});

// 更改用户数据
router.post("/upUserdata", function (req, res) {
  user.upUserdata(req, res);
});

// 添加用户
router.post("/addUserdata", function (req, res) {
  user.addUserdata(req, res);
});

router.post("/setXlsxData", function (req, res) {
  user.setXlsxData(req, res);
});

// 根据用户专业获取信息
router.get("/getUserByMajor", function (req, res) {
  user.getUserByMajor(req, res);
});
module.exports = router;
