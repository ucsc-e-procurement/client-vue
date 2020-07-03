module.exports = {
  transpileDependencies: ["vuetify"],
  lintOnSave: process.env.NODE_ENV !== "production",
  devServer: {
    host: "localhost"
  }
};
