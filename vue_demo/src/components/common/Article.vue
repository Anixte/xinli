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
                      <v-toolbar-title>写文章</v-toolbar-title>

                      <v-spacer></v-spacer>
                      <v-dialog v-model="dialog" persistent max-width="600px">
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon v-bind="attrs" v-on="on">mdi-pencil </v-icon>
                        </template>
                        <v-card>
                          <v-card-title>
                            <span class="text-h5">编辑文章</span>
                          </v-card-title>
                          <v-card-text>
                            <v-container>
                              <v-row>
                                <v-col cols="12">
                                  <v-text-field
                                    label="文章标题"
                                    v-model="article.title"
                                    required
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                  <v-textarea
                                    name="input-7-1"
                                    filled
                                    label="文章内容"
                                    auto-grow
                                    v-model="article.content"
                                    clearable
                                    clear-icon="mdi-close-circle"
                                    counter
                                  ></v-textarea>
                                </v-col>
                                <v-col cols="12" sm="6">
                                  <v-select
                                    v-model="article.tag"
                                    :items="tagList"
                                    label="标签"
                                    chips
                                    hint="选择文章所属"
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
                              @click="addArticle"
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
                <v-toolbar-title>心理文章</v-toolbar-title>

                <v-spacer></v-spacer>
                <v-app-bar-nav-icon></v-app-bar-nav-icon>
              </v-toolbar>
              <v-expansion-panels focusable>
                <v-expansion-panel
                  v-for="(item, index) in this.articleList"
                  :key="index"
                >
                  <v-expansion-panel-header v-slot="{ open }">
                    <v-row no-gutters>
                      <v-col cols="4"> {{ item.title }} </v-col>
                      <v-col cols="8" class="text--secondary">
                        <v-fade-transition leave-absolute>
                          <span v-if="open" key="0">
                            发表时间：{{ item.w_time }} &nbsp;&nbsp;&nbsp;
                            作者： {{ item.writer }}
                          </span>
                          <span v-else key="1">
                            作者：
                            {{ item.writer }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            标签：{{ item.a_type }}
                          </span>
                        </v-fade-transition>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row no-gutters>
                      <v-col cols="1"></v-col>
                      <v-col cols="9" v-html="item.content"> </v-col>

                      <v-divider vertical class="mx-4"></v-divider>

                      <v-col cols="1"> </v-col>
                    </v-row>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary"> 阅读详情 </v-btn>
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
  name: "Article",
  data() {
    return {
      dialog: false,
      article: {
        title: "",
        content: "",
        tag: "",
        writer: JSON.parse(window.sessionStorage.getItem("userData")).name,
      },
      tagList: ["心理百科", "朋辈互助", "心理改善"],
      articleList: [],
    };
  },
  methods: {
    addArticle() {
      var content = this.article.content
        .replace(/\r\n/g, "<br/>")
        .replace(/\n/g, "<br/>")
        .replace(/\s/g, " ");
      if (this.article.title == "" || this.article.tag == "" || content == "") {
        this.$message.warning("请输入必要信息");
      } else {
        this.$Axios({
          url: "/upload/article",
          method: "post",
          data: {
            title: this.article.title,
            content: content,
            tag: this.article.tag,
            writer: this.article.writer,
          },
          success: () => {
            this.dialog = false;
            // console.log(res);
            this.getAllarticle();
            this.$message.success("文章发表成功");
          },
        });
      }
    },
    getAllarticle() {
      this.$Axios({
        url: "/upload/getarticle",
        method: "get",
        success: (res) => {
          for (var i = 0; i < res.length; i++) {
            // this.articleList.push(res[i]);
            this.articleList = res;
          }
          console.log(res);
        },
      });
    },
  },
  created() {
    this.getAllarticle();
  },
};
</script>

<style></style>
