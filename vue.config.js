module.exports = {
  transpileDependencies: ['vuetify'],

  // eslint-disable-next-line no-nested-ternary
  publicPath: process.env.NODE_ENV === 'production'
    ? process.env.VUE_APP_HOSTINGS_TYPE === 'travis'
      ? '/nails-admin/'
      : '/admin/' : '/',
};
