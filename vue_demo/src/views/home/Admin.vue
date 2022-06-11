<template>
  <v-app id="inspire">
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
        <v-avatar class="mb-4 ml-12" color="grey darken-1" size="64"
          ><img :src="this.avatar" alt=""
        /></v-avatar>

        <div class="ml-12 pl-2">{{ this.username }}</div>
        <div class="ml-12 pl-2 mt-2">{{ this.type }}</div>
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
import router from "@/router/index";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Admin",
  data: () => ({
    dialog: false,
    active: [],
    items: [
      {
        id: 1,
        name: "首页",
        path: "/admin/home",
      },
      {
        id: 2,
        name: "广场留言",
        path: "/admin/squareAdmin",
      },
      {
        id: 3,
        name: "公告管理",
        path: "/admin/noticeAdmin",
      },
      {
        id: 4,
        name: "文章管理",
        path: "/admin/articleAdmin",
      },
      {
        id: 5,
        name: "用户管理",
        children: [
          {
            id: 6,
            name: "教师管理",
            path: "/admin/teacherAdmin",
          },
          {
            id: 7,
            name: "学生管理",
            path: "/admin/studentAdmin",
          },
        ],
      },
    ],
    drawer: null,
    avatar: "",
    username: "",
    type: "",
  }),
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
  },

  created() {
    /**
     *
     *
     */
    this.$commonAxios({
      url: "/users/getUserDataByToken",
      method: "get",
      data: {},
      success: (res) => {
        this.type = "Admin";
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
