module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/nails-admin'
    : '/',
  transpileDependencies: [
    'vuetify',
  ],
};
