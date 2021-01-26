/* eslint-disable no-nested-ternary */
module.exports = {
  transpileDependencies: ['vuetify'],

  publicPath:
    process.env.NODE_ENV === 'production'
      ? process.env.VUE_APP_HOSTINGS_TYPE === 'travis'
        ? '/nails-admin/'
        : '/admin/'
      : '/',
  lintOnSave: true,
};
