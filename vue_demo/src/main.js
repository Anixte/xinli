import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import ElementUi from "element-ui";
import { Message, Avatar } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUi);
Vue.use(Avatar);

import VueSocketIO from "vue-socket.io";
import SocketIO from "socket.io-client";
Vue.use(
  new VueSocketIO({
    debug: false,
    connection: SocketIO.connect("http://localhost:5200/", {
      transports: ["websocket"],
      options: {
        autoConnect: false,
      },
    }),
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_",
    },
  })
);
(Vue.prototype.socketpath = "http://localhost:5200"),
  (Vue.prototype.basePath = "http://localhost:3000");

import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";

/**
 * //封装axios方法,为不需要登录操作时使用
 * @param options 配置
 */
let Axios = (options) => {
  axios({
    url: options.url,
    method: options.method || "POST",
    data: options.data,
    params: options.data,
  })
    .then((result) => {
      if (options.success) options.success(result.data);
    })
    .catch((err) => {
      let msg = err.response ? err.response.data : "请求异常";
      if (options.error) {
        options.error(msg);
        Message.error({ message: msg, offset: 150 });
      } else {
        Message.error({ message: msg, offset: 150 });
      }
    });
};

let commonAxios = (options) => {
  options.data.token = window.sessionStorage.token;
  axios({
    url: options.url,
    method: options.method || "POST",
    data: options.data,
    params: options.data,
  })
    .then((result) => {
      if (options.success) options.success(result.data);
    })
    .catch((err) => {
      let msg = err.response ? err.response.data : "请求异常";
      if (options.error) {
        options.error(msg);
        Message.error({ message: msg, offset: 150 });
      } else {
        Message.error({ message: msg, offset: 150 });
      }
    });
};

Vue.prototype.$Axios = Axios;
Vue.prototype.$commonAxios = commonAxios;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
