import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import ShopPage from '../views/ShopPage.vue';
// import Courses from '../views/Courses/Courses.vue'
// import OnlineCourses from '../views/Courses/OnlineCourses.vue'
import OfflineCoursesPage from '../views/Courses/OfflineCoursesPage.vue';
import OnlineCoursesPage from '../views/Courses/OnlineCoursesPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/shop',
    name: 'ShopEdit',
    meta: { layout: 'shop' },
    component: ShopPage,
  },
  // {
  //   path: '/courses',
  //   name: 'courses',
  //   meta: {layout:'courses' },
  //   component: Courses
  // },
  {
    path: '/online-courses-page',
    name: 'online-courses-page',
    meta: { layout: 'courses' },
    component: OnlineCoursesPage,
  },
  {
    path: '/offline-courses-page',
    name: 'offline-courses-page',
    meta: { layout: 'courses' },
    component: OfflineCoursesPage,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
