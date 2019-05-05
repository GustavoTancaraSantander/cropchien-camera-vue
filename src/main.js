import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'

import { firebaseApp } from "./configFirebase";
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  
  mounted () {
    console.log('mounted FIREBASE', firebaseApp )  
  }
  
}).$mount('#app')
