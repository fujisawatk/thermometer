<template>
  <nb-container class="index">
    <nb-content>
      <nb-list-item itemHeader first>
          <nb-text :style="{ fontSize: '25' }">記録</nb-text>
      </nb-list-item>
      <nb-list-item icon 
        class=list 
        v-for="post in posts"
        :key="post" >
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
          <nb-icon active name="arrow-forward" />
        </nb-right>
      </nb-list-item>
    </nb-content>
  </nb-container>
</template>

<script>
import store from '../store';

export default {
  computed: {
    posts () {
      return store.state.posts;
    }
  },
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
</style>