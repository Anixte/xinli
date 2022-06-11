<template>
  <v-app>
    <v-main class="pa-0">
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <v-card class="">
              <!-- <v-subheader>Today</v-subheader> -->
              <v-row no-gutters>
                <v-col cols="12" sm="8">
                  <v-card class="mx-auto">
                    <v-toolbar color="teal" dark>
                      <v-toolbar-title>留言树洞</v-toolbar-title>

                      <v-spacer></v-spacer>
                      <v-dialog v-model="dialog" persistent max-width="600px">
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon v-bind="attrs" v-on="on">mdi-pencil </v-icon>
                        </template>
                        <v-card>
                          <v-card-title>
                            <span class="text-h5">今日心情如何呀？</span>
                          </v-card-title>
                          <v-card-text>
                            <v-container>
                              <v-row>
                                <v-col cols="12">
                                  <v-text-field
                                    label="今日趣闻"
                                    v-model="tip.title"
                                    required
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                  <v-text-field
                                    label="用一两句话去说说"
                                    required
                                    v-model="tip.content"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                  <v-select
                                    :items="moon"
                                    label="心情"
                                    required
                                    @change="changeType($event)"
                                  ></v-select>
                                </v-col>
                              </v-row>
                            </v-container>
                            <!-- <small>*indicates required field</small> -->
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="blue darken-1"
                              text
                              @click="dialog = false"
                            >
                              Close
                            </v-btn>
                            <v-btn color="blue darken-1" text @click="addTip">
                              Save
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-toolbar>

                    <v-list three-line>
                      <template v-for="(item, index) in items">
                        <v-subheader
                          v-if="item.header"
                          :key="item.header"
                          v-text="item.header"
                        ></v-subheader>

                        <v-divider
                          v-else-if="item.divider"
                          :key="index"
                          :inset="item.inset"
                        ></v-divider>

                        <v-list-item v-else :key="item.title">
                          <v-list-item-avatar>
                            <v-img :src="item.avatar"></v-img>
                          </v-list-item-avatar>

                          <v-list-item-content>
                            <v-list-item-title v-html="item.title">
                            </v-list-item-title>
                            <v-list-item-title
                              v-html="item.time"
                              class="font-italic text--secondary text-right caption"
                            >
                            </v-list-item-title>
                            <v-list-item-subtitle
                              v-html="item.content"
                            ></v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </template>
                    </v-list>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-card class="mx-auto" max-width="350">
                    <v-list-item two-line>
                      <v-list-item-content>
                        <v-list-item-title class="text-h5">
                          {{ this.address }}
                        </v-list-item-title>
                        <v-list-item-subtitle
                          >{{ this.today.date }}, {{ this.showTime }}, Mostly
                          sunny</v-list-item-subtitle
                        >
                      </v-list-item-content>
                    </v-list-item>

                    <v-card-text>
                      <v-row align="center">
                        <v-col class="text-h2" cols="6"> 23&deg;C </v-col>
                        <v-col cols="6">
                          <v-img
                            src="https://cdn.vuetifyjs.com/images/cards/sun.png"
                            alt="Sunny image"
                            width="92"
                          ></v-img>
                        </v-col>
                      </v-row>
                    </v-card-text>

                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>mdi-send</v-icon>
                      </v-list-item-icon>
                      <v-list-item-subtitle>23 km/h</v-list-item-subtitle>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>mdi-cloud-download</v-icon>
                      </v-list-item-icon>
                      <v-list-item-subtitle>48%</v-list-item-subtitle>
                    </v-list-item>

                    <v-list class="transparent">
                      <v-list-item
                        v-for="item in forecast.slice(1, 5)"
                        :key="item.day"
                      >
                        <v-list-item-title>{{ item.day }}</v-list-item-title>

                        <v-list-item-icon>
                          <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>

                        <v-list-item-subtitle class="text-right">
                          {{ item.temp }}
                        </v-list-item-subtitle>
                      </v-list-item>
                    </v-list>

                    <v-divider></v-divider> </v-card
                ></v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { weekDay, weaIcon, shortWeekDay } from "@/utils/tools";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Main",
  data() {
    return {
      id: 0,
      address: JSON.parse(
        window.sessionStorage.getItem("userData")
      ).address.slice(-2),
      time: 0,
      showTime: "",
      forecast: [],
      today: {
        date: "",
        temp: "",
        icon: "",
        wind: "",
      },
      avatar: [],
      items: [{ header: "Today" }],
      dialog: false,
      moon: ["开心", "悲伤", "无聊", "生气", "学习"],
      tip: {
        w_id: JSON.parse(window.sessionStorage.getItem("userData")).name,
        title: "",
        content: "",
        moomtype: "",
        time: "",
      },
    };
  },
  props: {},
  methods: {
    // 获取用户地址
    getUserAddress() {
      this.$Axios({
        url: "/admin/getUserInfo",
        method: "get",
        data: {
          id: JSON.parse(window.sessionStorage.getItem("socketData")).id,
        },
        success: (res) => {
          // console.log(res[0]);
          this.address = res[0].address.slice(-2);
          this.getWeather(this.address);
        },
      });
    },
    // 获取天气情况
    getWeather() {
      this.$Axios({
        url: "https://bird.ioliu.cn/weather",
        method: "get",
        data: {
          city: JSON.parse(
            window.sessionStorage.getItem("userData")
          ).address.slice(-2),
          // city: "海珠",
        },
        success: (res) => {
          // console.log(res);
          this.today.date = shortWeekDay(res.daily_forecast[0].date);
          for (let i = 0; i < res.daily_forecast.length; i++) {
            this.forecast.push({
              day: weekDay(res.daily_forecast[i].date),
              icon: weaIcon(res.daily_forecast[i].cond.txt_d),
              temp:
                res.daily_forecast[i].tmp.max +
                "\xB0/" +
                res.daily_forecast[i].tmp.min +
                "\xB0",
            });
          }
          // console.log(this.forecast);
        },
      });
    },
    // 获取实时时间
    getTime() {
      Date.prototype.Format = function (fmt) {
        let o = {
          "M+": this.getMonth() + 1, //月份
          "d+": this.getDate(), //日
          "h+": this.getHours(), //小时
          "m+": this.getMinutes(), //分
          "s+": this.getSeconds(), //秒
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度
          S: this.getMilliseconds(), //毫秒
        };
        if (/(y+)/.test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
          );
        for (let k in o)
          if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(
              RegExp.$1,
              RegExp.$1.length == 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length)
            );
        return fmt;
      };

      //显示格式为 14：00：00 ，想显示全的话为 new Date().Format("yyyy-MM-dd hh:mm:ss");
      let timer = new Date().Format("hh:mm:ss");
      this.showTime = timer;
    },
    timer() {
      setInterval(this.getTime, 500);
    },
    // 获取所有的留言
    getTip() {
      this.$Axios({
        url: "/upload/getalltip",
        method: "get",
        data: {
          currPage: 0,
          pageNum: 6,
        },
        success: (res) => {
          console.log(res);
          for (var i = 0; i < res.data.length; i++) {
            this.items.push({ divider: true, inset: true });
            this.items.push({
              avatar: `https://cdn.vuetifyjs.com/images/lists/${i + 1}.jpg`,
              title: res.data[i].title,
              content: `<span class="text--primary">${res.data[i].w_name}</span> &mdash; ${res.data[i].content}`,
              time: res.data[i].time,
            });
          }
        },
      });
    },
    // 发表留言
    addTip() {
      // console.log(this.tip);
      if (
        this.tip.content == "" ||
        this.tip.title == "" ||
        this.tip.moomtype == ""
      ) {
        this.$message.warning("请输入完整信息");
      } else {
        this.$Axios({
          url: "/upload/leavemessage",
          method: "post",
          data: {
            id: this.tip.w_id,
            title: this.tip.title,
            content: this.tip.content,
            type: this.tip.moomtype,
          },
          success: (res) => {
            console.log(res);
            this.items = [{ header: "Today" }];
            this.getTip();
            this.$message.success("留言成功");
          },
        });
        this.dialog = false;
      }
    },

    changeType(item) {
      this.tip.moomtype = item;
    },
  },
  created() {
    this.timer();
    // this.getWeather();
    this.getTip();
  },
  watch: {
    forecast() {
      if (this.forecast == []) {
        this.getUserAddress();
      }
    },
  },
};
</script>

<style></style>
