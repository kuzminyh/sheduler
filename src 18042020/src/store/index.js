import Vue from 'vue'
import Vuex from 'vuex'
import eventstore from './eventstore'
import auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    eventstore,
    auth
  }
})
