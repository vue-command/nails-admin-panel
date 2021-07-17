import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/commodities',
    name: 'commodities',
    meta: {
      layout: 'shop',
    },
    component: () =>
      import(
        /* webpackChunkName: "shop" */
        '@/views/shop/Shop.vue'
      ),
  },
  {
    path: '/commodities/create',
    name: 'commodity-create',
    meta: {
      layout: 'shop',
    },
    component: () =>
      import(
        /* webpackChunkName: "modify-product" */
        '@/views/shop/ModifyProduct.vue'
      ),
  },
  {
    path: '/commodities/:commodityId',
    name: 'commodity-edit',
    meta: {
      layout: 'shop',
    },
    component: () =>
      import(
        /* webpackChunkName: "modify-product" */
        '@/views/shop/ModifyProduct.vue'
      ),
  },
  {
    path: '/categories',
    name: 'categories',
    meta: {
      layout: 'shop',
    },
    component: () =>
      import(
        /* webpackChunkName: "categories" */
        '@/views/CategoriesPage.vue'
      ),
  },
  {
    path: '/orders',
    name: 'orders',
    component: () =>
      import(
        /* webpackChunkName: "orders" */
        '@/views/Orders.vue'
      ),
  },
  {
    path: '/users',
    name: 'users',
    component: () =>
      import(
        /* webpackChunkName: "users" */
        '@/views/Users.vue'
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
        '@/views/courses/CoursesPage.vue'
      ),
  },
  {
    path: '/online-courses/create-online-course',
    name: 'create-online-course',
    meta: {
      layout: 'courses',
    },
    component: () =>
      import(
        /* webpackChunkName: "online-course-create" */
        '@/views/courses/OnlineCourseCreate.vue'
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
        /* webpackChunkName: "course" */
        '@/views/courses/Course.vue'
      ),
  },
  {
    path: '/online-courses/:courseid/videos',
    name: 'online-course-lessons',
    meta: {
      layout: 'courses',
    },
    component: () =>
      import(
        /* webpackChunkName: "course-videos" */
        '@/views/courses/CourseVideos.vue'
      ),
  },
  {
    path: '/online-courses/:courseid/videos/:lessonid',
    name: 'online-course-lesson',
    meta: {
      layout: 'courses',
    },
    component: () =>
      import(
        /* webpackChunkName: "course-video-detail" */
        '@/views/courses/CourseVideoDetail.vue'
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
        /* webpackChunkName: "offline-courses-page" */
        '@/views/courses/OfflineCoursesPage.vue'
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
        /* webpackChunkName: "offline-course-create" */
        '@/views/courses/OfflineCourseCreate.vue'
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
        /* webpackChunkName: "offline-course" */
        '@/views/courses/OfflineCourse.vue'
      ),
  },
  {
    path: '/delivery',
    name: 'delivery',
    meta: {
      // layout: 'shop',
    },
    component: () =>
      import(
        /* webpackChunkName: "delivery" */
        '@/views/delivery/Delivery.vue'
      ),
  },
  {
    path: '*',
    name: 'not-found',
    component: () =>
      import(
        /* webpackChunkName: "not-found" */
        '@/views/NotFound.vue'
      ),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
