<template>
  <v-app>
    <v-main class="pa-0">
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <!-- <v-card> <v-subheader>Yesterday</v-subheader></v-card> -->
            <v-card class="mx-auto">
              <v-toolbar color="teal" dark>
                <v-toolbar-title>未审核预约</v-toolbar-title>

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
                            申请人：{{ item.u_name }} &nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp; 预约时间：{{ item.c_time }}
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
                        <span>未审核 </span>
                      </v-col>
                    </v-row>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="primary"
                        @click="dealConsult(2, item.c_id)"
                        >通过
                      </v-btn>
                      <v-btn
                        text
                        color="secondary"
                        @click="dealConsult(3, item.c_id)"
                        >不通过
                      </v-btn>
                    </v-card-actions>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card>
          </v-col>
          <v-col cols="12">
            <!-- <v-card> <v-subheader>Yesterday</v-subheader></v-card> -->
            <v-card class="mx-auto">
              <v-toolbar color="teal" dark>
                <v-toolbar-title>已审核的预约</v-toolbar-title>

                <v-spacer></v-spacer>
                <v-app-bar-nav-icon></v-app-bar-nav-icon>
              </v-toolbar>
              <v-expansion-panels>
                <v-expansion-panel
                  v-for="(item, index) in this.dealedConsult"
                  :key="index"
                >
                  <v-expansion-panel-header v-slot="{ open }">
                    <v-row no-gutters>
                      <v-col cols="4"> {{ item.c_title }} </v-col>
                      <v-col cols="8" class="text--secondary">
                        <v-fade-transition leave-absolute>
                          <span v-if="open" key="0"
                            >申请人：{{ item.u_name }} &nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp; 预约时间：{{ item.c_time }}
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
      major: JSON.parse(window.sessionStorage.getItem("userData")).major,
      dialog: false,
      modal2: false,
      modal: false,
      myConsult: [],
      dealedConsult: [],
    };
  },
  methods: {
    getMyconsult() {
      this.myConsult = [];
      (this.dealedConsult = []),
        this.$Axios({
          url: "/upload/getAllconsult",
          method: "get",
          success: (res) => {
            // console.log(this.major);
            res.forEach((val) => {
              if (val.u_major == this.major) {
                if (val.state == 1) {
                  this.myConsult.push(val);
                } else {
                  this.dealedConsult.push(val);
                }
              }
            });
          },
        });
    },
    dealConsult(state, c_id) {
      this.$Axios({
        url: "/upload/setConsultState",
        method: "post",
        data: {
          c_id: c_id,
          state: state,
          c_teacher: JSON.parse(window.sessionStorage.getItem("userData")).name,
        },
        success: () => {
          this.$message.success("审核成功");
          this.getMyconsult();
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
