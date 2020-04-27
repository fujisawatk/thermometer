<template>
    <root>
      <header />
      <chart />
      <list />
    </root>
</template>


<script>
import { Root } from "native-base";
import Header from "./components/header.vue";
import Chart from "./components/rChart.js";
import List from "./components/list.vue";

export default {
  components: {
    Root,
    Header, 
    Chart, 
    List
  }
};
</script> 