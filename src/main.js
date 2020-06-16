import Vue from 'vue'
import app from './app.vue'
import router from '../src/router'
import { store } from '../src/store'
import firebase from 'firebase'
import 'bulma/css/bulma.css'

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
