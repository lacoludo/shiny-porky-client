import React from 'react';
import Root from './src/native/index';
import configureStore from './src/store/index';
import { AppLoading, Font } from 'expo';
const { persistor, store } = configureStore();

import Rajdhani from './assets/fonts/Rajdhani-Regular.ttf';
import RajdhaniSemiBold from './assets/fonts/Rajdhani-SemiBold.ttf';
import Montserrat from './assets/fonts/Montserrat-Regular.ttf';
import MontserratSemiBold from './assets/fonts/Montserrat-SemiBold.ttf';
import FontAwesome from './assets/fonts/fa-regular-400.ttf';
import FontAwesomeSolid from './assets/fonts/fa-solid-900.ttf';
import FontAwesomeBrands from './assets/fonts/fa-brands-400.ttf';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isLoadingComplete: false };
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        'rajdhani': Rajdhani,
        'rajdhani-semibold': RajdhaniSemiBold,
        'montserrat': Montserrat,
        'montserrat-semibold': MontserratSemiBold,
        'fa': FontAwesome,
        'fa-solid': FontAwesomeSolid,
        'fa-brands': FontAwesomeBrands,
      }),
    ]);
  };

  _handleLoadingError = (error) => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

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
      return (
        <Root store={store} persistor={persistor} />
      );
    }
  }
}
