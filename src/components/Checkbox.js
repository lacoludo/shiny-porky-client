import { TouchableOpacity, View, Text } from 'react-native' ;
import React, { PureComponent } from 'react' ;
import { connect } from 'react-redux' ;

class Checkbox extends PureComponent {

  render(){
    return (
      <TouchableOpacity>
        <View>
          <View style={{ flex:1 }}>
            <View style={{ width: 25, height: 25, borderRadius: 25, borderColor:'#D4AF37', borderWidth: 2  }} />
            <View><Text>Coucou</Text></View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default Checkbox;