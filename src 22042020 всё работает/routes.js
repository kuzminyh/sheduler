import VueRouter from 'vue-router'
import Home from './pages/Home'
import Cars from './pages/Cars'
import Car from './pages/Car'
import Login from './pages/Login.vue'
import Sheduler from './pages/Sheduler.vue'

export default new VueRouter({
  routes: [
    {
      path: '',
      component: Home
    },
    {
      path: '/cars',
      component: Cars
    },
    {
      path: '/car/:id',
      component: Car
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/sheduler',
      name: 'sheduler',
      component: Sheduler
   },
  ],
  mode: 'history'
})
