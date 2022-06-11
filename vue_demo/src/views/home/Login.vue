<template>
  <div
    style="
      width: 32%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    "
  >
    <transition name="el-fade-in-linear">
      <v-card elevation="24" shaped>
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="200px"
        ></v-img>
        <v-card-title class="justify-center"> 校园心理咨询系统 </v-card-title>
        <form class="form1 ml-12">
          <v-text-field
            v-model="name"
            :error-messages="nameErrors"
            label="Username"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :error-messages="passwordErrors"
            label="Password"
            required
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
          ></v-text-field>
          <v-select
            v-model="select"
            :items="items"
            :error-messages="selectErrors"
            label="Role"
            required
            @change="$v.select.$touch()"
            @blur="$v.select.$touch()"
          ></v-select>

          <v-btn
            class="btn1"
            :loading="loading2"
            :disabled="loading2"
            color="success"
            @click="login"
          >
            login
            <template v-slot:loader>
              <span>Logging...</span>
            </template>
          </v-btn>
          <v-btn @click="clear" style="margin-bottom: 1rem"> clear </v-btn>
        </form>
      </v-card>
    </transition>
  </div>
</template>
<script>
// import router from "@/router";
import { validationMixin } from "vuelidate";
import { required, maxLength, minLength } from "vuelidate/lib/validators";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(12) },
    password: { required, minLength: minLength(6), maxLength: maxLength(16) },
    select: { required },
  },
  data() {
    return {
      loader: null,
      loading2: false,
      name: "",
      password: "",
      select: null,
      items: ["管理员", "学生", "老师"],
      type: "1",
    };
  },
  methods: {
    /**
     * 登录
     * 用户名：username:this.name,
     * 密码：password:this.password,
     */
    login() {
      this.$v.$touch();
      this.loader = "loading2";
      if (!this.name || !this.password) {
        this.warnning("用户名,密码不能为空");
        this.name = "";
        this.password = "";
      } else {
        this.$Axios({
          url: "/users/login",
          method: "post",
          data: {
            username: this.name,
            password: this.password,
            type: this.type,
          },
          success: (result) => {
            // console.log(result);
            if (result == "用户名或者账号输入错误") {
              this.$message.error("用户名或者账号输入错误");
              this.name = "";
              this.password = "";
            } else {
              window.sessionStorage.setItem("token", result.jwt_token);
              //方便后来群聊使用
              const socketData = {
                id: result.loginData[0].id,
                name: result.loginData[0].name,
                img: result.loginData[0].head,
              };
              window.sessionStorage.setItem(
                "socketData",
                JSON.stringify(socketData)
              );
              const userData = {
                id: result.loginData[0].id,
                name: result.loginData[0].name,
                img: result.loginData[0].head,
                username: result.loginData[0].username,
                address: result.loginData[0].address,
                major: result.loginData[0].major,
                class: result.loginData[0].class,
                tag: result.loginData[0].tag,
              };
              window.sessionStorage.setItem(
                "userData",
                JSON.stringify(userData)
              );
              //  window.sessionStorage.setItem("id",id);
              if (this.type == 1)
                window.location.href = " http://localhost:8080/admin/home";
              // router.push({ path: "admin/home" });
              if (this.type == 2)
                window.location.href = " http://localhost:8080/student/home";
              if (this.type == 3)
                window.location.href = " http://localhost:8080/teacher/home";
            }
          },
        });
      }
    },

    warnning(v) {
      this.$message({
        message: v,
        type: "warning",
      });
    },

    clear() {
      this.$v.$reset();
      this.name = "";
      this.password = "";
      this.select = null;
    },
  },
  computed: {
    selectErrors() {
      const errors = [];
      if (!this.$v.select.$dirty) return errors;
      !this.$v.select.required && errors.push("Role is required");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Username must be at most 12 characters long");
      !this.$v.name.required && errors.push("Username is required.");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      //   !this.$v.password.minLength &&
      //     errors.push("Name must be at least 6 characters long");
      !this.$v.password.maxLength &&
        errors.push("Name must be at most 16 characters long");
      !this.$v.password.required && errors.push("Password is required");
      return errors;
    },
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    },
    select() {
      switch (this.select) {
        case "管理员":
          this.type = 1;
          break;
        case "学生":
          this.type = 2;
          break;
        case "老师":
          this.type = 3;
          break;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.center {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.form1 {
  width: 80%;
}
.btn1 {
  margin: 0 4.6667rem;
  margin-bottom: 1rem;
}
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
