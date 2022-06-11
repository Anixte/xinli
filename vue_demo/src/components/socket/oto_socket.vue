<template>
  <v-card>
    <v-row no-gutters>
      <v-col cols="3"><chat-aside></chat-aside></v-col>
      <v-col cols="9"><chat-main></chat-main></v-col>
    </v-row>
  </v-card>
</template>

<script>
import chatAside from "@/components/chat/aside.vue";
import chatMain from "@/components/chat/chatMain.vue";
export default {
  name: "HelloWorld",
  components: {
    chatAside,
    chatMain,
  },
  data() {
    return {
      userid: JSON.parse(window.sessionStorage.getItem("socketData")).id,
      avatar: JSON.parse(window.sessionStorage.getItem("socketData")).img,
      username: JSON.parse(window.sessionStorage.getItem("socketData")).name,
    };
  },
  methods: {
    login() {
      if (this.username) {
        // /* 告诉vuex修改个人信息 */
        this.$store.commit("setMyInfo", {
          id: this.userid,
          avatar: this.basePath + "/file/" + this.avatar,
          name: this.username,
        });
        /* 连接socket */
        this.$socket.connect();
        this.$socket.emit("login", {
          name: this.username,
          id: this.userid,
          avatar: this.basePath + "/file/" + this.avatar,
        });
      }
    },
  },
  sockets: {
    disconnect() {
      console.log("socket 断开");
    },
    connect_failed() {
      console.log("连接失败");
    },
    connect() {
      console.log("连接成功");
    },
  },
  /**
   * 加载组件执行
   * 是数据挂载后的生命周期函数
   */
  mounted() {
    this.login();
  },
  /**
   * 关闭组件执行
   * 实例销毁后
   */
  destroyed() {
    this.$socket.close();
  },
};
</script>
