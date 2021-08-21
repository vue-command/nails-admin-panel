/* eslint-disable no-nested-ternary */
module.exports = {
  transpileDependencies: ['vuetify'],
  devServer: {
    proxy: {
      '': {
        target: process.env.VUE_APP_API_URL,
        changeOrigin: true,
      },
    },
  },
  publicPath:
    process.env.NODE_ENV === 'production'
      ? '/admin/'
        : '/',
  lintOnSave: true,
};
