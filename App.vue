<template>
  <view class="container">
    <header />
    <chart />
  </view>
</template>

<script>
import Vue from 'vue-native-core';
import { VueNativeBase } from 'native-base';
import Header from "./src/header.vue";
import Chart from "./src/charts/rChart.js";

Vue.use(VueNativeBase);

export default {
  components: {
    Header,
    Chart
  },
};

</script>
