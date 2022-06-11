<template>
  <v-app>
    <v-main class="pa-0">
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <v-card class="">
              <!-- <v-subheader>Today</v-subheader> -->
              <v-row no-gutters>
                <v-col cols="12">
                  <v-card class="mx-auto">
                    <v-toolbar color="teal" dark>
                      <v-toolbar-title>发布公告</v-toolbar-title>

                      <v-spacer></v-spacer>
                      <v-dialog v-model="dialog" persistent max-width="600px">
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon v-bind="attrs" v-on="on">mdi-pencil </v-icon>
                        </template>
                        <v-card>
                          <v-card-title>
                            <span class="text-h5">编辑公告</span>
                          </v-card-title>
                          <v-card-text>
                            <v-container>
                              <v-row>
                                <v-col cols="12">
                                  <v-text-field
                                    label="公告标题"
                                    v-model="notice.title"
                                    required
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                  <v-textarea
                                    name="input-7-1"
                                    filled
                                    label="文章内容"
                                    auto-grow
                                    v-model="notice.content"
                                    clearable
                                    clear-icon="mdi-close-circle"
                                    counter
                                  ></v-textarea>
                                </v-col>
                                <v-col cols="12" sm="6">
                                  <v-select
                                    v-model="e7"
                                    :items="classSelect"
                                    label="班级"
                                    multiple
                                    chips
                                    hint="选择发送的班级"
                                    persistent-hint
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
                            <v-btn
                              color="blue darken-1"
                              text
                              @click="addNotice"
                            >
                              send
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-toolbar>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col cols="12">
            <!-- <v-card> <v-subheader>Yesterday</v-subheader></v-card> -->
            <v-card class="mx-auto">
              <v-toolbar color="teal" dark>
                <v-toolbar-title>已发布公告</v-toolbar-title>

                <v-spacer></v-spacer>
                <v-app-bar-nav-icon></v-app-bar-nav-icon>
              </v-toolbar>
              <v-expansion-panels>
                <v-expansion-panel
                  v-for="(item, index) in this.myNotice"
                  :key="index"
                >
                  <v-expansion-panel-header v-slot="{ open }">
                    <v-row no-gutters>
                      <v-col cols="4"> {{ item.title }} </v-col>
                      <v-col cols="8" class="text--secondary">
                        <v-fade-transition leave-absolute>
                          <span v-if="open" key="0"> 公告详情 </span>
                          <span v-else key="1">
                            {{ item.createtime }}
                          </span>
                        </v-fade-transition>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row no-gutters>
                      <v-col cols="1"></v-col>
                      <v-col cols="9">
                        {{ item.content }}
                      </v-col>

                      <v-divider vertical class="mx-4"></v-divider>

                      <v-col cols="1"> </v-col>
                    </v-row>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-dialog v-model="dialog1" width="500">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            color="primary"
                            dark
                            v-bind="attrs"
                            v-on="on"
                            @click="getWWW(item)"
                          >
                            阅读详情
                          </v-btn>
                        </template>

                        <v-card>
                          <v-card-title class="text-h5 grey lighten-2">
                            公告阅读情况(已读名单)
                          </v-card-title>

                          <v-simple-table>
                            <template v-slot:default>
                              <thead>
                                <tr>
                                  <th class="text-left">姓名</th>
                                  <th class="text-left">查看时间</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="item in noticeRead" :key="item.name">
                                  <td>{{ item.name }}</td>
                                  <td>{{ item.readtime }}</td>
                                </tr>
                              </tbody>
                            </template>
                          </v-simple-table>

                          <v-divider></v-divider>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="primary"
                              text
                              @click="dialog1 = false"
                            >
                              Close
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                      <v-btn text color="secondary"> 删除 </v-btn>
                    </v-card-actions>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "dealNotice",
  data() {
    return {
      items: [
        { header: "Today" },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          title: "Brunch this weekend?",
          subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
        },
      ],
      dialog: false,
      dialog1: false,
      notice: {
        title: "",
        content: "",
        publisher: JSON.parse(window.sessionStorage.getItem("userData")).name,
        publisher_id: JSON.parse(window.sessionStorage.getItem("userData")).id,
        re_type: 2,
        class: [],
      },
      major: JSON.parse(window.sessionStorage.getItem("userData")).major,
      classSelect: [],
      e7: [],
      myNotice: [],
      noticeRead: [],
      noRead: [],
    };
  },

  methods: {
    getclass() {
      this.$Axios({
        url: "/users/getUserByMajor",
        method: "get",
        data: {
          type: 2,
          major: this.major,
        },
        success: (res) => {
          for (var i = 0; i < res.length; i++) {
            this.classSelect.push(res[i].class);
          }
        },
      });
    },
    addNotice() {
      this.dialog = false;
      this.$Axios({
        url: "/upload/announce",
        method: "post",
        data: {
          title: this.notice.title,
          content: this.notice.content,
          major: this.major,
          classes: this.e7.toString(),
          publisher: this.notice.publisher,
          publisher_id: this.notice.publisher_id,
          re_type: 2,
        },
        success: () => {
          this.$message.success("发布成功");
          this.getMyNotice();
        },
      });
    },
    getMyNotice() {
      this.$Axios({
        url: "/upload/myannounce",
        method: "get",
        data: {
          id: this.notice.publisher_id,
          pageNum: 5,
          currPage: 0,
        },
        success: (res) => {
          this.myNotice = res;
          // console.log(this.myNotice);
        },
      });
    },
    async readDetail(item) {
      await this.$Axios({
        url: "/upload/getReaded",
        method: "get",
        data: {
          id: item.n_id,
        },
        success: (res) => {
          this.noticeRead = JSON.parse(JSON.stringify(res));
        },
      });
    },
    getNOread(item) {
      let list = item.classes.split(",");
      let classList = [];
      for (let i = 1; i < list.length; i++) {
        this.$Axios({
          url: "/upload/getNoReaded",
          method: "get",
          data: {
            class1: list[i],
            major: item.major,
          },
          success: (res) => {
            res.forEach((element) => {
              classList.push(element);
            });
          },
        });
      }
      this.noRead = JSON.parse(JSON.stringify(classList));
    },

    getWWW(item) {
      this.readDetail(item);
      this.getNOread(item);
    },
  },
  created() {
    this.getclass();
    this.getMyNotice();
  },
  watch: {},
};
</script>

<style></style>
