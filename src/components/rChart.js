import React from 'react';
import { StyleSheet, View } from 'react-native';
import { VictoryTheme, VictoryChart, VictoryAxis, VictoryLine } from 'victory-native';

export default class Chart extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      <VictoryChart
          domainPadding={{x: 40}}
          style={{marginLeft: 120}}
          height={400}
          maxDomain={{x:9, y: 40.0}}
          minDomain={{x:1, y: 34.0}}
          theme={VictoryTheme.material}
        >
          <VictoryLine
            data={[
              {x: 0, y: 37.5},
              {x: 9, y: 37.5}
            ]}
            style={{
              data: { stroke: "red"},
            }}
          />

          <VictoryLine
            data={[
              { x: 1, y: 36.5 },
              { x: 2, y: 36.7 },
              { x: 3, y: 38.5 },
              { x: 4, y: 38.7 },
              { x: 5, y: 39.6 },
              { x: 7, y: 37.4 },
            ]}
            x="x"
            y="y"
            style={{
              data: { stroke: "teal", strokeWidth: 5, strokeLinecap: "round" },
              labels: {fontSize: 12},
              parent: { border: "1px solid #ccc"}
            }}
            animate={{
              duration: 5000,
              onLoad: { duration: 3000 }
            }}

          />
          <VictoryAxis
            label="日付"
            style={{
              axisLabel: { padding: 30 }
            }}
          />
          <VictoryAxis dependentAxis
            label="体温"
            style={{
              axisLabel: { padding: 40 }
            }}
          />
      </VictoryChart>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
