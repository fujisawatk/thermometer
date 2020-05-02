import Vue from 'vue-native-core';
import Vuex from 'vuex';
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';
import moment from 'moment';

Vue.use(Vuex);
 
const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 240,
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
    chartData: [],
    iniThermometer: "36.5",
    thermoData: [
      "34.0","34.1","34.2","34.3","34.4","34.5","34.6","34.7","34.8","34.9",
      "35.0","35.1","35.2","35.3","35.4","35.5","35.6","35.7","35.8","35.9",
      "36.0","36.1","36.2","36.3","36.4","36.5","36.6","36.7","36.8","36.9",
      "37.0","37.1","37.2","37.3","37.4","37.5","37.6","37.7","37.8","37.9",
      "38.0","38.1","38.2","38.3","38.4","38.5","38.6","38.7","38.8","38.9",
      "39.0","39.1","39.2","39.3","39.4","39.5","39.6","39.7","39.8","39.9",
      "40.0","40.1","40.2","40.3","40.4","40.5","40.6","40.7","40.8","40.9",
      "41.0","41.1","41.2","41.3","41.4","41.5","41.6","41.7","41.8","41.9",
    ]
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
    savePostOne: function({commit}) {
      commit('savePost', {
        date: this.state.iniDate,
        thermometer: this.state.iniThermometer,
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
      this.state.iniThermometer = "36.5"

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
      for (let i=0;i<7;i++) {
        var date = new Date()
        var beforeDay = date.setDate(date.getDate() - i)
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