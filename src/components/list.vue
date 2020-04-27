<template>
  <nb-container class="index">
    <nb-content>
      <nb-list-item itemHeader first>
          <nb-text :style="{ fontSize: '25' }">記録</nb-text>
      </nb-list-item>
      <nb-list-item icon class=list>
          <nb-body>
            <nb-text class="list-day">4月1日</nb-text>
          </nb-body>
          <nb-body>
            <nb-text class="list-temp">36.5℃</nb-text>
        </nb-body>
          <nb-right>
            <nb-icon class="check-icon" type="Entypo" name="controller-stop" />
            <nb-icon class="check-icon" type="Entypo" name="controller-stop" />
            <nb-icon class="check-icon" type="Entypo" name="controller-stop" />
            <nb-icon class="check-icon" type="Entypo" name="controller-stop" />
          <nb-icon active name="arrow-forward" />
        </nb-right>
      </nb-list-item>
      <nb-list-item icon class=list>
          <nb-body>
            <nb-text class="list-day">3月31日</nb-text>
          </nb-body>
          <nb-body>
            <nb-text class="list-temp">38.5℃</nb-text>
        </nb-body>
          <nb-right>
            <nb-icon class="check-icon" type="Entypo" name="controller-stop" />
            <nb-icon class="check-icon" type="Entypo" name="controller-stop" />
            <nb-icon class="check-icon" type="Entypo" name="controller-stop" />
            <nb-icon class="check-icon" type="Entypo" name="controller-stop" />
          <nb-icon active name="arrow-forward" />
        </nb-right>
      </nb-list-item>
      <nb-list-item icon class=list>
          <nb-body>
            <nb-text class="list-day">3月30日</nb-text>
          </nb-body>
          <nb-body>
            <nb-text class="list-temp">37.5℃</nb-text>
        </nb-body>
          <nb-right>
            <nb-icon class="check-icon" type="Entypo" name="controller-stop" />
            <nb-icon class="check-icon" type="Entypo" name="controller-stop" />
            <nb-icon class="check-icon" type="Entypo" name="controller-stop" />
            <nb-icon class="check-icon" type="Entypo" name="controller-stop" />
          <nb-icon active name="arrow-forward" />
        </nb-right>
      </nb-list-item>
    </nb-content>
  </nb-container>
</template>


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
  color: #ccc;
}
</style>