module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: `http://192.168.31.156:8000/api`,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};
