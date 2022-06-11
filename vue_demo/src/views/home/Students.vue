<template>
  <v-app id="inspire">
    <template>
      <div class="text-center">
        <v-dialog v-model="tag" width="1000" persistent>
          <v-card>
            <v-card-title class="text-h5 teal lighten-2">
              学生评测（首次登录）
            </v-card-title>
            <v-card-text class="pt-8 font-weight-black text-h5"
              >请凭你的直觉如实地回答下列问题，各题为单选，选择一个符合你情况的选项:</v-card-text
            >
            <v-container>
              <v-row>
                <v-col v-for="(item, index) in question" :key="index" cols="12">
                  <v-card-text class="pa-0 font-weight-black text-h6">{{
                    item.text
                  }}</v-card-text>
                  <v-radio-group row v-model="radio[index]">
                    <v-radio
                      v-for="(n, index) in item.answer"
                      :key="index"
                      :label="n"
                      :value="index"
                    >
                    </v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
            </v-container>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="choose"> 完成，提交 </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </template>
    <v-system-bar app>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" persistent max-width="290">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="teal " x-small dark v-bind="attrs" v-on="on">
            退出登录
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="text-h5"> 退出登录?</v-card-title>
          <v-card-text>是否确定要退出登录，并清除浏览器的用户信息</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">
              No
            </v-btn>
            <v-btn color="success" text @click="loginOut"> Yes </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-system-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-sheet color="grey lighten-4" class="pa-4">
        <v-avatar class="mb-4 ml-12" color="grey darken-1" size="64">
          <img :src="this.avatar ? this.avatar : '@/assets/logo.png'" alt="" />
        </v-avatar>
        <div class="ml-12 pl-2">{{ this.username }}</div>
        <div class="ml-12 pl-2">{{ this.type }}</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-treeview
        :active.sync="active"
        activatable
        color="teal"
        :items="items"
        item-key="id"
        hoverable
        open-on-click
        rounded
        return-object
        @update:active="handleClick"
      ></v-treeview>
    </v-navigation-drawer>

    <v-main class="pa-0">
      <v-container class="py-8 px-6" fluid>
        <!-- <img src="../../assets/backgroud.jpg" alt="" srcset="" class="abb" /> -->
        <router-view></router-view>
      </v-container>
      <v-footer padless>
        <v-col class="indigo lighten-1 white--text text-center" cols="12">
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-col>
      </v-footer>
    </v-main>
  </v-app>
</template>

<script>
import router from "@/router";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Students",
  data: () => ({
    dialog: false,
    active: [],
    items: [
      {
        id: 1,
        name: "首页",
        path: "/student/home",
      },
      {
        id: 2,
        name: "我的公告",
        path: "/student/notice",
      },
      {
        id: 3,
        name: "心理文章",
        path: "/student/article",
      },
      {
        id: 4,
        name: "咨询预约",
        path: "/student/applyfor",
      },
      {
        id: 5,
        name: "线上聊天",
        path: "/student/myChat",
      },
    ],
    drawer: null,
    selectedItem: 1,
    avatar: "",
    username: "",
    type: "",
    radio: [],
    question: [
      {
        text: "1、你什么时候感觉最好：",
        answer: ["早餐", "下午及傍晚", "夜里"],
      },
      {
        text: "2、你怎样走路：",
        answer: [
          "大步快走",
          "小步快走",
          "不快，仰着头面对着世界",
          "不快，低着头",
          "很慢",
        ],
      },
      {
        text: "3、与人交流时，你一般会：",
        answer: [
          "手臂交叠地站着",
          "双手紧握着",
          "一只手或两手放在臀部",
          "碰着或推着与你说话的人",
          "碰着你的耳朵、摸着你的下巴或用手整理头发",
        ],
      },
      {
        text: "4、坐下来时，你习惯于",
        answer: ["两膝盖并拢", "两腿交叉", "双腿伸直", "一腿蜷在身下"],
      },
      {
        text: "5、你一般怎样笑：",
        answer: ["敞怀大笑", "笑，但不大声", "轻声地、咯咯地笑", "羞怯地微笑"],
      },
      {
        text: "6、当你去参加一个活动时，你会：",
        answer: [
          "很大声地入场以引起他人的注意",
          "安静地入场，找你认识的人",
          "非常安静地入场，尽量保持不被他人注意",
        ],
      },
      {
        text: "7、当你正在非常专注地工作时，有人打断你，你会：",
        answer: ["欢迎他", "感到非常恼怒", "在上两大极端之间"],
      },
      {
        text: "8、下列颜色中，你最喜欢哪一种颜色：",
        answer: [
          "红或橘色",
          "黑色",
          "黄或浅蓝色",
          "绿色",
          "深蓝或紫色",
          "白色",
          "棕色或灰色",
        ],
      },
      {
        text: "9、临入睡的前几分钟，你在床上的姿势是：",
        answer: [
          "仰躺，伸直",
          "俯躺，伸直",
          "侧躺，微蜷",
          "头谁在一手臂上",
          "被盖过头",
        ],
      },
      {
        text: "10、你经常会做的梦是：",
        answer: [
          "从高处落下",
          "与别人打架或争执",
          "找东西或找人",
          "在天上飞或在水里漂浮",
          "平常不做梦",
          "梦都是愉快的",
        ],
      },
    ],
  }),

  computed: {
    tag() {
      let ag =
        JSON.parse(window.sessionStorage.getItem("userData")).tag == null;
      if (ag == null) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    handleClick(items) {
      let path = items[0].path;
      router.push(path);
      // console.log(path);
    },
    loginOut() {
      this.dialog = false;
      sessionStorage.clear();
      this.$message.success("退出登录");
      router.push("/");
    },
    choose() {
      var arr = JSON.parse(JSON.stringify(this.radio));

      console.log(arr);
    },
  },
  created() {
    this.$commonAxios({
      url: "/users/getUserDataByToken",
      method: "get",
      data: {},
      success: (res) => {
        this.type = "Student";
        this.username = res.name;
        this.avatar = this.basePath + "/file/" + res.head;
      },
    });
  },
};
</script>

<style lang="less" scoped>
#inspire {
  margin: 0.2133rem;
}

.abb {
  position: absolute;
  z-index: 10000;
  left: 50%;
  top: 12%;
  width: 30.6667rem;
  opacity: 0.05;
  transform: translateX(-70%);
}
</style>
