import Vue from 'vue';
import VueVideoPlayer from 'vue-video-player'
import ErrorMessage from '@/components/popups/error.vue';
import ConfirmDelete from '@/components/popups/confirmDelete.vue';
import Message from '@/components/popups/message.vue';
import App from './App.vue';
import router from '@/router';
import store from '@/store';
import vuetify from '@/plugins/vuetify';

import '@/css/fonts.scss';
import 'video.js/dist/video-js.css'

Vue.config.productionTip = false;

Vue.use(VueVideoPlayer)

Vue.component('error-message', ErrorMessage);
Vue.component('simple-message', Message);
Vue.component('confirm-delete', ConfirmDelete);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
