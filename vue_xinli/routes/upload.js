var express = require("express");
var router = express.Router();
const upload = require("../controler/upload_dao");

let fs = require("fs");
let formidable = require("formidable");
let xlsx = require("node-xlsx");
const redisUtils = require("../utils/redisUtils");

router.post("/upload", function (req, res) {
  console.log("##########");
  let fileTypeError = false;
  let target_path = ".\\public\\upload";
  let form = new formidable.IncomingForm();
  form.encoding = "utf-8";
  form.keepExtensions = true;
  form.maxFiledsSize = 10 * 1024 * 1024;
  form.uploadDir = target_path;

  let files = [];
  let file = [];

  form.on("field", function (field, value) {
    file.push([field, value]);
  });
  form.on("file", function (field, file) {
    console.log("filename:" + file.name);
    let filext = file.name.substring(file.name.lastIndexOf("."), file.name.length);
    if (filext != ".xlsx") {
      redisUtils.set("xlsxData", "err", 3600);
      fileTypeError = true;
    } else {
      fileTypeError = true;
      return;
    }
    files.push([field, file]);
  });

  form.on("end", async function () {
    //遍历上传的文件
    let fileName = "";
    let obj = "";
    let exfalg = true;
    let folder_exists = await fs.existsSync(target_path);
    if (folder_exists) {
      let dirList = await fs.readdirSync(target_path);
      // console.log("dirList:",dirList)
      dirList.forEach((item) => {
        if (!fs.statSync(target_path + "\\" + item).isDirectory()) {
          fileName = target_path + "\\" + item;
          if (!fileTypeError) {
            obj = xlsx.parse(fileName);
            redisUtils.set("xlsxData", JSON.stringify(obj), 3600);
            res.send({ rtnCode: "1", rtnInfo: "成功导入数据", data: obj });
          } else {
            //解析失败的
            res.send({ rtnCode: "1", rtnInfo: "文件格式不对" });
            exfalg = false;
          }
          fs.unlinkSync(fileName);
        } else {
          res.send({ rtnCode: "1", rtnInfo: "系统错误" });
          return;
        }
      });
    }
  });
  form.on("error", function (err) {
    res.send({ rtnCode: "1", rtnInfo: "上传出错" });
  });
  form.on("aborted", function () {
    res.send({ rtnCode: "1", rtnInfo: "放弃上传" });
  });
  form.parse(req);
});

//留言
router.post("/leavemessage", function (req, res, next) {
  upload.leaveMessage(req, res);
});
//获取全部留言
router.get("/getalltip", function (req, res, next) {
  upload.getAllTip(req, res);
});
/**
 * 发布公告
 */
router.post("/announce", function (req, res, next) {
  upload.announce(req, res);
});

//获取我发送出去的公告
router.get("/myannounce", function (req, res, next) {
  upload.myannounce(req, res);
});

/**
 * 我的通知分页获取数据
 */
router.get("/getNotice", function (req, res) {
  upload.getNotice(req, res);
});

/**
 * 获取的我通知已读列表(供已读未读状态渲染)
 */
router.get("/getNoticeRead", function (req, res) {
  upload.getNoticeRead(req, res);
});
/**
 * 已读转未读
 */
router.get("/gounreaded", function (req, res) {
  upload.gounreaded(req, res);
});
/**
 * 未读转已读
 */
router.get("/goreaded", function (req, res) {
  upload.goreaded(req, res);
});

/**
 *  预约表申请
 */
router.post("/setconsult", function (req, res) {
  upload.setconsult(req, res);
});
/**
 * 获取所有申请表
 */
router.get("/getAllconsult", function (req, res) {
  upload.getAllconsult(req, res);
});

/**
 *  预约表审核提交
 */
router.post("/setConsultState", function (req, res) {
  upload.setConsultState(req, res);
});

//发文章
router.post("/article", function (req, res, next) {
  upload.article(req, res);
});
//获取所有文章
router.get("/getarticle", function (req, res, next) {
  upload.getarticle(req, res);
});
//获取所有公告
router.get("/getAllnotice", function (req, res, next) {
  upload.getAllnotice(req, res);
});

//获取已读名单
router.get("/getReaded", function (req, res, next) {
  upload.getReaded(req, res);
});
//获取未读名单
router.get("/getNoReaded", function (req, res, next) {
  upload.getNoReaded(req, res);
});
module.exports = router;
