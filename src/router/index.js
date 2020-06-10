import Vue from 'vue'
import firebase from 'firebase'
import VueRouter from 'vue-router'
import home from '@/components/home/todos'
import signup from '@/components/auth/signup'
import login from '@/components/auth/login'
import about from '@/components/home/about'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'about',
      component: about,
      meta: {
        title: 'Effintodos | About',
      }
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: {
        requiresAuth: true,
        title: 'Effintodos',
      }
    },
    {
      path: '/auth/login',
      name: 'login',
      component: login,
      meta: {
        title: 'Effintodos | Login Page',
      }
    },
    {
      path: '/auth/signup',
      name: 'signup',
      component: signup,
      meta: {
        title: 'Effintodos | Signup Page',
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    let user = firebase.auth().currentUser
    if (user) {
      next()
    } else {
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

export default router