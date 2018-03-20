import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text, H1 } from 'native-base';
import Spacer from './Spacer';

const HeaderView = ({ title, content }) => (
  <View>
    <Spacer size={25} />
    <H1>{title}</H1>
    {!!content &&
      <View>
        <Spacer size={10} />
        <Text>{content}</Text>
      </View>
    }
    <Spacer size={25} />
  </View>
);

HeaderView.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};

HeaderView.defaultProps = {
  title: 'Missing title',
  content: '',
};

export default HeaderView;
