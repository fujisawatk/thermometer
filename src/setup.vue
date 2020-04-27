<template>
  <view class="container">
    <app />
  </view>
</template>

<script>
import Vue from 'vue-native-core';
import { VueNativeBase } from 'native-base';
import App from "./index.vue";


Vue.use(VueNativeBase);

export default {
  components: {
    App
  }
};
</script>

<style>
.container {
  flex: 1;
}
</style>