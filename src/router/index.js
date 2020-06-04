import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/components/home/todos'
import signup from '@/components/auth/signup'
import login from '@/components/auth/login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: home
  },
  {
    path: '/auth/login',
    name: 'login',
    component: login
  },
  {
    path: '/auth/signup',
    name: 'signup',
    component: signup
  },
]

const router = new VueRouter({
  routes
})

export default router
