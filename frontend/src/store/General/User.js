export const User = {
  namespaced: true,

  state: {
    user: null,
    fname: null,
    lname: null,
    email: null,
    admin: null,
  },

  mutations: {
    SET_USER(state, user) {
      state.user = user;
      state.fname = user['fname'];
      state.lname = user['lname'];
      state.email = user['email'];
      if (user['admin']) {
        state.admin = true;
      } else {
        state.admin = false;
      }
    },

    DEL_USER(state) {
      state.user = null;
      state.fname = null;
      state.lname = null;
      state.email = null;
      state.admin = null;
    }
  },

  getters: {
    
  },

  actions: {
    setUser({ commit }, user) {
      commit('SET_USER', user);
    },

    delUser({ commit }) {
      commit('DEL_USER');
    }
  }
}