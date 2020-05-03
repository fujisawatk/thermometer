import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import {
  VictoryTheme,
  VictoryChart,
  VictoryAxis,
  VictoryLine,
  VictoryVoronoiContainer,
  VictoryTooltip,
  VictoryScatter,
  VictoryGroup } from 'victory-native';
import store from '../store';

const {height, width} = Dimensions.get('window');

export default class Chart extends React.Component {
  render() {

    const line = store.state.chartData

    return (
      <View style={styles.container}>
        <VictoryChart
            domainPadding={{x: 40}}
            style={{marginLeft: 120}}
            height={height * (3/7)}
            maxDomain={{x:8, y: 40.0}}
            minDomain={{x:1, y: 34.0}}
            theme={VictoryTheme.material}
            containerComponent={<VictoryVoronoiContainer/>}
        >
        <VictoryGroup
            color="#000080"
            labels={({ datum }) => `${datum.y}℃`}
            labelComponent={
              <VictoryTooltip
                style={{ fontSize: 20 }}
              />
            }
            data={ line }
          >
            <VictoryLine
              style={{
                      data: { stroke: "#000080", strokeLinecap: "round", strokeWidth: 3 }
                    }}
            />
            <VictoryScatter
              size={({ active }) => active ? 10 : 5}
            />
          </VictoryGroup>
          <VictoryLine
            data={[
              {x: 0, y: 37.5},
              {x: 8, y: 37.5}
            ]}
            style={{
              data: { stroke: "red", strokeWidth: 1},
            }}
          />
          <VictoryAxis
            label="日付"
            style={{
              axisLabel: { padding: 30 },
              tickLabels: {fontSize: 8, padding: 5}
            }}
          />
          <VictoryAxis dependentAxis
            label="体温"
            style={{
              axisLabel: { padding: 35 },
              tickLabels: {fontSize: 10, padding: 5}
            }}
          />
        </VictoryChart>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
