<template>
    <root class="root">
      <header />
      <chart />
      <list />
      <btn class="footer" />
    </root>
</template>


<script>
import { Root } from "native-base";
import Header from "./components/header.vue";
import Chart from "./components/rChart.js";
import List from "./components/list.vue";
import Btn from "./components/btn.vue";

export default {
  components: {
    Root,
    Header, 
    Chart, 
    List,
    Btn
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
</style>