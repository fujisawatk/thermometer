<template>
  <nb-list-item icon class=list >
    <nb-body>
      <nb-text class="list-day">{{ post.date }}</nb-text>
    </nb-body>
    <nb-body>
      <nb-text class="list-temp">{{ post.thermometer }}℃</nb-text>
    </nb-body>
    <nb-right>
      <nb-icon class="check-icon" type="FontAwesome" name="square-o" v-if="post.checkOne == false"/>
      <nb-icon class="check-icon" type="FontAwesome" name="square" v-else />
      <nb-icon class="check-icon" type="FontAwesome" name="square-o" v-if="post.checkTwo == false"/>
      <nb-icon class="check-icon" type="FontAwesome" name="square" v-else />
      <nb-icon class="check-icon" type="FontAwesome" name="square-o" v-if="post.checkThree == false"/>
      <nb-icon class="check-icon" type="FontAwesome" name="square" v-else />
      <nb-icon class="check-icon" type="FontAwesome" name="square-o" v-if="post.checkFour == false"/>
      <nb-icon class="check-icon" type="FontAwesome" name="square" v-else />
      <nb-icon class="space" type="FontAwesome" name="square" />
      <nb-icon class="del-icon" type="FontAwesome5" name="trash" :on-press="delPostPress" />
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
.list-day {
  font-size: 20px;
}
.list-temp {
  font-size: 20px;
}
 .list-right {
  display: flex;
}
.check-icon {
  color: #444;
}
.space {
  opacity: 0;
}
.del-icon {
  padding-left: 10px;
  color: rgb(139, 91, 139);
}
</style>