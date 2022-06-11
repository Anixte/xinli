module.exports = function (io) {
  var socketList = {};
  var users = [{ name: "校园群聊", avatar: "http://localhost:3000/file/1.jpg" }];
  io.on("connection", function (socket) {
    console.log("用户连接成功");

    /* 监听用户登录事件,并将数据放到socket实例的属性上 */
    socket.on("login", (data) => {
      /* 遍历服务器连接对象 */
      var islogin = true;
      users.forEach((iss) => {
        if (iss.name == data.name) {
          islogin = false;
        }
      });
      if (islogin) {
        console.log("用户登录成功：", data);
        users.push(data);
        socket.name = data.name;
        io.emit("loginList", users);
        console.log(users);
      } else {
        console.log("用户登录失败！：", data);
      }
    });
    // 用户断开
    socket.on("disconnect", () => {
      console.log("用户断开");

      let index = users.findIndex((i) => i.name == socket.name);
      console.log(index);
      if (index != -1) {
        users.splice(index, 1);
        io.emit("loginList", users);
        console.log(users);
      }
    });
    /* 监听群聊事件 */
    socket.on("groupChat", (data) => {
      // 发送给所有客户端，除了发送者
      /* 修改源数据的属性 */
      console.log(data.sender, data);
      data.type = "user";
      socket.broadcast.emit("updateChatMessageList", data);
    });
    /* 监听私聊事件 */
    socket.on("privateChat", (data) => {
      /* 找到对应的私聊对象 */
      console.log(data.sender, data);
      io.sockets.sockets.forEach((iss) => {
        if (iss.name == data.receiver) {
          data.type = "user";
          io.to(iss.id).emit("updateChatMessageList", data);
        }
      });
    });
  });
};
