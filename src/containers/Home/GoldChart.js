import React from "react";
import { ActivityIndicator, View } from "react-native";
import { Card, CardItem } from "native-base";
import { AreaChart } from "react-native-svg-charts";
import * as shape from "d3-shape";
import { Circle, G, Line, Rect, Text } from "react-native-svg";

export class GoldChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, dataSource: [] };
  }
  componentDidMount() {
    return fetch(
      "https://www.quandl.com/api/v3/datasets/WGC/GOLD_DAILY_EUR.json?api_key=HDB-BuKoDWEJZxkUk2yA&start_date=2018-02-14"
    )
      .then(response => response.json())
      .then(responseJson => {
        const goldData = [];
        const { data } = responseJson.dataset;
        data.map(item => {
          goldData.push(item[1]);
        });
        this.setState({
          isLoading: false,
          dataSource: goldData
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
  render() {
    const { isLoading, dataSource } = this.state;
    if (isLoading) {
      return (
        <Card style={{ paddingHorizontal: 6 }}>
          <CardItem>
            <ActivityIndicator />
          </CardItem>
        </Card>
      );
    }
    const lastIndexToDisplay = dataSource.length - 3;
    const TooltipFirst = ({ x, y }) => (
      <G x={x(2) - 75 / 2} key="tooltip">
        <G y={50}>
          <Text
            x={75 / 2}
            dy={y(dataSource[2])}
            alignmentBaseline="middle"
            textAnchor="middle"
            stroke="grey"
            fontSize="16"
          >
            {`${Math.round(dataSource[2])} €`}
          </Text>
        </G>
        <G x={75 / 2}>
          <Circle
            cy={y(dataSource[2])}
            r={6}
            stroke="rgb(211, 175, 55)"
            strokeWidth={2}
            fill="white"
          />
        </G>
      </G>
    );
    const TooltipLast = ({ x, y }) => (
      <G x={x(lastIndexToDisplay) - 75 / 2} key="tooltip">
        <G y={50}>
          <Text
            x={75 / 2}
            dy={y(dataSource[lastIndexToDisplay] + 2)}
            alignmentBaseline="middle"
            textAnchor="middle"
            stroke="grey"
            fontSize="16"
          >
            {`${Math.round(dataSource[lastIndexToDisplay])} €`}
          </Text>
        </G>
        <G x={75 / 2}>
          <Circle
            cy={y(dataSource[lastIndexToDisplay])}
            r={6}
            stroke="rgb(211, 175, 55)"
            strokeWidth={2}
            fill="white"
          />
        </G>
      </G>
    );
    return (
      <Card style={{ paddingHorizontal: 6 }}>
        <CardItem cardBody>
          <AreaChart
            style={{ height: 200, width: 300 }}
            data={dataSource}
            svg={{ fill: "rgba(211, 175, 55, 0.8)" }}
            contentInset={{ top: 20, bottom: 20 }}
            curve={shape.curveLinear}
            extras={[TooltipFirst, TooltipLast]}
            showGrid={false}
          />
        </CardItem>
      </Card>
    );
  }
}

export default GoldChart;
