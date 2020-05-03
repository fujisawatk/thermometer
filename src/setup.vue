<template>
  <view class="container">
    <app-loading v-if="!isAppReady" />
    <app v-else />
  </view>
</template>

<script>
import Vue from 'vue-native-core';
import { VueNativeBase } from 'native-base';
import App from "./index.vue";
import { AppLoading } from 'expo';


Vue.use(VueNativeBase);

export default {
  components: { App, AppLoading },
  data: function() {
    return {
      isAppReady: false,
    };
  },
  created: function() {
    this.loadFonts();
  },
  methods: {
    loadFonts: async function() {
      try {
        this.isAppReady = false;
        await Expo.Font.loadAsync({
          Roboto: require('native-base/Fonts/Roboto.ttf'),
          Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        });
        this.isAppReady = true;
      } catch (error) {
        console.log('some error occured', error);
        this.isAppReady = true;
      }
    },
  },
};
</script>

<style>
.container {
  flex: 1;
}
</style>