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
    chartData: []
  },
  mutations: {
    savePosts: function(state, postsObj) {
      // console.log(String(this.state.id))
      // 日付を取得してキーとして設定する
      var keyDate = String(this.state.iniDate)
      console.log(keyDate)
      storage.save({
        key: keyDate,
        data: postsObj
      })
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
        checkFour: this.state.iniCheckFour
      })
      // state定義の初期値をリセット
      this.state.iniCheckOne = false
      this.state.iniCheckTwo = false
      this.state.iniCheckThree = false
      this.state.iniCheckFour = false

      // 記録一覧表示処理
      this.state.posts = []
      this.state.chartData = []
      // 今日の日付から過去の７日分をとる（繰り返し）
      for (let i=0;i<7;i++) {
        // その日付をキーとしたデータを取得する
        var date = new Date()
        var beforeDay = date.setDate(date.getDate() - i)
        // 取得した前日のデータをフォーマットする
        var dString = String(moment(beforeDay).format('MM月DD日'))
        console.log(dString)
        storage
        .load({key: dString})
        .then((val) => {
          console.log(val)
          this.state.posts.push(val)

          // チャートへの反映
          var hash = {}
          hash.x = val["date"];
          hash.y = Number(val["thermometer"]);
          this.state.chartData.unshift(hash)
          console.log(state.chartData)
        })
        .catch(err => {
          console.warn(err.message);
          switch (err.name) {
            case 'NotFoundError':
              // TODO;
              break;
            case 'ExpiredError':
              // TODO
              break;
          }
        })  
      }
    },
  },
  getters: {
    getPosts: function(state) {
      state.posts = []
      state.chartData = []
      // 今日の日付から過去の７日分をとる（繰り返し）
      for (let i=0;i<7;i++) {
        // その日付をキーとしたデータを取得する
        var date = new Date()
        var beforeDay = date.setDate(date.getDate() - i)
        // 取得した前日のデータをフォーマットする
        var dString = String(moment(beforeDay).format('MM月DD日'))
        console.log(dString)
        storage
        .load({key: dString})
        .then((val) => {
          if(val) {
          console.log(val)
          state.posts.push(val)
          var hash = {}
          hash.x = val["date"];
          hash.y = Number(val["thermometer"]);
          state.chartData.unshift(hash)
          console.log(state.chartData)
          }else{
            console.log("何もない")
          }
        })
      }  
    },
             
    // 全件削除（デバッグ用）
    delPosts: function(state) {
      state.posts = []
      storage.remove({key: "05月01日"});
      return
    }
  }
});