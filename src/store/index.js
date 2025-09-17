import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const api = axios.create({ baseURL: '/api' });

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,
    user: null,
    isDark: JSON.parse(localStorage.getItem('isDark') || 'false')
  },
  getters: {
    isAuthenticated: state => !!state.token,
    isDark: state => state.isDark
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      if (token) localStorage.setItem('token', token); else localStorage.removeItem('token');
    },
    setUser(state, user) { state.user = user; },
    toggleDark(state) {
      state.isDark = !state.isDark;
      localStorage.setItem('isDark', JSON.stringify(state.isDark));
    }
  },
  actions: {
    async login({ commit }, { email, password }) {
      const { data } = await api.post('/auth/login', { email, password });
      commit('setToken', data.token);
    },
    async register(context, { name, email, password }) {
      await api.post('/auth/register', { name, email, password });
    },
    logout({ commit }) {
      commit('setToken', null);
      commit('setUser', null);
    }
  }
});


