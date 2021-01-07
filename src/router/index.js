import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
// import Courses from '../views/Courses/Courses.vue'
// import OnlineCourses from '../views/Courses/OnlineCourses.vue'
// import OfflineCoursesPage from '../views/Courses/OfflineCoursesPage.vue';
// import OnlineCoursesPage from '../views/Courses/OnlineCoursesPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/shop',
    name: 'shop',
    meta: {
      layout: 'shop',
    },
    component: () =>
      import(
      /* webpackChunkName: "shop" */
      '@/views/Shop/Shop.vue'
    ),
  },
  {
    path: '/shop/commodity/:commodityId',
    name: 'commodity-edit',
    meta: {
      layout: 'shop',
    },
    component: () =>
      import(
      /* webpackChunkName: "shop" */
      '@/views/Shop/ModifyProduct.vue'
    ),
  },
  {
    path: '/online-courses',
    name: 'online-courses',
    meta: {
      layout: 'courses',
    },
    component: () =>
      import(
      /* webpackChunkName: "online-courses" */
      '@/views/Courses/OnlineCoursesPage.vue'
    ),
  },
  {
    path: '/online-courses/:courseid',
    name: 'online-course',
    meta: {
      layout: 'courses',
    },
    component: () =>
      import(
      /* webpackChunkName: "online-course" */
      '@/views/Courses/Course.vue'
    ),
  },
  {
    path: '/online-courses/:courseid/videos',
    name: 'online-course-videos',
    meta: {
      layout: 'courses',
    },
    component: () =>
      import(
      /* webpackChunkName: "online-course-videos" */
      '@/views/Courses/CourseVideos.vue'
    ),
  },
  {
    path: '/online-courses/:courseid/videos/:videoid',
    name: 'online-course-video',
    meta: {
      layout: 'courses',
    },
    component: () =>
      import(
      /* webpackChunkName: "online-course-video" */
      '@/views/Courses/CourseVideoDetail.vue'
    ),
  },
  {
    path: '/offline-courses',
    name: 'offline-courses',
    meta: {
      layout: 'courses',
    },
    component: () =>
      import(
      /* webpackChunkName: "offline-courses" */
      '@/views/Courses/OfflineCoursesPage.vue'
    ),
  },
  {
    path: '/offline-courses/create-offline-course',
    name: 'create-offline-course',
    meta: {
      layout: 'courses',
    },
    component: () =>
      import(
      /* webpackChunkName: "offline-courses" */
      '@/views/Courses/CreateOfflineCourseForm.vue'
    ),
  },
  {
    path: '/offline-courses/:courseid',
    name: 'offline-course',
    meta: {
      layout: 'courses',
    },
    component: () =>
      import(
      /* webpackChunkName: "online-course" */
      '@/views/Courses/OfflineCourse.vue'
    ),
  },
  // { path: '/admin/:hash', redirect: '/' },
  {
    path: '*',
    redirect: '/',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
