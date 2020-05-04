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
    // 一覧表示用データを格納
    posts: [],
    // チャート表示用データを格納
    chartData: [],
    // 初期値
    iniDate: moment(new Date()).format('MM月DD日'),
    iniCheckOne: false,
    iniCheckTwo: false,
    iniCheckThree: false,
    iniCheckFour: false,
    iniThermometer: "36.5",
    // pickerで体温値を取得する際に使用するindex値
    pickerValue: 25,
    // pickerで表示する体温値
    thermoData: []
  },
  mutations: {
    savePost: function(state, postsObj) {
      // 日付を取得してキーとして設定
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
            var hash1 = {}
            hash1.x = val["date"];
            hash1.y = Number(val["thermometer"]);
            state.chartData.unshift(hash1)
            }else{
              console.log("何もない")
          }
        })
      }
      // pickerで表示する体温値を準備
      var thermo = "34.0"
      for (let i=0;i<61;i++) {
        var hash2 = {}
        hash2.value = Number(i)
        hash2.label = thermo
        state.thermoData.push(hash2)
        var nThermo = Number(thermo) + 0.1
        thermo = String(nThermo.toFixed(1))
      }
    },
  }
});