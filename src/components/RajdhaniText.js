import { Text } from 'react-native' ;
import React, { PureComponent } from 'react' ;
import { connect } from 'react-redux' ;

class RajdhaniText extends PureComponent {

  Loadtext(){
    if(this.props.fontLoaded){
      return (<Text style={{ fontFamily: 'rajdhani', fontWeight: 800, fontSize: 30 }}>{this.props.children}</Text>) ;
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

export default connect(mapStateToProps, null)(RajdhaniText) ;