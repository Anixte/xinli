import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  { path: "*", redirect: "/" },
  {
    path: "/",
    name: "Login",
    component: () => import("@/views/home/Login.vue"),
  },
  // 管理员页面
  {
    path: "/admin",
    component: () => import("@/views/home/Admin.vue"),
    children: [
      {
        path: "home",
        component: () => import("@/components/common/Main.vue"),
      },
      {
        path: "squareAdmin",
        component: () => import("@/components/admin/squareAdmin.vue"),
      },
      {
        path: "noticeAdmin",
        component: () => import("@/components/admin/noticeAdmin.vue"),
      },
      {
        path: "teacherAdmin",
        component: () => import("@/components/admin/teacherAdmin.vue"),
      },
      {
        path: "studentAdmin",
        component: () => import("@/components/admin/studentAdmin.vue"),
      },
      {
        path: "articleAdmin",
        component: () => import("@/components/admin/articleAdmin.vue"),
      },
    ],
  },
  // 老师界面
  {
    path: "/teacher",
    component: () => import("@/views/home/Teachers.vue"),
    children: [
      {
        path: "home",
        component: () => import("@/components/common/Main.vue"),
      },
      {
        path: "notice",
        component: () => import("@/components/teacher/notice.vue"),
      },
      {
        path: "dealnotice",
        component: () => import("@/components/teacher/dealNotice.vue"),
      },
      {
        path: "article",
        component: () => import("@/components/common/Article.vue"),
      },
      {
        path: "applydeal",
        component: () => import("@/components/teacher/applyDeal.vue"),
      },
      {
        path: "chat",
        component: () => import("@/components/socket/oto_socket.vue"),
      },
    ],
  },
  // 学生界面
  {
    path: "/student",
    component: () => import("@/views/home/Students.vue"),
    children: [
      {
        path: "home",
        component: () => import("@/components/common/Main.vue"),
      },
      {
        path: "notice",
        component: () => import("@/components/student/notice.vue"),
      },
      {
        path: "article",
        component: () => import("@/components/common/Article.vue"),
      },
      {
        path: "applyfor",
        component: () => import("@/components/student/applyFor.vue"),
      },
      {
        path: "myChat",
        component: () => import("@/components/socket/oto_socket.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
