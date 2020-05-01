<template>
<view class="chart-container">
  <victory-chart
    :domainPadding="{x: 40}"
    :style="{marginLeft: 120}"
    :height="400"
    :maxDomain="{x:7, y: 40.0}"
    :minDomain="{x:1, y: 34.0}"
    :theme="theme"
  >
    <victory-line
      :data="[
        {x: 0, y: 37.5},
        {x: 9, y: 37.5}
      ]"
      :style="borderStyle"
    />

    <victory-line
      :data="posts"
      :x="x"
      :y="y"
      :style="lineStyle"
      :animate="{
        duration: 5000,
        onLoad: { duration: 3000 }
      }"

    />
    <victory-axis
      :label="xLabel"
      :style="{
        axisLabel: { padding: 30 }
      }"
    />
    <victory-axis dependentAxis
      :label="yLabel"
      :style="{
        axisLabel: { padding: 40 }
      }"
    />
  </victory-chart>
  </view>
</template>

<script>
import { VictoryTheme, VictoryChart, VictoryAxis, VictoryLine } from 'victory-native'
import store from '../store';

export default {
  components: {
    VictoryChart, 
    VictoryAxis, 
    VictoryLine 
  },
  data: function() {
    return {
      // モーダルON/OFF
      lineStyle: {
              data: { stroke: 'teal', strokeWidth: 5, strokeLinecap: "round" },
              labels: {fontSize: 12},
              parent: { border: "1px solid #ccc"}
      },
      borderStyle: {
              data: { stroke: "red"},
      },
      x: "x",
      y: "y",
      xLabel: "日付",
      yLabel: "体温",
      theme: VictoryTheme.material
        
    }
  },
  computed: {
    posts () {
      return store.state.chartData;
    }
  },
}
</script>

<style>
.chart-container {
  background-color: #FFF;
  align-items: center;
  justify-content: center;
}

</style>