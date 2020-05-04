<template>
  <nb-list-item icon class=list >
    <nb-body class="list-left">
      <nb-text class="list-day">{{ post.date }}</nb-text>
    </nb-body>
    <nb-body class="list-body">
      <nb-text class="list-temp">{{ post.thermometer }}℃</nb-text>
    </nb-body>
    <nb-right class="list-right">
      <view class="icon-group">
        <nb-icon class="uncheck-icon" type="FontAwesome" name="square-o" v-if="post.checkOne == false"/>
        <nb-icon class="check-icon" type="FontAwesome" name="square" v-else />
        <nb-icon class="uncheck-icon" type="FontAwesome" name="square-o" v-if="post.checkTwo == false"/>
        <nb-icon class="check-icon" type="FontAwesome" name="square" v-else />
        <nb-icon class="uncheck-icon" type="FontAwesome" name="square-o" v-if="post.checkThree == false"/>
        <nb-icon class="check-icon" type="FontAwesome" name="square" v-else />
        <nb-icon class="uncheck-icon" type="FontAwesome" name="square-o" v-if="post.checkFour == false"/>
        <nb-icon class="check-icon" type="FontAwesome" name="square" v-else />
      </view>
      <view class="del">
        <nb-icon class="del-icon" type="FontAwesome5" name="trash" :on-press="delPostPress" />
      </view>
    </nb-right>
  </nb-list-item>
</template>

<script>
export default {
  props: {
    post: Object,
    selIndex: Number,
    delPost: Function
  },
  methods: {
    delPostPress: function() {
      this.delPost(this.selIndex) 
    }
  }
}
</script>

<style>
.list {
  flex: 1;
  flex-direction: row;
}
.list-left,
.list-body {
  flex: 3;
  align-items: center;
}
.list-day,
.list-temp {
  font-size: 18;
}
.list-right {
  flex: 5;
}
.icon-group {
  flex: 3;
  flex-direction: row;
  align-items: center;
}
.uncheck-icon {
  flex: 1;
  color: #444;
  font-size: 22;
}
.check-icon {
  flex: 1;
  color: #444;
  font-size: 20;
}
.del {
  flex: 1;
  flex-direction: row;
}
.del-icon {
  flex: 1;
  color: rgb(139, 91, 139);
  margin-left: 10;
}
</style>