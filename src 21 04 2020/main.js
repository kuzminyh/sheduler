import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import router from './routes'
import store from './store'
import '@mdi/font/css/materialdesignicons.css'
import * as fb from "firebase/app" // 
import "firebase/auth"

Vue.use(VueRouter)

new Vue({
  el: '#app',
  router,
  vuetify,
  store,
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
  created(){
    var firebaseConfig = {
      apiKey: "AIzaSyDxkJ6DTV0z5HIRUJ2hS4ldQq1LLgiMw2E",
      authDomain: "sheduler-8bbe7.firebaseapp.com",
      databaseURL: "https://sheduler-8bbe7.firebaseio.com",
      projectId: "sheduler-8bbe7",
      storageBucket: "sheduler-8bbe7.appspot.com",
      messagingSenderId: "957883127353",
      appId: "1:957883127353:web:86a67b0b617a871ac65fe8",
      measurementId: "G-LJ2LYNYSKE"
    };
    // Initialize Firebase
    fb.initializeApp(firebaseConfig);
    // firebaseConfig.analytics();
  },
  render: h => h(App)
  
})


