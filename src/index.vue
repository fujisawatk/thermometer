<template>
    <root class="root">
        <header />
        <chart />
        <list />

      <!-- モーダル画面 -->
        <modal 
          :isVisible="isModalVisible"
        >
          <view class="modal">
            <nb-header>
              <nb-left>
                <nb-button transparent 
                  :on-press="toggleModal"
                >
                  <nb-icon 
                    type="Entypo"
                    name="back" />
                </nb-button>
              </nb-left>
              <nb-body>
                <nb-title>入力フォーム</nb-title>
              </nb-body>
              <nb-right />
            </nb-header>

            <view class="form">
              <nb-item class="date-form">
                <nb-text class="date-title">日付</nb-text>
                <nb-date-picker
                  :defaultDate="iniDate"
                  :modalTransparent="false"
                  androidMode="default"
                  :textStyle="{ color: 'black', fontSize: 25 }"
                  :formatChosenDate="formatChosenDate"
                />
              </nb-item>

              <nb-item class="temp-form">
                <nb-text class="temp-title">体温</nb-text>
                <text-input placeholder="例）36.0" class="temp-input" />
                <nb-text class="temp-unit">℃</nb-text>
              </nb-item>
              <nb-item class="cond-form">
                <nb-text class="cond-title">症状</nb-text>
                <nb-checkbox :checked="iniCheckOne" :on-press="changeCheckOne"/>
                <nb-text class="cond-text">37.5度以上の熱</nb-text>
              </nb-item>

              <nb-item class="cond-form">
                <nb-text class="cond-title" />
                <nb-checkbox :checked="iniCheckTwo" :on-press="changeCheckTwo" />
                <nb-text class="cond-text">せき、たん</nb-text>
              </nb-item>

              <nb-item class="cond-form">
                <nb-text class="cond-title" />
                <nb-checkbox :checked="iniCheckThree" :on-press="changeCheckThree" />
                <nb-text class="cond-text">だるさ</nb-text>
              </nb-item>

              <nb-item class="cond-form">
                <nb-text class="cond-title" />
                <nb-checkbox :checked="iniCheckFour" :on-press="changeCheckFour" />
                <nb-text class="cond-text">息苦しさ</nb-text>
              </nb-item>

            </view>
            <view class="form-bottom">
              <nb-button large rounded
                class="send-btn"
                :on-press="toggleModal"
              >
                <nb-text class="send">完了</nb-text>
              </nb-button>
            </view>
          </view>
        </modal>
    

        <view class="footer">
          <view class="button">
            <nb-icon type="AntDesign" name="plus" class="plus" :on-press="toggleModal" />
          </view>
        </view>
    </root>
</template>


<script>
import { Root } from "native-base";
import Header from "./components/header.vue";
import Chart from "./components/rChart.js";
import List from "./components/list.vue";
// import Btn from "./components/btn.vue";
import { SafeAreaView } from 'react-native';
import Modal from "react-native-modal";
import React from "react";
import moment from 'moment';

export default {
  components: {
    Root,
    Header, 
    Chart, 
    List,
    // Btn,
    SafeAreaView,
    Modal
    
  },
  data: function() {
    return {
      state: false,
      chosenDate: new Date(),
      formatChosenDate: date => moment(date).format('YYYY年MM月DD日'),
      // 初期値
      iniDate: new Date(),
      iniThermometer: 36.5,
      iniCheckOne: false,
      iniCheckTwo: false,
      iniCheckThree: false,
      iniCheckFour: false,
    }
  },
  computed: {
    // モーダルのON/OFFを監視
    isModalVisible: function() {
      return this.state
    },
    // チェックのON/OFFを監視
    showCheckOne: function() {
      return this.iniCheckOne;
    },
    showCheckTwo: function() {
      return this.iniCheckTwo;
    },
    showCheckThree: function() {
      return this.iniCheckThree;
    },
    showCheckFour: function() {
      return this.iniCheckFour;
    }
  },
  methods: {
    // モーダルのON/OFF切り替え
    toggleModal: function() {
      return this.state = !this.state
    },
    // チェックのON/OFF切り替え
    changeCheckOne: function() {
      return this.iniCheckOne = !this.iniCheckOne
    },
    changeCheckTwo: function() {
      return this.iniCheckTwo = !this.iniCheckTwo
    },
    changeCheckThree: function() {
      return this.iniCheckThree = !this.iniCheckThree
    },
    changeCheckFour: function() {
      return this.iniCheckFour = !this.iniCheckFour
    },
  }
};
</script> 

<style>
.root {
  position: relative;
}

.footer {
  position: absolute;
  right: 20;
  bottom: 20;
}

.button {
  position: relative;
  background-color: #91e4fb;
  width: 130px;
  height: 130px;
  border-radius: 65px;
  border-width: 2;
  border-color: #444;
}

.plus {
  font-size: 90px;
  color: #111;
  position: absolute;
  top: 20;
  right: 0;
  left: 20;
  bottom: 0;
}

/* モーダル画面 */
.modal {
  background-color: #fff;
  height: 90%;
}

.date-form {
  height: 80px;
  margin-top: 30px;
  border-color: #fff;
}

.temp-form,
.cond-form {
  height: 80px;
  border-color: #fff;
}

.date-title,
.temp-title,
.cond-title {
  height: 100%;
  width: 30%;
  text-align: center;
  line-height: 80;
  font-size: 25px;
  font-weight: bold;
}

.temp-input {
  padding: 10px 60px;
  font-size: 20;
  border-width: 1;
  width: 100px;
  margin-left: 40px;
}

.temp-unit,
.cond-text {
  font-size: 20px;
  margin-left: 15px;
}

.form-bottom {
  margin-top: 50px;
  position: relative;
}

.send-btn {
  background-color: #91e4fb;
  color: black;
  width: 200px;
  position: absolute;
  right: 25%;
  border-width: 2;
  border-color: #444;
}

.send {
  flex: 1;
  text-align: center;
  font-weight: bold;
  color: #111;
}

</style>