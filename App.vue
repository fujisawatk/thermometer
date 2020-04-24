<template>
  <view id="app">
    <header/>
    <view class="container">
      <text-input
        :style="{height: 40, width: 200, borderColor: 'gray', borderWidth: 1}"
        v-model="messageText"
      />
      <nb-button light :on-press="saveMessage"><nb-text>Light</nb-text></nb-button>
      <text v-for="(message, index) in messages" :key="index">{{ message }}</text>
    </view>
  </view>
</template>

<script>
import Vue from "vue-native-core";
import { VueNativeBase } from 'native-base';
import header from './src/components/header';

Vue.use(VueNativeBase);

  export default {
    components: {
      header
    },
    data: function() {
      return {
        messageText: '',
        messages: []
      }
    },
    methods: {
      saveMessage: function() {
        this.messages.push(this.messageText)
        this.messageText = ''
      }
    }
  }
</script>

<style>
.container {
  background-color: white;
  align-items: center;
  justify-content: center;
  flex: 1;
}
.text-color-primary {
  color: blue;
}
</style>