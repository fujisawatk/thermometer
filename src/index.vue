<template>
    <root class="root">
        <header />
        <chart />

      <!-- 記録リスト一覧 -->
        <nb-container class="index">
          <nb-content>
            <nb-list-item itemDivider>
                <nb-text class="index-title">記録</nb-text>
            </nb-list-item>
            <view v-for="(post, index) in posts" :key="index" >
              <item
                :post="post"
                :sel-index="index"
                :del-post="delPost"
              />
            </view>
          </nb-content>
        </nb-container>

      <!-- モーダル画面 -->
        <modal 
          :isVisible="isModalVisible"
        >
          <view class="modal">
            <nb-header class="modal-header">
              <nb-left  class="modal-header-left">
                <nb-button transparent 
                  :on-press="toggleModal"
                >
                  <nb-icon 
                    class="back-icon"
                    type="Entypo"
                    name="back" />
                </nb-button>
              </nb-left>
              <nb-body class="modal-header-body">
                <nb-title class="modal-header-title">入力フォーム</nb-title>
              </nb-body>
              <nb-right class="modal-header-right" />
            </nb-header>

            <view class="form">
              <nb-item class="date-form">
                <nb-text class="date-title">日付</nb-text>
                <nb-text class="date-text">{{ formatIniDate }}</nb-text>
              </nb-item>

              <nb-item class="temp-form">
                <nb-text class="temp-title">体温</nb-text>
                <view class="temp-group">
                  <select-input
                    :value="pickerValue"
                    :options="thermoData"
                    :onSubmitEditing="onValueChange"
                    :labelStyle="labelStyle"
                  />
                  <nb-text class="temp-unit">℃</nb-text>
                </view>
              </nb-item>

              <nb-item class="cond-form">
                <nb-text class="cond-title">症状</nb-text>
                <view class="cond-group">
                  <nb-checkbox :checked="checkOne" :on-press="changeCheckOne"/>
                  <nb-text class="cond-text">37.5度以上の熱</nb-text>
                </view>
              </nb-item>

              <nb-item class="cond-form">
                <nb-text class="cond-title" />
                <view class="cond-group">
                  <nb-checkbox :checked="checkTwo" :on-press="changeCheckTwo" />
                  <nb-text class="cond-text">せき、たん</nb-text>
                </view>
              </nb-item>

              <nb-item class="cond-form">
                <nb-text class="cond-title" />
                <view class="cond-group">
                  <nb-checkbox :checked="checkThree" :on-press="changeCheckThree" />
                  <nb-text class="cond-text">だるさ</nb-text>
                </view>
              </nb-item>

              <nb-item class="cond-form">
                <nb-text class="cond-title" />
                <view class="cond-group">
                  <nb-checkbox :checked="checkFour" :on-press="changeCheckFour" />
                  <nb-text class="cond-text">息苦しさ</nb-text>
                </view>
              </nb-item>

              <nb-item class="form-bottom">
                <nb-button
                  class="send-btn"
                  :on-press="savePost"
                >
                  <nb-text class="send">完了</nb-text>
                </nb-button>
              </nb-item>
            </view>
          </view>
        </modal>
    
      <!-- 入力フォーム表示ボタン -->
        <view class="footer">
          <view class="button">
            <nb-icon type="FontAwesome5" name="thermometer" class="meter-icon" :on-press="toggleModal" />
          </view>
        </view>
    </root>
</template>


<script>
import { Root } from "native-base";
import Header from "./components/header.vue";
import Chart from "./components/rChart.js";
import Item from "./components/item.vue";
import { Alert } from 'react-native';
import Modal from "react-native-modal";
import React from "react";
import moment from 'moment';
import store from './store';
import SelectInput from 'react-native-select-input-ios'

export default {
  components: {
    Root,
    Header, 
    Chart, 
    Modal,
    Item,
    SelectInput
  },
  data: function() {
    return {
      // モーダルON/OFF
      state: false,
      formatIniDate: moment(new Date()).format('MM月DD日'),
      thermoData: store.state.thermoData,
      labelStyle: { fontSize: 20,
                    backgroundColor: "#eee",
                    padding: 5,
                    width: 60
                  }
    }
  },
  created () {
    store.getters.getPosts;
  },
  computed: {
    // モーダルのON/OFFを監視
    isModalVisible: function() {
      return this.state
    },
    // 初期値の変更を監視
    checkOne: function() {
      return store.state.iniCheckOne;
    },
    checkTwo: function() {
      return store.state.iniCheckTwo;
    },
    checkThree: function() {
      return store.state.iniCheckThree;
    },
    checkFour: function() {
      return store.state.iniCheckFour;
    },
    posts () {
      return store.state.posts;
    },
    pickerValue: function() {
      return store.state.pickerValue
    }
  },
  methods: {
    // モーダルのON/OFF切り替え
    toggleModal: function() {
      return this.state = !this.state
    },

    // チェックのON/OFF切り替え
    changeCheckOne: function() {
      return store.state.iniCheckOne = !store.state.iniCheckOne
    },
    changeCheckTwo: function() {
      return store.state.iniCheckTwo = !store.state.iniCheckTwo
    },
    changeCheckThree: function() {
      return store.state.iniCheckThree = !store.state.iniCheckThree
    },
    changeCheckFour: function() {
      return store.state.iniCheckFour = !store.state.iniCheckFour
    },
    savePost: function() {
      store.dispatch("savePostOne") 
      return this.state = !this.state;
    },
    delPost: function(index) {
      store.dispatch("delPostOne", index)
      return
    },
    onValueChange: function(value){
      var selObj = store.state.thermoData[value]
      store.state.pickerValue = selObj["value"]
      store.state.iniThermometer = selObj["label"]
      return
    },
  }
};
</script> 

<style>
.root {
  flex: 1;
  position: relative;
}

.index-title {
  flex: 1;
  text-align: center;
  font-weight: bold;
}

.footer {
  position: absolute;
  right: 20;
  bottom: 20;
}

.button {
  position: relative;
  background-color: #91e4fb;
  width: 80px;
  height: 80px;
  border-radius: 40px;
  border-width: 2;
  border-color: #444;
}

.meter-icon {
  font-size: 40px;
  color: #111;
  position: absolute;
  top: 20;
  right: 0;
  left: 15;
  bottom: 0;
}

/* モーダル画面 */
.modal {
  background-color: #fff;
  height: 95%;
}

.modal-header {
  flex-direction: row;
  background-color: #91e4fb;
}

.modal-header-left,
.modal-header-right {
  flex: 1;
}
.modal-header-body {
  flex: 5;
  align-items: center;
}

.modal-header-title {
  color: black;
  font-weight: bold;
}

.back-icon {
  color: black;
}

.form {
  flex: 1;
}

.date-form {
  flex: 1;
  border-color: #fff;
}

.temp-form,
.cond-form {
  flex: 1;
  flex-direction: row;
  border-color: #fff;
}

.date-title,
.temp-title,
.cond-title {
  flex: 1;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}

.date-text,
.temp-group {
  flex: 2;
  flex-direction: row;
  align-items: center;
  font-size: 20px;
  margin-left: 15;
}

.cond-group {
  flex: 2;
  flex-direction: row;
  align-items: center;
  font-size: 20px;
}

.temp-unit{
  margin-left: 10;
  font-size: 20;
}
.cond-text {
  margin-left: 15;
  font-size: 20;
}

.form-bottom {
  flex: 3;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-color: #fff;
}

.send-btn {
  flex: 0.3;
  flex-direction: column;
  justify-content: center;
  width: 40%;
  background-color: #91e4fb;
  color: black;
  border-width: 2;
  border-color: #444;
  border-radius: 35;
}

.send {
  font-size: 20;
  font-weight: bold;
  color: #111;
}

</style>