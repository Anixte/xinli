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
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="teal"
                          dark
                          class="mb-2"
                          v-bind="attrs"
                          v-on="on"
                        >
                          添加新学生
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="text-h5">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  v-model="editedItem.username"
                                  label="学号"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  v-model="editedItem.name"
                                  label="姓名"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  v-model="editedItem.sex"
                                  label="性别"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  v-model="editedItem.address"
                                  label="地址"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  v-model="editedItem.major"
                                  label="专业"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  v-model="editedItem.class"
                                  label="班级"
                                ></v-text-field>
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
                          >确定要删除该学生吗？</v-card-title
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
      items: ["姓名", "学号", "班级", "专业", "性别", "地址"],
      // 搜索的字段名
      searchType: "",
      // 搜索的字符
      searchInput: "",
      // 要修改的用户名
      changeUser: "",
      // 表格头
      headers: [
        {
          text: "学号",
          align: "start",
          sortable: true,
          value: "username",
        },
        { text: "姓名", value: "name" },
        { text: "性别", value: "sex" },
        { text: "地址", value: "address" },
        { text: "专业", value: "major" },
        { text: "班级", value: "class" },
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
        username: "",
        name: "",
        sex: "",
        address: "",
        major: "",
        class: "",
      },
      // 弹出框默认属性
      defaultItem: {
        username: "",
        name: "",
        sex: "",
        address: "",
        major: "",
        class: "",
      },
    };
  },

  methods: {
    // 搜索类型赋值
    changeType(item) {
      switch (item) {
        case "性别":
          this.searchType = "sex";
          break;
        case "姓名":
          this.searchType = "name";
          break;
        case "学号":
          this.searchType = "username";
          break;
        case "班级":
          this.searchType = "class";
          break;
        case "专业":
          this.searchType = "major";
          break;
        case "地址":
          this.searchType = "address";
          break;
      }
    },

    // 搜索操作
    search() {
      this.$Axios({
        url: "/admin/getUserByTypeAndChar",
        method: "get",
        data: {
          type: 2,
          currPage: 0,
          pageNum: 100,
          inputText: this.searchInput,
          CharType: this.searchType,
        },
        success: (res) => {
          // console.log(res);
          this.desserts = res.data;
          // console.log(this.desserts);
        },
      });
    },

    // 重置
    reset() {
      (this.searchInput = ""), (this.searchType = ""), this.getUserdata();
    },
    // 获取用户列表
    getUserdata() {
      this.$Axios({
        url: "/users/getUserByTypePage",
        method: "get",
        data: {
          type: 2,
          currPage: 0,
          pageNum: 100,
        },
        success: (res) => {
          // console.log(res);
          this.desserts = res.data;
          // console.log(this.desserts);
        },
      });
    },

    // 进行表格修改
    editItem(item) {
      this.changeUser = item.username;
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
        url: "/users/delUserdata",
        method: "get",
        data: {
          username: this.editedItem.username,
        },
        success: (res) => {
          console.log(res);
        },
      });
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
      this.$message.success("用户删除成功");
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
          url: "/users/upUserdata",
          method: "post",
          data: {
            u_id: this.changeUser,
            username: this.editedItem.username,
            name: this.editedItem.name,
            sex: this.editedItem.sex,
            address: this.editedItem.address,
            major: this.editedItem.major,
            class1: this.editedItem.class,
          },
          success: (res) => {
            console.log(res);
            this.$message.success("用户修改成功");
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
            type: 2,
          },
          success: (res) => {
            console.log(res);
            this.$message.success("学生添加成功");
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
      return this.editedIndex === -1 ? "创建学生信息" : "学生信息编辑";
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
