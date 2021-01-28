/* eslint-disable no-nested-ternary */
module.exports = {
  transpileDependencies: ['vuetify'],

  publicPath:
    process.env.NODE_ENV === 'production'
      ? '/admin/'
        : '/',
  lintOnSave: true,
};
