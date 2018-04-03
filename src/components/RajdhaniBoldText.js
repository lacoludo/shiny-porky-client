import { Text } from 'react-native' ;
import React, { PureComponent } from 'react' ;
import { connect } from 'react-redux' ;

class RajdhaniBoldText extends PureComponent {

  Loadtext(){
    if(this.props.fontLoaded){
      return (<Text style={{ fontFamily: 'rajdhani-semibold', fontWeight:800, fontSize: 30 }}>{this.props.children}</Text>) ;
    }
  }

render(){
    return (
      this.Loadtext()
    );
  }
}
const mapStateToProps = state => ({
  fontLoaded: state.fontLoaded.fontLoaded,
});

export default connect(mapStateToProps, null)(RajdhaniBoldText) ;