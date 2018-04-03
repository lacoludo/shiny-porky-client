import React, {Component} from 'react';
import { StatusBar, Platform } from 'react-native';
import PropTypes from 'prop-types';

import DefaultProps from './constants/navigation';
import AppConfig from '../constants/config';
import { Font } from 'expo';
import { connect } from 'react-redux' ;
import Rajdhani from './../../assets/fonts/Rajdhani-Regular.ttf';
import RajdhaniSemiBold from './../../assets/fonts/Rajdhani-SemiBold.ttf';
import { Icon } from 'native-base';
import { Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { StyleProvider } from 'native-base';

import getTheme from '../../native-base-theme/components';
import theme from '../../native-base-theme/variables/commonColor';
import RouterWrapper from './routes/RouterWrapper';
import Loading from './components/Loading';
import { fontLoaded } from '../actions/fontLoad';

if (Platform.OS === 'android') StatusBar.setHidden(true);

class Root extends Component {
  static propTypes = {
    store: PropTypes.shape({}).isRequired,
    persistor: PropTypes.shape({}).isRequired,
    fontLoaded: PropTypes.func.isRequired,
  };

  async componentDidMount() {
    await Font.loadAsync({
      'rajdhani': Rajdhani,
      'rajdhani-semibold': RajdhaniSemiBold,
    });
    this.props.fontLoaded();
  }

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

const mapDispatchToProps = (dispatch) => {
  return { fontLoaded: () => fontLoaded(dispatch) }
};

export default connect(null, mapDispatchToProps)(Root);

