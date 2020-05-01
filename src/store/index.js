import Vue from 'vue-native-core';
import Vuex from 'vuex';
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';
import moment from 'moment';

Vue.use(Vuex);
 
const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24 * 10,
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
    savePost: function(state, postsObj) {
      // 日付を取得してキーとして設定する
      var keyDate = String(this.state.iniDate)
      storage.save({
        key: keyDate,
        data: postsObj
      })
    },
    delPost: function(state, delDate) {
      storage.remove({key: delDate});
    }
  },
  actions: {
    savePostOne: function({commit}, {thermometer}) {
      commit('savePost', {
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
      for (let i=0;i<7;i++) {
        var date = new Date()
        var beforeDay = date.setDate(date.getDate() - i)
        var dString = String(moment(beforeDay).format('MM月DD日'))
        storage
        .load({key: dString})
        .then((val) => {
          this.state.posts.push(val)

          // チャートへの反映
          var hash = {}
          hash.x = val["date"];
          hash.y = Number(val["thermometer"]);
          this.state.chartData.unshift(hash)
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
    delPostOne: function({commit}, index) {
      var post = this.state.posts[index]
      var delDate = post["date"]
      commit('delPost', delDate)

      this.state.posts = []
      this.state.chartData = []
      for (let i=0;i<7;i++) {
        var date = new Date()
        var beforeDay = date.setDate(date.getDate() - i)
        var dString = String(moment(beforeDay).format('MM月DD日'))
        storage
        .load({key: dString})
        .then((val) => {
          if(val) {
          this.state.posts.push(val)
          var hash = {}
          hash.x = val["date"];
          hash.y = Number(val["thermometer"]);
          this.state.chartData.unshift(hash)
          }else{
            console.log("何もない")
          }
        })
      }  
      return
    }
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
        storage
        .load({key: dString})
        .then((val) => {
          if(val) {
          state.posts.push(val)
          var hash = {}
          hash.x = val["date"];
          hash.y = Number(val["thermometer"]);
          state.chartData.unshift(hash)
          }else{
            console.log("何もない")
          }
        })
      }  
    },
  }
});