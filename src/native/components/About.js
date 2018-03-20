import React from 'react';
import { FlatList, ActivityIndicator, View } from 'react-native';
import { Text } from 'native-base';
import PureChart from 'react-native-pure-chart';

export class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, dataSource: [] }
  }
  componentDidMount() {
    // return fetch("https://facebook.github.io/react-native/movies.json")
    return fetch('https://www.quandl.com/api/v3/datasets/WGC/GOLD_DAILY_EUR.json?api_key=HDB-BuKoDWEJZxkUk2yA&start_date=2018-02-14')
      .then(response => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        const goldData = [];
        const { data } = responseJson.dataset;
        data.map((item) => {
          goldData.push({
            date: item[0],
            value: item[1],
          })
        });
        this.setState({
          isLoading: false,
          // dataSource: responseJson.movies
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
    let sampleData = [30, 200, 170, 250, 10]
    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        <PureChart
          data={sampleData}
          type='line'
        />
        <FlatList
          data={dataSource}
          renderItem={({ item }) => <Text>{`${item.date} : ${item.value}`}</Text>}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

export default About;