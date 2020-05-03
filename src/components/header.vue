<template>
  <nb-header class="header">
    <nb-left class="header-left"/>
    <nb-body class="header-body">
      <nb-title class="header-title">検温アプリ</nb-title>
    </nb-body>
    <nb-right class="header-right">
      <nb-button transparent>
        <nb-icon class="medical-icon" type="FontAwesome5" name="hospital-alt" :on-press="openLink" />
      </nb-button>
    </nb-right>
  </nb-header>
</template>

<script>
import { Linking } from "react-native";

export default {
  methods: {
      openLink: function() {
        Linking
          .openURL("https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/dengue_fever_qa_00001.html")
          .catch(
            err => console.error('URLを開けませんでした。', err)
          );
      }
  },
};
</script>

<style>
.header {
  flex-direction: row;
  background-color: #91e4fb;
}

.header-left,
.header-right{
  flex:1;
}

.header-body {
  flex: 1;
  align-items: center;
}
.header-title {
  color: black;
  font-weight: bold;
}

.medical-icon {
  color: black;
}
</style>