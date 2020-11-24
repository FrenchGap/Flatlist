import Axios from 'axios'
import store from '..';

export const Auth = {
  namespaced: true,

  state: {
    token: null,
    authenticated: false,
  },

  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem('t', token);
    },

    DEL_TOKEN(state) {
      state.token = null;
      localStorage.removeItem('t');
    },

    SET_AUTHENTICATED(state) {
      state.authenticated = true;
    },

    DEL_AUTHENTICATED(state) {
      state.authenticated = false;
    }
  },

  getters: {
    async checkAuthenticated() {
      if (store.state.Auth.authenticated) {
        return true;
      } else if (store.state.Auth.token || localStorage.getItem('t')) {
        let params = {
          'api_token': store.state.Auth.token ? store.state.Auth.token : localStorage.getItem('t'),
        };
        let resultingState = await Axios.get(process.env.VUE_APP_API_URL + '/checktoken', {
          params: params
        })
        .then(async(response) => {
          await store.dispatch('User/setUser', response.data.user);
          await store.dispatch('Auth/setToken', response.data.token);
          await store.dispatch('Auth/setAuthenticated');
          return true;
        })
        .catch(() => {
          store.dispatch('Auth/delToken');
          store.dispatch('Auth/delAuthenticated');
          store.dispatch('User/delUser');
          return false;
        });
        return resultingState;
      } else {
        return false;
      }
    }
  },

  actions: {
    setToken({ commit }, token) {
      commit('SET_TOKEN', token);
    },

    delToken({ commit }) {
      commit('DEL_TOKEN');
    },

    setAuthenticated({ commit }) {
      commit('SET_AUTHENTICATED');
    },

    delAuthenticated({ commit }) {
      commit('DEL_AUTHENTICATED');
    }
  }
}