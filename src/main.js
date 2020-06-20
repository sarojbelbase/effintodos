import Vue from 'vue'
import app from './app.vue'
import VueMeta from 'vue-meta'
import router from '../src/router'
import { store } from '../src/store'
import firebase from 'firebase/app'
import 'bulma/css/bulma.css'
import 'firebase/auth'

Vue.use(VueMeta)

let App = null;
Vue.config.productionTip = false

firebase.auth().onAuthStateChanged(() => {

  if (!App) {
    App = new Vue({
      router, store,
      render: h => h(app)
    }).$mount('#app')
  }
})
