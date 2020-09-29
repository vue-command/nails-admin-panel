import Vue from 'vue';
import Notifications from 'vue-notification';
import CardComponents from 'card-nails-test1';

import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
// eslint-disable-next-line import/no-unresolved
// import '@babel/polyfill';
import '@/css/fonts.scss';

Vue.use(CardComponents);

Vue.config.productionTip = false;
Vue.use(Notifications);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
