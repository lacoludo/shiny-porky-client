import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import PorkyIcon from './../../images/porky.png';

const styles = StyleSheet.create({
  layoutCenter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class Header extends Component {

  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <View style={{ marginVertical: 30 }}>
        <View style={styles.layoutCenter}>
          <Image source={PorkyIcon} style={{ marginLeft: -30, width: 260, height: 260 }}/>
        </View>
      </View>
    )
  }
}

export default Header;
