import { Text } from 'react-native' ;
import React, { PureComponent } from 'react' ;

class RajdhaniText extends PureComponent {

  Loadtext(){
      return (<Text style={{ fontFamily: 'rajdhani', fontWeight: 800, fontSize: 30 }}>{this.props.children}</Text>) ;
  }

  render(){
    return (
      this.Loadtext()
    );
  }
}

export default RajdhaniText ;