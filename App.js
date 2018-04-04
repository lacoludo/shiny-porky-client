import React from 'react';
import Root from './src/native/index';
import configureStore from './src/store/index';
import { AppLoading, Font } from 'expo';
import { View } from 'react-native';
const { persistor, store } = configureStore();

import Rajdhani from './assets/fonts/Rajdhani-Regular.ttf';
import RajdhaniSemiBold from './assets/fonts/Rajdhani-SemiBold.ttf';
import Montserrat from './assets/fonts/Montserrat-Regular.ttf';
import MontserratSemiBold from './assets/fonts/Montserrat-SemiBold.ttf';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isLoadingComplete: false };
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return <Root store={store} persistor={persistor} />;
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        'rajdhani': Rajdhani,
        'rajdhani-semibold': RajdhaniSemiBold,
        'montserrat': Montserrat,
        'montserrat-semibold': MontserratSemiBold,
      }),
    ]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}
