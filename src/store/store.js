import { createStore } from 'vuex';
import AuthService from '@/service/authService.js';

const store = createStore({
  state() {
    return {
      user: null,
      token: null
    };
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      console.log("Current user set to:", user);
    },
    setToken(state, token) {
      state.token = token;
      console.log("Current token set to:", token);
    }
  },
  actions: {
    async login({ commit }, userData) {
      try {
        const response = await AuthService.login(userData.email, userData.password);
        commit('setUser', response.data.user);
        commit('setToken', response.data.accessToken);
        return response.data;
      } catch (error) {
        console.error('Failed to login', error);
        throw new Error('Failed to login');
      }
    },
    async logout({ commit }) {
      try {
        await AuthService.logout();
        commit('setUser', null);
        commit('setToken', null);
      } catch (error) {
        console.error('Failed to logout', error);
        throw new Error('Failed to logout');
      }
    }
  },
  getters: {
    userEmail(state) {
      console.log("Getting userEmail:", state.user ? state.user.email : "no user");
      return state.user ? state.user.email : null;
    },
    isAuthenticated(state) {
      return !!state.token;
    },
    isAdministrator(state) {
      if (state.user === null) {
        return false;
      }
      return state.user.role === '1';
    },
    isMaster(state) {
      return state.user && state.user.role === '2';
    },
    userInfo(state) {
      return state.user;
    }
  }
});

export default store;