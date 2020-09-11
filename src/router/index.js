import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Shop from '../views/Shop/Shop.vue'
import Courses from '../views/Courses/Courses.vue'
import AddCourse from '../views/Courses/AddCourse.vue'

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
    path: '/add-course',
    name: 'add-course',
    component: AddCourse
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
