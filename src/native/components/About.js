import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { LineChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { Circle, G, Line, Rect, Text } from 'react-native-svg';

export class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, dataSource: [] }
  }
  componentDidMount() { 
    return fetch('https://www.quandl.com/api/v3/datasets/WGC/GOLD_DAILY_EUR.json?api_key=HDB-BuKoDWEJZxkUk2yA&start_date=2018-02-14')
      .then(response => response.json())
      .then((responseJson) => {
        const goldData = [];
        const { data } = responseJson.dataset;
        data.map((item) => {
          goldData.push(
            item[1]
          )
        });
        this.setState({
          isLoading: false,
          dataSource: goldData
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    const { isLoading, dataSource } = this.state;
    if (isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }
    const Tooltip = ({ x, y }) => (
      <G
        x={ x(5) - (75 / 2) }
        key={ 'tooltip' }
        onPress={ () => console.log('tooltip clicked') }
      >
        <G y={ 50 }>
          <Text
            x={ 75 / 2 }
            dy={ 20 }
            alignmentBaseline={ 'middle' }
            textAnchor={ 'middle' }
            stroke={ 'rgb(211, 175, 55)' }
          >
            { `${dataSource}€` }
          </Text>
        </G>
      </G>
    )
    return (
      <View>
        <LineChart
          style={{ height: 200 }}
          data={ dataSource }
          svg={{ stroke: 'rgb(211, 175, 55)', strokeWidth: 2 }}
          contentInset={{ top: 20, bottom: 20 }}
          curve={ shape.curveLinear }
          extras={ [ Tooltip ] }
          showGrid={ false }
        />
      </View>
    )
  }
}

export default About;