import Vue from 'vue';
import Notifications from 'vue-notification';
import CourseCard from 'nails-component-card';
import CourseCardDetail from 'nails-component-card-detail';
import CoursesForm from 'nails-component-card-form';

import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
// eslint-disable-next-line import/no-unresolved
// import '@babel/polyfill';
import '@/css/fonts.scss';

Vue.use(CourseCard);
Vue.use(CourseCardDetail);
Vue.use(CoursesForm);

Vue.config.productionTip = false;
Vue.use(Notifications);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
