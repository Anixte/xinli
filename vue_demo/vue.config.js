const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      "/api1": {
        target: "http://localhost:5200/",
        changeOrigin: true,
        pathRewrite: { "^/api1": "" },
      },
      "/socket.io": {
        target: "http://localhost:5200",
        ws: true,
        changeOrigin: true,
      },
      "sockjs-node": {
        target: "http://localhost:5200",
        ws: false,
        changeOrigin: true,
      },
    },
  },
});
