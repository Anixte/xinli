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
                      <v-toolbar-title>未读公告</v-toolbar-title>

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

                            <v-col cols="1.5"
                              >发布人：{{ item.publisher }}
                            </v-col>
                          </v-row>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              text
                              color="primary"
                              @click="getReaded(item.n_id)"
                            >
                              已读
                            </v-btn>
                            <!-- <v-btn text color="secondary"> </v-btn> -->
                          </v-card-actions>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col cols="12">
            <!-- <v-card> <v-subheader>Yesterday</v-subheader></v-card> -->
            <v-card class="mx-auto">
              <v-toolbar color="teal" dark>
                <v-toolbar-title>已读公告</v-toolbar-title>

                <v-spacer></v-spacer>
                <v-app-bar-nav-icon></v-app-bar-nav-icon>
              </v-toolbar>

              <v-expansion-panels>
                <v-expansion-panel
                  v-for="(item, index) in this.readedNotice"
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

                      <v-col cols="1.5">发布人：{{ item.publisher }} </v-col>
                    </v-row>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="getUnRead(item.n_id)">
                        变回未读
                      </v-btn>
                      <!-- <v-btn text color="secondary"> </v-btn> -->
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
  name: "Main",
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
      myNotice: [],
      readedNotice: [],
    };
  },

  methods: {
    getMyNotice() {
      this.$Axios({
        url: "/upload/getNotice",
        method: "get",
        data: {
          type: 2,
          major: JSON.parse(window.sessionStorage.getItem("userData")).major,
          class: JSON.parse(window.sessionStorage.getItem("userData")).class,
          pageNum: 5,
          currPage: 0,
        },
        success: (res) => {
          this.myNotice = res.data;
          //   console.log(this.myNotice);
          this.getMyReaded(res.data);
        },
      });
    },
    getMyReaded(Notice) {
      this.$Axios({
        url: "/upload/getNoticeRead",
        method: "get",
        data: {
          id: JSON.parse(window.sessionStorage.getItem("userData")).id,
        },
        success: (res) => {
          this.readedNotice = [];
          for (var i = 0; i < res.length; i++) {
            Notice.forEach((val, index) => {
              if (val.n_id == res[i].n_id) {
                this.readedNotice.push(val);
                Notice.splice(index, 1);
              }
            });
          }
        },
      });
    },
    getReaded(n_id) {
      this.$Axios({
        url: "/upload/goreaded",
        method: "get",
        data: {
          n_id: n_id,
          id: JSON.parse(window.sessionStorage.getItem("userData")).id,
        },
        success: () => {
          this.getMyNotice();
        },
      });
    },
    getUnRead(n_id) {
      this.$Axios({
        url: "/upload/gounreaded",
        method: "get",
        data: {
          n_id: n_id,
          id: JSON.parse(window.sessionStorage.getItem("userData")).id,
        },
        success: () => {
          this.getMyNotice();
        },
      });
    },
  },
  created() {
    this.getMyNotice();
  },
  watch: {},
};
</script>

<style></style>
