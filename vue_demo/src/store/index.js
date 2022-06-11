import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    myInfo: {},
    userInfo: {},
    isLogin: false,
    userList: [],
    chatType: "",
    /* 聊天记录 */
    chatMessageList: [],
  },
  getters: {},
  mutations: {
    setMyInfo(state, data) {
      state.myInfo = data;
      state.isLogin = true;
    },
    setUserInfo(state, data) {
      state.userInfo = data;
    },
    /* 渲染用户列表 */
    SOCKET_loginList(state, data) {
      state.userList = data;
      console.log("vuex：", state.userList);
    },
    changeChatType(state, data) {
      state.chatType = data;
    },
    /* 聊天记录的修改,这里我们使用vuex监听 */
    SOCKET_updateChatMessageList(state, data) {
      state.chatMessageList.push(data);
      console.log(data);
    },
  },
  actions: {},
  modules: {},
});
