import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text, H1 } from 'native-base';
import Spacer from './Spacer';
import RajdhaniText from './RajdhaniText';
import { StyledTitleView } from './styles/StyledTitleView';

const HeaderView = ({ title, content }) => (
  <View>
    <StyledTitleView>{title.toUpperCase()}</StyledTitleView>
    {!!content &&
        <RajdhaniText>{content}</RajdhaniText>
    }
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
