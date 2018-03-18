import React from 'react';
import { FlatList, ActivityIndicator, View } from 'react-native';
import { Text } from 'native-base';

export default class FetchExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true }
  }
  componentDidMount() {
    // return fetch("https://facebook.github.io/react-native/movies.json")
    return fetch('https://www.quandl.com/api/v3/datasets/WGC/GOLD_DAILY_EUR.json?api_key=HDB-BuKoDWEJZxkUk2yA')
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          // dataSource: responseJson.movies
          dataSource: responseJson.data
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }
    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        <FlatList
          data={this.state.dataSource.map}
          renderItem={({ item }) => <Text>{item}</Text>}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}