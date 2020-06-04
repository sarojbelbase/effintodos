import Vue from 'vue'
import firebase from 'firebase'
import VueRouter from 'vue-router'
import home from '@/components/home/todos'
import signup from '@/components/auth/signup'
import login from '@/components/auth/login'

Vue.use(VueRouter)


const router = new VueRouter({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: {
        requiresAuth: true
      }
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