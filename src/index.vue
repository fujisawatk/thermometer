<template>
    <root class="root">
      <safe-area-view
        class="safe-area"
      >
        <header />
        <chart />
        <list />

        <modal 
          :isVisible="isModalVisible"
        >
          <view class="modal">
              <text>Modal Content</text>
              <button
                  title="Close modal"
                  :on-press="toggleModal"
              />
          </view>
        </modal>
    
        <!-- <btn
          class="footer"
          :on-press="toggleModal"
        /> -->
        <view class="footer">
          <view class="button">
            <nb-icon type="AntDesign" name="plus" class="plus" :on-press="toggleModal" />
          </view>
        </view>

      </safe-area-view>
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
      state: false
    }
  },
  computed: {
    isModalVisible: function() {
      return this.state
    }
  },
  methods: {
    toggleModal: function() {
      return this.state = !this.state
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
  border-style: solid;
}
.plus {
  font-size: 90px;
  position: absolute;
  top: 20;
  right: 0;
  left: 20;
  bottom: 0;
}
.safe-area {
  flex: 1;
}

.modal {
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}

</style>