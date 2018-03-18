import React from 'react';
import { Container, Content, Text, H1, H2, H3, Button } from 'native-base';
import Spacer from './Spacer';
import { Actions } from 'react-native-router-flux';

const About = () => {
  console.log(Actions);
  return (

  <Container>
    <Content padder>
      <Spacer size={30} />
      <Button onPress={() => Actions.purchase()}>
        <Text>Purchase</Text>
      </Button>
      <H1>Heading 1</H1>
      <Spacer size={10} />
      <Text>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </Text>

      <Spacer size={30} />
      <H2>Heading 2</H2>
      <Spacer size={10} />
      <Text>Elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </Text>

      <Spacer size={30} />
      <H3>Heading 3</H3>
      <Spacer size={10} />
      <Text>Elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </Text>
    </Content>
  </Container>
  );
}
export default About;

///////////////////////////////////////////////////////////

export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.movies,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }



  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item.title}, {item.releaseYear}</Text>}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

