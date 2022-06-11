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
                      <v-toolbar-title>咨询预约申请</v-toolbar-title>

                      <v-spacer></v-spacer>
                      <v-dialog v-model="dialog" persistent max-width="600px">
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon v-bind="attrs" v-on="on">mdi-pencil </v-icon>
                        </template>
                        <v-card>
                          <v-card-title>
                            <span class="text-h5">编辑预约信息</span>
                          </v-card-title>
                          <v-card-text>
                            <v-container>
                              <v-row>
                                <v-col cols="12" sm="6" md="4">
                                  <v-text-field
                                    label="姓名"
                                    v-model="consult.name"
                                    required
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                  <v-text-field
                                    label="性别"
                                    v-model="consult.sex"
                                    required
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                  <v-text-field
                                    label="联系方式：电话"
                                    v-model="consult.tel"
                                    required
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                  <v-text-field
                                    v-model="consult.title"
                                    label="简述目前咨询问题"
                                    required
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                  <v-text-field
                                    v-model="consult.content"
                                    label="详细描述所要咨询的问题"
                                    required
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                  <v-text-field
                                    v-model="consult.help"
                                    label="描述所想要得到的帮助"
                                    required
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                  <v-dialog
                                    ref="dialog"
                                    v-model="modal"
                                    :return-value.sync="this.date"
                                    persistent
                                    width="290px"
                                  >
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-text-field
                                        v-model="consult.date"
                                        label="Pick Date"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                      ></v-text-field>
                                    </template>
                                    <v-date-picker
                                      v-if="modal"
                                      v-model="consult.date"
                                      scrollable
                                    >
                                      <v-spacer></v-spacer>
                                      <v-btn
                                        text
                                        color="primary"
                                        @click="modal = false"
                                      >
                                        Cancel
                                      </v-btn>
                                      <v-btn
                                        text
                                        color="primary"
                                        @click="
                                          $refs.dialog.save(consult.date);
                                          modal = false;
                                        "
                                      >
                                        OK
                                      </v-btn>
                                    </v-date-picker>
                                  </v-dialog>
                                </v-col>
                                <v-col cols="12" sm="6">
                                  <v-dialog
                                    ref="dialog"
                                    v-model="modal2"
                                    :return-value.sync="consult.time"
                                    persistent
                                    width="290px"
                                  >
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-text-field
                                        v-model="consult.time"
                                        label="Pick time"
                                        prepend-icon="mdi-clock-time-four-outline"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                      ></v-text-field>
                                    </template>
                                    <v-time-picker
                                      v-if="modal2"
                                      v-model="consult.time"
                                      format="24hr"
                                      full-width
                                    >
                                      <v-spacer></v-spacer>
                                      <v-btn
                                        text
                                        color="primary"
                                        @click="modal2 = false"
                                      >
                                        Cancel
                                      </v-btn>
                                      <v-btn
                                        text
                                        color="primary"
                                        @click="$refs.dialog.save(consult.time)"
                                      >
                                        OK
                                      </v-btn>
                                    </v-time-picker>
                                  </v-dialog>
                                </v-col>
                              </v-row>
                            </v-container>
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
                              @click="setConsult"
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
                <v-toolbar-title>已申请的预约</v-toolbar-title>

                <v-spacer></v-spacer>
                <v-app-bar-nav-icon></v-app-bar-nav-icon>
              </v-toolbar>
              <v-expansion-panels>
                <v-expansion-panel
                  v-for="(item, index) in this.myConsult"
                  :key="index"
                >
                  <v-expansion-panel-header v-slot="{ open }">
                    <v-row no-gutters>
                      <v-col cols="4"> {{ item.c_title }} </v-col>
                      <v-col cols="8" class="text--secondary">
                        <v-fade-transition leave-absolute>
                          <span v-if="open" key="0">
                            预约时间：{{ item.c_time }}
                          </span>
                          <span v-else key="1">
                            申请时间：
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
                        {{ item.c_content }}
                      </v-col>

                      <v-divider vertical class="mx-4"></v-divider>

                      <v-col cols="1">
                        <span v-if="item.state == 1">未审核 </span>
                        <span v-else-if="item.state == 2"
                          >预约成功<br />审核老师：{{ item.c_teacher }}
                        </span>
                        <span v-else
                          >不通过<br />审核老师：{{ item.c_teacher }}
                        </span>
                      </v-col>
                    </v-row>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <!-- <v-btn text color="primary">  </v-btn> -->
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
  name: "applyFor",
  data() {
    return {
      id: JSON.parse(window.sessionStorage.getItem("userData")).id,
      dialog: false,
      modal2: false,
      modal: false,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      consult: {
        name: "",
        sex: "",
        tel: "",
        title: "",
        content: "",
        help: "",
        date: "",
        time: "",
      },
      myConsult: [],
    };
  },
  methods: {
    // 申请预约
    setConsult() {
      this.dialog = false;
      this.$Axios({
        url: "/upload/setconsult",
        method: "post",
        data: {
          id: JSON.parse(window.sessionStorage.getItem("userData")).id,
          name: this.consult.name,
          sex: this.consult.sex,
          tel: this.consult.tel,
          major: JSON.parse(window.sessionStorage.getItem("userData")).major,
          title: this.consult.title,
          content: this.consult.content,
          help: this.consult.help,
          time: this.consult.date + " " + this.consult.time,
        },
        success: () => {
          this.$message.success("预约成功");
          this.getMyconsult();
        },
      });
    },
    // 获取我的预约
    getMyconsult() {
      this.myConsult = [];
      this.$Axios({
        url: "/upload/getAllconsult",
        method: "get",
        success: (res) => {
          res.forEach((val) => {
            if (val.u_id == this.id) {
              this.myConsult.push(val);
            }
          });
        },
      });
    },
  },
  created() {
    this.getMyconsult();
  },
};
</script>

<style></style>
