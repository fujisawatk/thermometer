import Vue from 'vue-native-core';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 保存データ
    posts: [],
    // 初期値
    iniDate: new Date(),
    iniCheckOne: false,
    iniCheckTwo: false,
    iniCheckThree: false,
    iniCheckFour: false,
  },
  mutations: {
    savePosts: function(state, postsObj) {
      state.posts.push(postsObj)
    }
  },
  actions: {
    savePostsOne: function({commit}, {thermometer}) {
      commit('savePosts', {
          date: this.state.iniDate,
          thermometer: thermometer,
          checkOne: this.state.iniCheckOne,
          checkTwo: this.state.iniCheckTwo,
          checkThree: this.state.iniCheckThree,
          checkFour: this.state.iniCheckFour,
      })
      this.state.iniCheckOne = false
      this.state.iniCheckTwo = false
      this.state.iniCheckThree = false
      this.state.iniCheckFour = false
    }
  }
});