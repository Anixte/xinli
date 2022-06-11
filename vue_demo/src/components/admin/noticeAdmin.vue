<template>
  <v-app>
    <v-main class="pa-0">
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-subheader class="text-h5">Search</v-subheader>
              <v-row>
                <v-col class="d-flex ml-5" cols="auto">
                  <v-select
                    class="shrink"
                    :items="items"
                    label="type"
                    dense
                    @change="changeType($event)"
                  ></v-select>
                </v-col>
                <v-col class="d-flex pt-0" cols="auto"
                  ><v-text-field
                    label="Search input"
                    class="shrink pa-0 mt-2"
                    v-model="searchInput"
                  ></v-text-field
                ></v-col>
                <v-col class="d-flex pt-0" cols="auto">
                  <div class="text-center">
                    <v-btn
                      rounded
                      color="teal"
                      dark
                      class="mr-3"
                      @click="search"
                    >
                      搜索
                    </v-btn>
                    <v-btn rounded color="teal" dark @click="reset">
                      重置
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card>
              <v-data-table
                :headers="headers"
                :items="desserts"
                sort-by="username"
                class="elevation-1"
                :options="options"
              >
                <template v-slot:top>
                  <v-toolbar flat>
                    <v-toolbar-title>List</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="500px">
                      <v-card>
                        <v-card-title>
                          <span class="text-h5">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="6" md="12">
                                <v-text-field
                                  v-model="editedItem.title"
                                  label="标题"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  disabled
                                  v-model="editedItem.publisher"
                                  label="发布者"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  disabled
                                  v-model="editedItem.classes"
                                  label="接收班级"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="12">
                                <v-textarea
                                  auto-grow
                                  v-model="editedItem.content"
                                  label="内容"
                                ></v-textarea>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text @click="close">
                            取消
                          </v-btn>
                          <v-btn color="blue darken-1" text @click="save">
                            保存
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogDelete" max-width="500px">
                      <v-card>
                        <v-card-title class="text-h5"
                          >确定要删除该公告吗？</v-card-title
                        >
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text @click="closeDelete"
                            >取消</v-btn
                          >
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="deleteItemConfirm"
                            >确定</v-btn
                          >
                          <v-spacer></v-spacer>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-toolbar>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                  <!-- eslint对v-solt格式有规范 -->
                  <!-- https://www.jianshu.com/p/9f545c95bdb6 -->
                  <v-icon small class="mr-2" @click="editItem(item)">
                    mdi-pencil
                  </v-icon>
                  <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
                </template>
                <template v-slot:no-data>
                  <v-btn color="primary" @click="getUserdata"> Reset </v-btn>
                </template>
              </v-data-table>
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
  name: "teacherAdmin",
  data() {
    return {
      // 弹出框显示与否
      dialog: false,
      // 删除的确认框
      dialogDelete: false,
      // 下拉列表的选项
      items: ["公告", "公告内容", "发布者", "接收专业", "接收班级"],
      // 搜索的字段名
      searchType: "",
      // 搜索的字符
      searchInput: "",
      // 要修改的用户名
      changeUser: "",
      // 表格头
      headers: [
        {
          text: "公告名",
          align: "start",
          sortable: true,
          value: "title",
        },
        { text: "发布者", value: "publisher" },
        { text: "接收专业", value: "major" },
        { text: "接收班级", value: "classes" },
        { text: "发布时间", value: "createtime" },
        { text: "操作", value: "actions", sortable: false },
      ],
      // 表格显示的数据
      desserts: [],
      // 表格默认设置
      options: {
        itemsPerPage: 5,
      },
      // 判断是修改还是添加
      editedIndex: -1,
      // 修改器前的属性
      editedItem: {
        title: "",
        content: "",
        publisher: "",
        major: "",
        classes: "",
        re_type: "",
      },
      // 弹出框默认属性
      defaultItem: {
        title: "",
        content: "",
        publisher: "",
        major: "",
        classes: "",
        re_type: "",
      },
    };
  },

  methods: {
    // 搜索类型赋值
    changeType(item) {
      switch (item) {
        case "公告":
          this.searchType = "title";
          break;
        case "公告内容":
          this.searchType = "content";
          break;
        case "发布者":
          this.searchType = "publisher";
          break;
        case "接收专业":
          this.searchType = "major";
          break;
        case "接收班级":
          this.searchType = "classes";
          break;
      }
    },

    // 搜索操作
    search() {
      this.$Axios({
        url: "/admin/getNoticeByTypeAndChar",
        method: "get",
        data: {
          type: 3,
          currPage: 0,
          pageNum: 100,
          inputText: this.searchInput,
          CharType: this.searchType,
        },
        success: (res) => {
          // console.log(res);
          this.desserts = res;
          // console.log(this.desserts);
        },
      });
    },

    // 重置
    reset() {
      (this.searchInput = ""), (this.searchType = ""), this.getUserdata();
    },
    // 获取公告列表
    getUserdata() {
      this.$Axios({
        url: "/upload/getAllnotice",
        method: "get",
        success: (res) => {
          console.log(res);
          this.desserts = res;
          // console.log(this.desserts);
        },
      });
    },

    // 进行表格修改
    editItem(item) {
      this.changeUser = item.n_id;
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    // 删除表格元素
    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    // 删除确认框
    deleteItemConfirm() {
      this.$commonAxios({
        url: "/admin/delNotice",
        method: "get",
        data: {
          n_id: this.editedItem.n_id,
        },
        success: (res) => {
          console.log(res);
        },
      });
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
      this.$message.success("公告删除成功");
    },

    // 关闭对话框
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    // 关闭删除对话框
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    // 保存需要改变的
    save() {
      if (this.editedIndex > -1) {
        // 表格内修改元素
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
        this.$Axios({
          url: "/admin/upNoticeData",
          method: "post",
          data: {
            n_id: this.changeUser,
            title: this.editedItem.title,
            content: this.editedItem.content,
          },
          success: (res) => {
            console.log(res);
            this.$message.success("公告信息修改成功");
          },
        });
      } else {
        // 表格添加元素
        this.$Axios({
          url: "/users/addUserdata",
          method: "post",
          data: {
            username: this.editedItem.username,
            name: this.editedItem.name,
            sex: this.editedItem.sex,
            address: this.editedItem.address,
            major: this.editedItem.major,
            class2: this.editedItem.class,
            type: 3,
          },
          success: (res) => {
            console.log(res);
            this.$message.success("教师添加成功");
          },
        });
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
  },
  computed: {
    // 对话框标题
    formTitle() {
      return this.editedIndex === -1 ? "发布公告" : "公告信息编辑";
    },
  },
  watch: {
    // 是否显示对话框
    dialog(val) {
      val || this.close();
    },
    // 是否显示删除确认框
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
    this.getUserdata();
  },
};
</script>

<style></style>
