import Vue from 'vue'
import Vuex from 'vuex'
import { AppState } from './General/AppState'
import { Auth } from './General/Auth'
import { User } from './General/User'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    AppState: AppState,
    Auth: Auth,
    User: User,
  }
})
