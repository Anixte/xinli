<template>
  <v-container>
    <v-app-bar
      color="white"
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
    >
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <v-toolbar-title>{{ this.$store.state.userInfo.name }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <v-divider></v-divider>
    <chat-msg class="box"></chat-msg>
    <v-footer padless class="mt-5">
      <v-row cols="12">
        <v-text-field
          label="Input"
          solo
          dense
          rounded
          v-model="msg"
        ></v-text-field>
        <v-btn small @click="send">发送</v-btn>
      </v-row>
    </v-footer>
  </v-container>
</template>

<script>
import chatMsg from "@/components/chat/chatMsg.vue";

export default {
  components: { chatMsg },
  name: "chatMain",
  data() {
    return {
      msg: "",
    };
  },
  methods: {
    send() {
      var time = new Date();
      /* 发送消息 */
      /* 先判断是群聊还是私聊 */
      if (this.$store.state.chatType == "group") {
        let data = {
          type: "my",
          sender: this.myInfo.name, //发送者id
          senderimg: this.myInfo.avatar, //发送者的img
          receiver: "校园群聊", //接收方id
          time: time.toLocaleString(), //发送时间
          msg: this.msg, //消息内容
        };
        this.$socket.emit("groupChat", data);
        console.log("发送群聊信息");
        /* 自己的信息直接push到数组中 */
        this.$store.commit("SOCKET_updateChatMessageList", data);
      } else {
        let data = {
          type: "my",
          sender: this.myInfo.name, //发送者id
          senderimg: this.myInfo.avatar, //发送者的img
          receiver: this.userInfo.name, //接收方id
          time: time.toLocaleString(), //发送时间
          msg: this.msg, //消息内容
        };
        this.$socket.emit("privateChat", data);
        console.log("发送信息给：", this.userInfo.name);
        /* 自己的信息直接push到数组中 */
        this.$store.commit("SOCKET_updateChatMessageList", data);
      }
      /* 清空输入框 */
      this.msg = "";
    },
  },
  computed: {
    chatType() {
      return this.$store.state.chatType;
    },
    myInfo() {
      return this.$store.state.myInfo;
    },
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
};
</script>

<style scoped>
.box {
  height: 456px;
}
</style>
