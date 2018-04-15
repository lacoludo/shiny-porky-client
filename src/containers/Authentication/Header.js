import React, { PureComponent } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import PorkyIcon from './../../images/porky-icon.png';

const styles = StyleSheet.create({
  margins: {
    marginTop: 100,
    marginBottom: 100,
  },
  layoutCenter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class Header extends PureComponent {
  render() {
    return (
      <View style={styles.margins}>
        <View style={styles.layoutCenter}>
          <Image source={PorkyIcon} />
        </View>
      </View>
    )
  }
}

export default Header;
