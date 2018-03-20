import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text } from 'native-base';

import Colors from '../../native-base-theme/variables/commonColor';

const MessageView = ({ message, type }) => (
  <View style={{
      backgroundColor: (type === 'error') ? Colors.brandDanger : (type === 'success') ? Colors.brandSuccess : Colors.brandInfo,
      paddingVertical: 10,
      paddingHorizontal: 5,
    }}
  >
    <Text style={{ color: '#fff', textAlign: 'center' }}>{message}</Text>
  </View>
);

MessageView.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(['error', 'success', 'info']),
};

MessageView.defaultProps = {
  message: 'An unexpected error came up',
  type: 'error',
};

export default MessageView;
