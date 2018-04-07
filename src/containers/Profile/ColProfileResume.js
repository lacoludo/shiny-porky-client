import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Grid } from 'native-base';
import { StyleSheet } from 'react-native';

import { TextResumeProfile, TextNumberProfile } from '../../components/styles/StyledText';

class ColProfileResume extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
  }

  render () {
    const { title, number, left, right } = this.props;
    const { col, borderRight, borderLeft } = defaultStyle;
    let style = col;
    if (right) {
      style = StyleSheet.flatten([col, borderRight]);
    }
    if (left) {
      style = StyleSheet.flatten([col, borderLeft]);
    }

    return (      
      <Col style={style}>
        <TextNumberProfile>{number}</TextNumberProfile>
        <TextResumeProfile>{title}</TextResumeProfile>
      </Col>
    );
  }
}

const defaultStyle = StyleSheet.create({
  col: { height: 50, justifyContent: 'center', alignItems: 'center'},
  borderRight: { borderRightWidth: 1, borderRightColor: '#e6e6e6' },
  borderLeft: { borderLeftWidth: 1, borderLeftColor: '#e6e6e6' }
});

export default ColProfileResume;
