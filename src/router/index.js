import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Shop from '../views/Shop/Shop.vue'
import Courses from '../views/Courses/Courses.vue'
import OnlineCourses from '../views/Courses/OnlineCourses.vue'
import OfflineCourses from '../views/Courses/OfflineCourses.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/shop',
    name: 'ShopEdit',
    component: Shop
  },
  {
    path: '/courses',
    name: 'courses',
    component: Courses
  },
  {
    path: '/online-courses',
    name: 'online-courses',
    component: OnlineCourses
  },
  {
    path: '/offline-courses',
    name: 'offline-courses',
    component: OfflineCourses
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
