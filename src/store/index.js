import Vue from 'vue-native-core';
import Vuex from 'vuex';
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';
import moment from 'moment';

Vue.use(Vuex);
 
const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600,
  enableCache: true,
  sync: {}
});

export default new Vuex.Store({
  state: {
    posts: [],
    // 初期値
    iniDate: moment(new Date()).format('MM月DD日'),
    iniCheckOne: false,
    iniCheckTwo: false,
    iniCheckThree: false,
    iniCheckFour: false,
    id: 0
  },
  mutations: {
    savePosts: function(state, postsObj) {
      console.log(String(this.state.id))
      storage.save({
        key: 'posts',
        id: String(this.state.id),
        data: postsObj
      })
    }
  },
  actions: {
    savePostsOne: function({commit}, {thermometer}) {
      this.state.id++
      commit('savePosts', {
        date: this.state.iniDate,
        thermometer: thermometer,
        checkOne: this.state.iniCheckOne,
        checkTwo: this.state.iniCheckTwo,
        checkThree: this.state.iniCheckThree,
        checkFour: this.state.iniCheckFour
      })
      // state定義の初期値をリセット
      this.state.iniCheckOne = false
      this.state.iniCheckTwo = false
      this.state.iniCheckThree = false
      this.state.iniCheckFour = false

      // 記録一覧表示処理
      this.state.posts = []
      storage
        .getIdsForKey('posts')
        .then((ids) => {
          if (ids){
            for (var i in ids) {
              storage.load({
                key: 'posts',
                id: ids[i]
              }).then((val) => {
              this.state.posts.push(val)    
              })
            }
            return console.log(`${ids.length}` + "件取得しました");
          }else{
            return console.log("何もない")
          }
        })
    },
  },
  getters: {
    getPosts: function(state) {
      state.posts = []
      storage
        .getIdsForKey('posts')
        .then((ids) => {
          if (ids){
            for (var i in ids) {
              storage.load({
                key: 'posts',
                id: ids[i]
              }).then((val) => {
              state.posts.push(val)    
              })
            }
            return;
          }else{
            return console.log("何もない")
          }
        })
    },
    // 全件削除（デバッグ用）
    delPosts: function(state) {
      state.posts = []
      storage.clearMapForKey('posts');
      return
    }
  }
});