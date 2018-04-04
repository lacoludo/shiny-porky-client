import React, {Component} from 'react';
import { StatusBar, Platform } from 'react-native';
import PropTypes from 'prop-types';

import DefaultProps from './constants/navigation';
import AppConfig from '../constants/config';
import { Icon } from 'native-base';
import { Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { StyleProvider } from 'native-base';

import getTheme from '../../native-base-theme/components';
import theme from '../../native-base-theme/variables/commonColor';
import RouterWrapper from './routes/RouterWrapper';
import Loading from './components/Loading';


if (Platform.OS === 'android') StatusBar.setHidden(true);

class Root extends Component {
  static propTypes = {
    store: PropTypes.shape({}).isRequired,
    persistor: PropTypes.shape({}).isRequired,
  };

  render() {
    const { store, persistor } = this.props;
    return (
      <Provider store={store}>
        <PersistGate
          loading={<Loading />}
          persistor={persistor}
        >
          <StyleProvider style={getTheme(theme)}>
            <RouterWrapper />
          </StyleProvider>
        </PersistGate>
      </Provider>
    )
  }
}

export default Root;

