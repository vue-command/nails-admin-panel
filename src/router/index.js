import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import ShopPage from '../views/ShopPage.vue';
// import Courses from '../views/Courses/Courses.vue'
// import OnlineCourses from '../views/Courses/OnlineCourses.vue'
import OfflineCoursesPage from '../views/Courses/OfflineCoursesPage.vue';
import OnlineCoursesPage from '../views/Courses/OnlineCoursesPage.vue';

Vue.use(VueRouter);

const routes = [{
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
  path: '/online-courses-page/course/:courseid',
  name: 'online-course-page',
  meta: { layout: 'courses' },
  component: () => import(/* webpackChunkName: "user-courses" */ '../views/Courses/Course.vue'),
},
{
  path: '/online-courses-page/course/:courseid/videos',
  name: 'online-course-videos',
  meta: { layout: 'courses' },
  component: () => import(/* webpackChunkName: "user-courses" */ '../views/Courses/CourseVideos.vue'),
},
{
  path: '/online-courses-page/course/:courseid/videos/:videoid',
  name: 'online-course-video',
  meta: { layout: 'courses' },
  component: () => import(/* webpackChunkName: "user-courses" */ '../views/Courses/CourseVideoDetail.vue'),
},
{
  path: '/offline-courses-page',
  name: 'offline-courses-page',
  meta: { layout: 'courses' },
  component: OfflineCoursesPage,
},
{ path: '/admin/:hash', redirect: '/' },
{
  path: '*',
  name: 'page-not-found',
  component: () => import(/* webpackChunkName: "user-courses" */ '../views/Courses/components/PageNotFound.vue'),
},

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
