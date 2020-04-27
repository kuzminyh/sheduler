import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import mask from 'vue-the-mask'

 
Vue.use(mask)

Vue.config.productionTip = false


// To avoid some annoying warning
// https://github.com/vuetifyjs/vuetify/issues/9999
const ignoreWarnMessage = 'The .native modifier for v-on is only valid on components but it was used on <div>.'
Vue.config.warnHandler = function (msg, vm, trace) {
  trace
  if (msg === ignoreWarnMessage) {
    msg = null
    vm = null
    trace = null
  }
}
new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
  created() {
   /* var firebaseConfig = {
      apiKey: "AIzaSyDxkJ6DTV0z5HIRUJ2hS4ldQq1LLgiMw2E",
      authDomain: "sheduler-8bbe7.firebaseapp.com",
      databaseURL: "https://sheduler-8bbe7.firebaseio.com",
      projectId: "sheduler-8bbe7",
      storageBucket: "sheduler-8bbe7.appspot.com",
      messagingSenderId: "957883127353",
      appId: "1:957883127353:web:86a67b0b617a871ac65fe8",
      measurementId: "G-LJ2LYNYSKE"
    };
  
     firebase.initializeApp(firebaseConfig);
   //  firebase.analytics();*/
  },
}).$mount('#app')
