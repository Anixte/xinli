/*
 Navicat MySQL Data Transfer

 Source Server         : LJH
 Source Server Type    : MySQL
 Source Server Version : 80028
 Source Host           : localhost:3306
 Source Schema         : vue_xinli

 Target Server Type    : MySQL
 Target Server Version : 80028
 File Encoding         : 65001

 Date: 22/05/2022 11:27:12
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article`  (
  `a_id` int NOT NULL AUTO_INCREMENT COMMENT '文章id',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '标题',
  `content` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '内容',
  `a_type` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '文章类型',
  `writer` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '作者',
  `w_time` datetime NULL DEFAULT NULL COMMENT '写作时间',
  PRIMARY KEY (`a_id`) USING BTREE,
  INDEX `article_ibfk_1`(`writer`) USING BTREE,
  CONSTRAINT `article_ibfk_1` FOREIGN KEY (`writer`) REFERENCES `user` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES (1, '当你在要求别人改变时，你是如何伤害着你自己？', '给自己更多的尊重和欣赏作为开始，因为，如果你真正欣赏和接受你自己，别人对你的反应还可能影响你吗？你还需要这么仰赖别人对你的顺应来肯定你自己吗？深入思考一下。\n\n诚实地看看你的生命，写下现在你想去改变的人的名字，和你一起工作的同事、一起生活的人、你的家人、你的朋友、你的老板、某银行经理……\n\n然后，回顾你的生命，想想你花掉了生命中多少个小时、日子、星期、月份，去期待别人改变，换回来的却只有失望和难过。因为没有人改变过，没有一个人如你期待的被改变。如果你把这些日子加起来，可能会是好几年的时间，你耗去你生命中的宝贵光阴，有改变过一个人吗？\n\n唯一改变的那个可能是你！\n\n唯一改变的那个可能是你！\n\n想想近来令你手足无措的某人，闭上眼睛再次回忆当时的情形，感觉你自己回到那个时候，回忆你所处的地点和所有的细节，并且回忆你在那个片刻的感受——让自己重温那曾经生起过的感受，即使当时的你并没有察觉到这变化。\n\n记起那个情境，注意你体内的变化：感受它带给你的紧张和紧绷——可能在你的胃、你的脖子和肩膀、你的前额、围绕着你的嘴巴和眼睛。查看一下你的呼吸——它是舒缓放松还是紧凑浅薄？\n\n不要以你所看到的来判断你自己，只把它们记下来。问问自己：\n\n这是不是一种令人愉悦的感觉？\n\n它能滋养我吗？\n\n它对我的身体有好处吗？\n\n它使我感觉开放还是收缩、温暖还是寒冷、坚硬还是柔软？\n\n我会希望我的好朋友有同样的感觉吗？\n\n再去经验那个情境，看看当你在要求别人改变时，你是如何伤害着你自己。\n\n你也伤害了别人，你令他们感到难堪。然后对方开始抵抗——纵使他们知道你是对的，但为了维护自己的尊严和面子，他们必定对抗到底。要他们屈服等于是要他们当上孩子的角色，被告知你知道的比他们的多、你很清楚他们需要什么或应该怎样，自我决不容许这样的事情发生。\n\n经验告诉你，你越尝试去改变别人，别人越加反抗你，这形成了恶性循环，然后你们两个都感到更糟。', '心理改善', '王老师', '2022-03-30 20:46:05');
INSERT INTO `article` VALUES (2, '研究发现：每天刷社交媒体超3小时易抑郁', '互联网的快速发展，让人们足不出户也能快速知道周围乃至世界的消息，而这随着移动互联网的发展，现在的人们仅用一部小巧的智能手机就能做到，无论是基础的“衣食住行”，还是更进一步的线上社交，网络对人们的生活产生巨大影响的同时，也让人们产生了隐忧。\n\n尤其是现在人们热衷于的社交媒体！据美国《科技时报》报道，一项研究发现，每天浏览社交媒体平台超3小时的青少年，患焦虑和抑郁在内的心理问题的风险要比其他人高出60%。美国约翰·霍普金斯大学布隆伯格公共卫生学院的研究人员发现，每天花30分钟浏览诸如推特和Instagram之类的社交媒体，就能影响年轻网民的心理健康。\n\n01\n\n在社交媒体上花费3小时或更长时间，可能会显著增加一个人出现焦虑和抑郁等心理健康问题的风险。很多网友看到这个研究报告估计虎躯一震，因为作为“重度网瘾少年”，每天花费在社交媒体上面的时间可不止三小时，远远超过这个时间。那么这些人就是一定会患抑郁症了？其实很大一部分人抑郁的原因就是每天无所事事、焦虑，找不到踏踏实实活在现实中的感觉，所以这类人喜欢刷社交媒体，但是一刷社交媒体就更加让他们无所事事。\n\n02\n\n这项研究的参与者之一拉西姆博士说：“许多现有的研究已经发现了数字或社交媒体的使用与青少年健康之间的联系，但很少有人关注这种长期的联系。我们的研究表明，那些在社交媒体上花费大量时间的青少年更有可能在一年后出现心理问题。”\n\n与其浪费大量时间在虚拟的网络世界，还不如好好的生活在现实世界，现实世界有美丽的风景，有好吃的食物，有好喝的奶茶，吃吃喝喝玩玩，这一切都是真实的，要学会好好珍惜现在身边所拥有的一切啊！\n\n人们在活动的时候，通过各种感官认识外部世界事物，通过头脑的活动思考着事物的因果关系，并伴随着喜、怒、哀、惧等情感体验。这折射着一系列心理现象的整个过程就是心理过程。\n\n然而，拉希姆澄清说，他们的研究结果并不能证明使用社交媒体会导致心理健康问题。他们只看到了相关性。尽管如此，拉希姆认为少花点时间在社交媒体上对年轻人是有好处的。\n\n拉希姆说：“社交媒体可能会让青少年与日常生活产生隔阂，我们需要找到一个更好的方法来平衡社交媒体带来的好处和它可能带来的负面影响。”', '心理百科', '王老师', '2022-03-30 21:00:12');
INSERT INTO `article` VALUES (3, '约翰·贝曼的32条家庭教育观察与建议', '32条约翰·贝曼（John Banmen）对于家庭治疗的看法和经验，作为享誉国际的作家、心理治疗师和教育家，他对亲子家庭关系和育儿方面有着非一般的洞察力。\n\n1、叛逆其实就是一个信息\n\n它告诉你有一些东西需要改变了。这并不代表只有孩子需要去改变，有时候是整个家庭都需要做改变的。\n\n很多家庭最大的问题是，夫妻双方如果总以指责和争吵解决问题，孩子就不会有高的自尊，也不会尊重自己和别人，这种创伤可能会导致一个人一生都没有安全感和渴望爱。\n\n2、问题不是问题，问题就是解决方案。\n\n如果孩子不上学，那是他的解决方案；如果有人想自杀，那是他的解决方案；如果有人抑郁，那也是他的解决方案；问题是失去功能的解决方案！\n\n所以，聪明人，学会这个，学会问\"那真正的问题是什么？\"\n\n学习找到真正的解决方案。\n\n3、和孩子发生联结。\n\n我们现在很少能听到孩子内在的声音，大都是从外在行为上回应他们。如果我们能够听到孩子内心有什么样的感受，他们才可以和你分享他的那些感受。你不见得需要完全接受，但是你至少要能听到他的内在发出了哪些声音。\n\n图片\n\n4、父母真正要做的是接纳。\n\n不管孩子是什么样的，也不管我喜不喜欢，我都要接纳，接纳我的孩子是这个样子。就像天下雨了我不开心，可是我接纳一样。\n\n反之他只是听到了你过高的期望，感受不到你的爱，虽然你以为你爱，可是他已经绝望了。一个绝望的孩子又会怎样呢？\n\n5、我们需要先看见自己内心的美好\n\n只有这样，才可能真正看见别人的；\n\n我们要先感受到对自己的爱，之后才可以去爱别人。\n\n6、我们不再是夫妻，可是仍然是孩子最好的父母。\n\n如果父母不能有一个幸福的婚姻，可以选择健康的离婚和愉快的分手。为了孩子，我们两个不用彼此喜欢，彼此友善就好了。我们不再是夫妻，可是仍然是孩子最好的父母。很多的单亲父母，耗费了太多能量在彼此指责、彼此怨愤上，孩子在这个里面承受了大量的恐惧。\n\n7、将你自己的生命能量带出来\n\n到目前为止，我听到的是，如果一个人变得更一致性（一致地表达自己，不指责对方、不讨好对方、不与对方讲大道理、不忽视对方），百分之百，关系会改变。\n\n如果你逐渐地将你自己的生命能量带出来，那么你们的关系就会改变。但如果你把这些当成技巧，那就不会改变。\n\n8、太忙了以至于听不到孩子的声音\n\n忙碌是现在父母和孩子间存在的最大的问题。家长们大都是在外在的行为上对待孩子，却没有时间聆听孩子内在的声音，其实，不见得需要去接受他的感受，但是父母应该花时间听一听到底孩子的内在发出了哪些声音。\n\n9、什么是你最喜欢知道的事呢？\n\n我最想知道的是：什么是生命，或者是生命的意义和目的是什么。所以，你会看到，我在治疗中去发现，在哲学上去发现，在宗教上去发现，各个领域去发现。\n\n10、当你知道怎么爱自己，你就知道怎么爱我了。\n\n我知道我对你很重要，但是比这个更重要的是你有多重要，当你知道怎么爱自己，你就知道怎么爱我了。', '心理百科', '小明', '2022-03-30 21:11:11');
INSERT INTO `article` VALUES (5, '弗洛伊德：人生最重要的是工作和爱人', '西格蒙德·弗洛伊德（Sigmund Freud）：奥地利精神病医师、心理学家、精神分析学派创始人。1895年，他正式提出精神分析的概念。开创了潜意识研究的新领域，促进了动力心理学、人格心理学和变态心理学的发展，奠定了现代医学模式的新基础，为20世纪西方人文学科提供了重要理论支柱。<br/><br/>弗洛伊德经典名言<br/><br/>1.没有所谓玩笑，所有的玩笑都有认真的成分。<br/><br/>2.精神健康的人，总是努力地工作及爱人，只要能做到这两件事，其它的事就没有什么困难。<br/><br/>3.人生有两大悲剧：一个是没有得到你心爱的东西，另一个是得到了你心爱的东西。<br/><br/>人生有两大快乐：一个是没有得到你心爱的东西，于是可以寻求和创造；另一个是得到了你心爱的东西，于是可以去品味和体验。<br/><br/>4.没有口误这回事，所有的口误都是潜意识的真识的流露。当你瞧不起一个人的时候，这种轻视一定能够感觉得到，那他她就会做出某些事情来自卫。<br/><br/>5.人生就像弈棋， 一步失误， 全盘皆输，这是令人悲哀之事；而且人生还不如弈棋，不可能再来一局，也不能悔棋。<br/><br/>6.宁肯听任自己失望，也绝不乱存奢望。<br/><br/>7.对于成功的坚信不疑，常会导致真正的成功。<br/><br/>8.良心是一种内心的感觉，是对躁动于我们体内的某种异常愿望的抵制。<br/><br/>9.人的内心，既求生，也求死；我们既追逐光明，也追逐黑暗；我们既渴望爱，有时候却又近乎自毁地浪掷手中的爱。人的心中好像一直有一片荒芜的夜地，留给那个幽暗又寂寞的自我。<br/><br/>10.大多数人并不真的想要自由，因为自由包含责任，而大多数人害怕责任。', '心理百科', '小明', '2022-03-31 20:33:40');
INSERT INTO `article` VALUES (7, '测试雄安命', '你好', '朋辈互助', '王老师', '2022-04-22 21:39:04');
INSERT INTO `article` VALUES (10, '44444', '12345', '心理百科', '小明', '2022-04-23 01:23:20');

-- ----------------------------
-- Table structure for chatmassage
-- ----------------------------
DROP TABLE IF EXISTS `chatmassage`;
CREATE TABLE `chatmassage`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '聊天记录id',
  `sender` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '发送者id',
  `senderimg` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '发送者头像',
  `receiver` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '接收者id',
  `time` datetime NULL DEFAULT NULL COMMENT '发送时间',
  `msg` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '消息内容',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `sender`(`sender`) USING BTREE,
  CONSTRAINT `chatmassage_ibfk_1` FOREIGN KEY (`sender`) REFERENCES `user` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of chatmassage
-- ----------------------------

-- ----------------------------
-- Table structure for consult
-- ----------------------------
DROP TABLE IF EXISTS `consult`;
CREATE TABLE `consult`  (
  `c_id` int NOT NULL AUTO_INCREMENT COMMENT '预约id',
  `u_id` int NOT NULL COMMENT '预约者id',
  `u_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '预约者姓名',
  `u_sex` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '预约者性别',
  `u_tel` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '预约者电话',
  `u_major` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '预约者专业',
  `c_title` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '预约标题',
  `c_content` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '咨询内容',
  `c_help` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '想要得到的帮助',
  `c_time` datetime NOT NULL COMMENT '预约的时间',
  `state` int UNSIGNED NULL DEFAULT 1 COMMENT '审核状态',
  `c_teacher` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '审核老师',
  `createtime` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`c_id`) USING BTREE,
  INDEX `consult_ibfk_1`(`u_id`) USING BTREE,
  INDEX `consult_ibfk_2`(`u_name`) USING BTREE,
  INDEX `consult_ibfk_3`(`u_major`) USING BTREE,
  CONSTRAINT `consult_ibfk_1` FOREIGN KEY (`u_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `consult_ibfk_2` FOREIGN KEY (`u_name`) REFERENCES `user` (`name`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `consult_ibfk_3` FOREIGN KEY (`u_major`) REFERENCES `user` (`major`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of consult
-- ----------------------------
INSERT INTO `consult` VALUES (1, 2, '小明', '男', '123456789', '资产评估', '抑郁症', '感觉压力好大，很压抑，很想大哭一场', '跟老师沟通疏导', '2022-03-27 08:00:00', 3, '王老师', '2022-03-27 23:18:59');
INSERT INTO `consult` VALUES (2, 2, '小明', '男', '123454566', '资产评估', '狂躁症', '感觉好像打人，一点点事情就容易生气', '跟老师沟通，减轻情绪波动', '2022-03-27 18:25:00', 1, NULL, '2022-03-27 21:53:15');
INSERT INTO `consult` VALUES (3, 2, '小明', '男', '123454566', '资产评估', '自闭症', '啊啊啊啊，要自闭了，好烦', '跟老师沟通，得到开导', '2022-03-27 15:25:00', 1, NULL, '2022-03-27 21:54:39');
INSERT INTO `consult` VALUES (4, 2, '小明', '男', '45678913', '资产评估', '焦虑症', '关于大学生活，目前目标不明确，很烦', '希望老师可以指点迷津', '2022-03-27 12:00:00', 2, '王老师', '2022-03-27 23:00:25');
INSERT INTO `consult` VALUES (5, 2, '小明', '女', '1245576786', '资产评估', '过于开心', '每天傻乐傻乐的', '无需帮助', '2022-03-29 16:00:00', 2, '王老师', '2022-03-27 23:30:13');
INSERT INTO `consult` VALUES (6, 2, '小明', '男', '123', '资产评估', '测试', '测试系统', '1233', '2022-04-30 14:09:00', 2, '王老师', '2022-04-22 21:26:12');
INSERT INTO `consult` VALUES (7, 2, '小明', '男', '123', '资产评估', '测试吧', '测试', '测试', '2022-04-30 16:12:00', 2, '王老师', '2022-04-22 21:39:40');
INSERT INTO `consult` VALUES (8, 2, '小明', '男', '123456', '资产评估', '测试', '测试', '测试', '2022-04-26 13:14:00', 2, '王老师', '2022-04-22 21:47:58');
INSERT INTO `consult` VALUES (9, 2, '小明', '男', '12354', '资产评估', '测试', '测试', '测试', '2022-04-28 14:59:00', 2, '王老师', '2022-04-22 22:12:47');

-- ----------------------------
-- Table structure for notice
-- ----------------------------
DROP TABLE IF EXISTS `notice`;
CREATE TABLE `notice`  (
  `n_id` int NOT NULL AUTO_INCREMENT COMMENT '公告id',
  `title` mediumtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '公告标题',
  `content` mediumtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '公告内容',
  `createtime` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '公告发表时间',
  `major` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '发布专业',
  `classes` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '发布班级',
  `publisher` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '发布者',
  `publisher_id` int NULL DEFAULT NULL COMMENT '发布者id',
  `re_type` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '订阅者类型',
  PRIMARY KEY (`n_id`) USING BTREE,
  INDEX `notice_ibfk_1`(`major`) USING BTREE,
  INDEX `notice_ibfk_2`(`publisher_id`) USING BTREE,
  CONSTRAINT `notice_ibfk_1` FOREIGN KEY (`major`) REFERENCES `user` (`major`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `notice_ibfk_2` FOREIGN KEY (`publisher_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of notice
-- ----------------------------
INSERT INTO `notice` VALUES (1, '各班打疫苗', '由于疫情原因，各班班长组织全体同学接种第三针加强针', '2022-03-27 01:01:16', '资产评估', '一班,三班', '王老师', 3, '2');
INSERT INTO `notice` VALUES (2, '保质保量推进就业！先进单位们有诀窍！', '本次就业创业工作会议以总结2021年就业创业工作，分析目前就业工作的机遇和挑战，合力推进我校2022年就业创业工作为主要任务。校党委书记郑贤操、校长于海峰、副校长陈国栋，相关职能部门负责人、各学院党委（党总支）书记、院长、分管教学工作副院长、学生工作负责人和毕业班辅导员参加了会议。陈国栋主持会议。', '2022-03-27 01:00:52', '资产评估', '一班,二班', '王老师', 3, '2');
INSERT INTO `notice` VALUES (4, '三水校区快递申请', '三水校区西门的快递，需要同学们在奕辅导中进行外出申请后，才能出去拿', '2022-03-27 17:09:25', '资产评估', '一班', '王老师', 3, '2');
INSERT INTO `notice` VALUES (5, '非必要不离校', '同学们，由于疫情严重，非必要不要离校', '2022-04-21 17:11:10', '资产评估', '三班,一班,二班,五班,四班', '王老师', 3, '2');
INSERT INTO `notice` VALUES (6, '论文进行修改 test', '论文test', '2022-04-21 23:00:36', '资产评估', '一班,三班,二班,五班', '王老师', 3, '2');
INSERT INTO `notice` VALUES (10, '测试', '测试', '2022-04-22 22:11:53', '资产评估', '一班,三班,二班', '王老师', 3, '2');

-- ----------------------------
-- Table structure for portrayal
-- ----------------------------
DROP TABLE IF EXISTS `portrayal`;
CREATE TABLE `portrayal`  (
  `id` int NOT NULL COMMENT '问卷id',
  `userid` int NULL DEFAULT NULL COMMENT '填写者id',
  `answer` json NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of portrayal
-- ----------------------------

-- ----------------------------
-- Table structure for read
-- ----------------------------
DROP TABLE IF EXISTS `read`;
CREATE TABLE `read`  (
  `r_id` int NOT NULL AUTO_INCREMENT COMMENT '阅读记录id',
  `u_id` int NOT NULL COMMENT '阅读者id',
  `n_id` int NOT NULL COMMENT '被阅读公告id',
  `readtime` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '阅读时间',
  PRIMARY KEY (`r_id`) USING BTREE,
  INDEX `read_ibfk_1`(`u_id`) USING BTREE,
  INDEX `read_ibfk_2`(`n_id`) USING BTREE,
  CONSTRAINT `read_ibfk_1` FOREIGN KEY (`u_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `read_ibfk_2` FOREIGN KEY (`n_id`) REFERENCES `notice` (`n_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of read
-- ----------------------------
INSERT INTO `read` VALUES (11, 3, 1, '2022-03-27 22:26:56');
INSERT INTO `read` VALUES (12, 3, 2, '2022-03-27 22:26:58');
INSERT INTO `read` VALUES (13, 7, 4, '2022-04-05 01:07:23');
INSERT INTO `read` VALUES (14, 7, 1, '2022-04-05 01:07:24');
INSERT INTO `read` VALUES (15, 7, 2, '2022-04-05 01:07:29');
INSERT INTO `read` VALUES (17, 2, 1, '2022-04-18 22:16:13');
INSERT INTO `read` VALUES (18, 3, 4, '2022-04-18 22:18:15');
INSERT INTO `read` VALUES (19, 2, 5, '2022-04-18 22:19:22');
INSERT INTO `read` VALUES (20, 3, 5, '2022-04-18 22:19:31');
INSERT INTO `read` VALUES (24, 2, 10, '2022-04-22 22:12:03');

-- ----------------------------
-- Table structure for tip
-- ----------------------------
DROP TABLE IF EXISTS `tip`;
CREATE TABLE `tip`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '留言id',
  `w_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '留言者昵称',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '留言标题',
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '留言内容',
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '留言类型',
  `time` datetime NULL DEFAULT NULL COMMENT '留言时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `tip_ibfk_1`(`w_name`) USING BTREE,
  CONSTRAINT `tip_ibfk_1` FOREIGN KEY (`w_name`) REFERENCES `user` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tip
-- ----------------------------
INSERT INTO `tip` VALUES (2, '小黑老师', '今天天气真好', '哈哈哈，终于不下雨了', '开心', '2022-03-30 21:37:28');
INSERT INTO `tip` VALUES (3, '小明', '今天心情不错！！！开心子', '学校发布了清明放假通知，提倡非必要不离校；中午在三饭蜜雪冰城买了奶茶，开心！！', '开心', '2022-03-31 19:37:04');
INSERT INTO `tip` VALUES (4, '小明', '下雨了，好冷', '这两天突然转凉，好烦，又下雨，衣服要不干了', '悲伤', '2022-04-18 22:15:51');
INSERT INTO `tip` VALUES (6, '王老师', 'happy', '搞定所有工作了', '开心', '2022-04-19 20:13:11');
INSERT INTO `tip` VALUES (9, '王老师', '测试小问题', '测试', '开心', '2022-04-22 21:45:56');
INSERT INTO `tip` VALUES (10, '王老师', '测试', '测试', '开心', '2022-04-22 22:11:33');
INSERT INTO `tip` VALUES (11, '小明', '是大多数', '三大', '开心', '2022-04-23 01:19:01');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `token` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '加密认证',
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '用户学号，教师号',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '密码',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '用户姓名',
  `head` mediumtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL COMMENT '用户头像',
  `mailbox` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '用户邮箱',
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '用户所在地',
  `sex` enum('男','女') CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '用户性别',
  `createtime` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modifytime` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后一次修改时间',
  `major` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '专业',
  `class` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '班级',
  `type` int NOT NULL COMMENT '类型：1管理员，2学生，3老师',
  `tag` json NULL COMMENT '学生标签',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `name`(`name`) USING BTREE,
  INDEX `major`(`major`) USING BTREE,
  INDEX `username`(`username`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci COMMENT = '\r\n' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (0, NULL, '18251106144', '20000508', 'LJH', '1.jpg', NULL, '广东广州', NULL, '2022-03-03 19:51:28', '2022-03-03 19:51:28', NULL, NULL, 1, NULL);
INSERT INTO `user` VALUES (1, NULL, '1', '1', '管理员1', '2.jpeg', NULL, '广东广州', NULL, '2022-03-05 16:47:41', '2022-03-05 16:47:41', '计算机', '实验班', 1, NULL);
INSERT INTO `user` VALUES (2, NULL, '2', '2', '小明', '3.jpg', NULL, '广东广州', '男', '2022-03-05 16:48:06', '2022-03-26 21:01:46', '资产评估', '一班', 2, NULL);
INSERT INTO `user` VALUES (3, NULL, '3', '3', '王老师', '4.jpg', NULL, '广东深圳', '男', '2022-03-05 16:48:19', '2022-03-14 19:43:32', '资产评估', '三班', 3, NULL);
INSERT INTO `user` VALUES (5, NULL, '456474', '456', '小丽名', NULL, NULL, '广东佛山', '女', '2022-03-06 00:02:57', '2022-03-26 21:02:32', '资产评估', '三班', 2, NULL);
INSERT INTO `user` VALUES (7, NULL, '156', '4561', '小红帽', NULL, NULL, '上海浦东', '女', '2022-03-06 00:03:52', '2022-03-26 21:02:07', '资产评估', '一班', 2, NULL);
INSERT INTO `user` VALUES (8, NULL, '454789313', 'hjgk', 'noimi', NULL, NULL, '北京', '女', '2022-03-06 00:04:20', '2022-03-26 21:03:35', '资产评估', '二班', 2, NULL);
INSERT INTO `user` VALUES (9, NULL, '19250023154', 'vhjj', '洪老师', NULL, NULL, '山东', '女', '2022-03-06 00:04:51', '2022-03-14 19:55:20', '金融', '一班', 3, NULL);
INSERT INTO `user` VALUES (10, NULL, '1545613', '84685132', '小王', NULL, NULL, '西安', '男', '2022-03-06 00:05:11', '2022-03-26 21:02:51', '资产评估', '一班', 2, NULL);
INSERT INTO `user` VALUES (11, NULL, '48675165', '13465', '肖利浦', NULL, NULL, '广东顺德', '男', '2022-03-06 00:05:53', '2022-03-26 21:03:10', '资产评估', '二班', 2, NULL);
INSERT INTO `user` VALUES (14, NULL, '19250349566', '12345', '第三方', NULL, NULL, '广东云浮', '女', '2022-03-12 11:01:31', '2022-03-12 11:01:31', '计算机', '一班', 2, NULL);
INSERT INTO `user` VALUES (15, NULL, '19250349567', '475', '断方式', NULL, NULL, '广东中山', '男', '2022-03-12 11:01:31', '2022-04-05 00:38:53', '资产评估', '三班', 2, NULL);
INSERT INTO `user` VALUES (16, NULL, '19250349568', '1231', '李老师', NULL, NULL, '广东深圳', '女', '2022-03-12 11:01:31', '2022-04-05 00:38:56', '资产评估', '四班', 3, NULL);
INSERT INTO `user` VALUES (17, NULL, '19250349569', '465154', '郑老师', NULL, NULL, '广西南宁', '男', '2022-03-12 11:01:31', '2022-04-05 00:38:58', '资产评估', '实验班', 3, NULL);
INSERT INTO `user` VALUES (18, NULL, '19250349570', '131', '热热', NULL, NULL, '广西桂林', '女', '2022-03-12 11:01:31', '2022-04-05 00:39:00', '资产评估', '五班', 2, NULL);
INSERT INTO `user` VALUES (19, NULL, '19250349571', '5641314', '高点给', NULL, NULL, '上海浦东', '男', '2022-03-12 11:01:31', '2022-04-05 00:39:03', '资产评估', '二班', 2, NULL);
INSERT INTO `user` VALUES (20, NULL, '19250349572', '6443', '韩老师', NULL, NULL, '中国台湾', '女', '2022-03-12 11:01:31', '2022-03-12 11:01:31', '金融学', '一班', 3, NULL);
INSERT INTO `user` VALUES (21, NULL, '19250349573', '14646132', '辉老师', NULL, NULL, '中国香港', '男', '2022-03-12 11:01:31', '2022-03-12 11:01:31', '金融学', '三班', 3, NULL);
INSERT INTO `user` VALUES (22, NULL, '19250349574', '46451', '尔特', NULL, NULL, '云南大理', '女', '2022-03-12 11:01:31', '2022-04-05 00:39:13', '资产评估', '四班', 2, NULL);
INSERT INTO `user` VALUES (23, NULL, '19250349575', '411231', '热帖', NULL, NULL, '新疆吐鲁番', '男', '2022-03-12 11:01:31', '2022-03-12 11:01:31', '金融学', '实验班', 2, NULL);
INSERT INTO `user` VALUES (24, NULL, '19250349576', '485453', 'i老师', NULL, NULL, '四川成都', '女', '2022-03-12 11:01:31', '2022-03-12 11:01:31', '金融学', '五班', 3, NULL);
INSERT INTO `user` VALUES (25, NULL, '19250349577', '45613132', 'a老师', NULL, NULL, '黑龙江', '男', '2022-03-12 11:01:31', '2022-03-12 11:01:31', '金融学', '二班', 3, NULL);
INSERT INTO `user` VALUES (26, NULL, '19250349578', '4641312', '规划局', NULL, NULL, '哈尔滨', '女', '2022-03-12 11:01:31', '2022-04-05 00:39:20', '资产评估', '一班', 2, NULL);
INSERT INTO `user` VALUES (27, NULL, '19250349579', '46453146', '热帖热帖', NULL, NULL, '广东肇庆', '男', '2022-03-12 11:01:31', '2022-04-05 00:39:24', '资产评估', '三班', 2, NULL);
INSERT INTO `user` VALUES (29, NULL, '19250349581', '31313', '刘老师', NULL, NULL, '广东河源', '男', '2022-03-12 11:01:31', '2022-03-12 11:01:31', '会计学', '实验班', 3, NULL);
INSERT INTO `user` VALUES (31, NULL, '19250349583', '1315648', '合同附图', NULL, NULL, '广东河源', '男', '2022-03-12 11:01:31', '2022-04-05 00:39:32', '资产评估', '二班', 2, NULL);
INSERT INTO `user` VALUES (32, NULL, '19250349584', '413132', '曾老师', NULL, NULL, '广东梅州', '女', '2022-03-12 11:01:31', '2022-03-12 11:01:31', '会计学', '一班', 3, NULL);
INSERT INTO `user` VALUES (33, NULL, '19250349585', '45613215', '山老师', NULL, NULL, '广东汕头', '男', '2022-03-12 11:01:31', '2022-03-12 11:01:31', '法学', '三班', 3, NULL);
INSERT INTO `user` VALUES (34, NULL, '19250349586', '4543168', '数方式', NULL, NULL, '广东云浮', '女', '2022-03-12 11:01:31', '2022-03-12 11:01:31', '法学', '四班', 2, NULL);
INSERT INTO `user` VALUES (35, NULL, '19250349587', '454133', 'vbx', NULL, NULL, '广东河源', '男', '2022-03-12 11:01:31', '2022-03-12 11:01:31', '法学', '实验班', 2, NULL);
INSERT INTO `user` VALUES (36, NULL, '19250349588', '45643132', '但老师', NULL, NULL, '广东惠州', '女', '2022-03-12 11:01:31', '2022-03-12 11:01:31', '法学', '五班', 3, NULL);
INSERT INTO `user` VALUES (37, NULL, '19250349589', '448', '小王老师', NULL, NULL, '广东广州', '男', '2022-03-12 11:01:31', '2022-03-12 11:01:31', '法学', '二班', 3, NULL);
INSERT INTO `user` VALUES (38, NULL, '19250349590', '454', '小程序', NULL, NULL, '广东广州', '女', '2022-03-12 11:01:31', '2022-04-05 00:39:38', '资产评估', '一班', 2, NULL);
INSERT INTO `user` VALUES (39, NULL, '19250349591', '3134', '繁华过后', NULL, NULL, '广东佛山', '男', '2022-03-12 11:01:31', '2022-03-12 11:01:31', '法学', '三班', 2, NULL);
INSERT INTO `user` VALUES (68, NULL, '12456789', '12345678', '家教老师', NULL, NULL, '外星', '男', '2022-03-14 20:38:44', '2022-03-06 00:04:51', '金融', '一班', 3, NULL);
INSERT INTO `user` VALUES (70, NULL, '192546445', '12345678', '小王子', NULL, NULL, '外太空', '男', '2022-03-14 21:00:12', '2022-03-14 21:00:12', '航空', '航天班', 3, NULL);
INSERT INTO `user` VALUES (71, NULL, '19250306478', '12345678', '光老师', NULL, NULL, '上海浦东', '女', '2022-03-15 00:02:06', '2022-03-15 00:02:06', '计算机', '六班', 3, NULL);
INSERT INTO `user` VALUES (72, NULL, '25', '12345678', '250', NULL, NULL, '广州佛山', '男', '2022-03-26 21:04:39', '2022-03-26 21:04:39', '资产评估', '一班', 2, NULL);
INSERT INTO `user` VALUES (73, NULL, '4', '4', '小黑老师', '2.jpeg', NULL, '广东深圳', '男', '2022-03-30 19:08:42', '2022-04-11 18:58:23', '资产评估', NULL, 3, NULL);
INSERT INTO `user` VALUES (74, NULL, '5', '5', '迪丽热巴', '4.jpg', NULL, '广东佛山', '女', '2022-03-30 19:13:26', '2022-04-22 21:52:19', '资产评估', '三班', 2, NULL);

SET FOREIGN_KEY_CHECKS = 1;
