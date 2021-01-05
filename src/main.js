import Vue from 'vue';
import VueCoreVideoPlayer from 'vue-core-video-player';
import ErrorMessage from '@/components/popups/error.vue';
import ConfirmDelete from '@/components/popups/confirmDelete.vue';
import Message from '@/components/popups/message.vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
// eslint-disable-next-line import/no-unresolved
// import '@babel/polyfill';
import '@/css/fonts.scss';

Vue.config.productionTip = false;
Vue.use(VueCoreVideoPlayer);

Vue.component('error-message', ErrorMessage);
Vue.component('simple-message', Message);
Vue.component('confirm-delete', ConfirmDelete);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
