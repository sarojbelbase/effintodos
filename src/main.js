import Vue from 'vue'
import app from './app.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'
import 'bulma/css/bulma.css'

let App = null;
Vue.config.productionTip = false

firebase.auth().onAuthStateChanged(() => {

  if (!App) {
    app = new Vue({
      router, store,
      render: h => h(app)
    }).$mount('#app')
  }
})
