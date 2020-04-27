import Vue from 'vue'
import Vuex from 'vuex'
import eventstore from './eventstore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    eventstore
  }
})
