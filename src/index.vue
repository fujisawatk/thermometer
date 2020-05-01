<template>
    <root class="root">
        <header />
        <chart />

      <!-- 記録リスト一覧 -->
        <nb-container class="index">
          <nb-content>
            <nb-list-item itemHeader first>
                <nb-text :style="{ fontSize: '25' }">記録</nb-text>
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
                <nb-text class="date-text">{{ formatIniDate }}</nb-text>
              </nb-item>

              <nb-item class="temp-form">
                <nb-text class="temp-title">体温</nb-text>
                <text-input class="temp-input" v-model="iniThermometer" />
                <nb-text class="temp-unit">℃</nb-text>
              </nb-item>
              <nb-item class="cond-form">
                <nb-text class="cond-title">症状</nb-text>
                <nb-checkbox :checked="checkOne" :on-press="changeCheckOne"/>
                <nb-text class="cond-text">37.5度以上の熱</nb-text>
              </nb-item>

              <nb-item class="cond-form">
                <nb-text class="cond-title" />
                <nb-checkbox :checked="checkTwo" :on-press="changeCheckTwo" />
                <nb-text class="cond-text">せき、たん</nb-text>
              </nb-item>

              <nb-item class="cond-form">
                <nb-text class="cond-title" />
                <nb-checkbox :checked="checkThree" :on-press="changeCheckThree" />
                <nb-text class="cond-text">だるさ</nb-text>
              </nb-item>

              <nb-item class="cond-form">
                <nb-text class="cond-title" />
                <nb-checkbox :checked="checkFour" :on-press="changeCheckFour" />
                <nb-text class="cond-text">息苦しさ</nb-text>
              </nb-item>

            </view>
            <view class="form-bottom">
              <nb-button large rounded
                class="send-btn"
                :on-press="savePost"
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
import Chart from "./components/chart.vue";
import Item from "./components/item.vue";
import { Alert } from 'react-native';
import Modal from "react-native-modal";
import React from "react";
import moment from 'moment';
import store from './store';


export default {
  components: {
    Root,
    Header, 
    Chart, 
    Modal,
    Item
  },
  data: function() {
    return {
      // モーダルON/OFF
      state: false,
      formatIniDate: moment(new Date()).format('MM月DD日'),
      iniThermometer: "36.5",
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

    // 記録を保存して、モーダルを閉じる
    savePost: function() {
      store.dispatch("savePostOne", {
        thermometer: this.iniThermometer
      })
      this.iniThermometer = "36.5"
      return this.state = !this.state;
    },

    // 記録全件削除処理（デバッグ用）
    delPosts: function() {
      store.getters.delPosts;
      return Alert.alert("削除しました")
    },
    delPost: function(index) {
      store.dispatch("delPostOne", index)
      return
    }
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

.date-text,
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