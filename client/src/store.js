import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  isAuth: false,//是否认证
  user: {},//登录用户信息
};

const getters = {
  isAuth: state => state.isAuth,
  user: state => state.user
};

const mutations = {
  setAuth(state,isAuth){
    state.isAuth = isAuth;
  },
  setUser(state,user){
    state.user = user;
  }
};

const actions = {
  setAuth({commit},isAuth){
    commit('setAuth',isAuth);
  },
  setUser({commit},user){
    commit('setUser',user)
  },
  logout({commit}){
    commit('setAuth',false);
    commit('setUser',false);
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
