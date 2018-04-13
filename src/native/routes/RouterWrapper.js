import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Scene, Tabs, Router, Stack } from 'react-native-router-flux';
import withAuthentication from './../withAuthentication';

import DefaultProps from '../constants/navigation';

import PorkiesContainer from '../../containers/Porkies';
import PorkiesComponent from '../components/Porkies/Porkies';
import PorkyContainer from '../../containers/Porkies/Porky';

import NewPorkyContainer from '../../containers/Porkies/NewPorky';
import NewPorkyComponent from '../components/Porkies/NewPorky';

import UpdateProfileContainer from '../../containers/Profile/UpdateProfile';

import CreditCardUserContainer from '../../containers/Profile/CreditCard';
import ShippingAddressContainer from '../../containers/Profile/ShippingAddress';
import NotificationsContainer from '../../containers/Profile/Notifications';
import MessagesContainer from '../../containers/Messages';

import PurchasePageComponent from '../../containers/PurchasePage';

import ProfileContainer from '../../containers/Profile';

import HomeComponent from '../../containers/Home';

import TITLE_SHINY_PORKY from '../../images/app-name.png';
import { FontAwesome } from '../../components/styles/StyledText';

class RouterWrapper extends Component {
  render() {
    return (
      <Router>
        <Stack key="root">
          <Tabs
            wrap
            hideNavBar
            tabBarPosition="bottom"
            key="root"
            type="replace"
            showLabel={false}
            {...DefaultProps.tabProps}
          >
            <Stack
              key="home"
              navigationBarTitleImage={TITLE_SHINY_PORKY}
              navigationBarTitleImageStyle={{ width: 260, height: 28, alignSelf: 'center'  }}
              icon={() => <FontAwesome></FontAwesome>}
              {...DefaultProps.navbarProps}
            >
              <Scene key="home" component={HomeComponent} />
              <Scene
                back
                clone
                key="purchase"
                {...DefaultProps.navbarProps}
                component={PurchasePageComponent}
              />
            </Stack>

            <Stack
              key="porkies"
              navigationBarTitleImage={TITLE_SHINY_PORKY}
              navigationBarTitleImageStyle={{ width: 260, height: 28, alignSelf: 'center'  }}
              icon={() => <FontAwesome></FontAwesome>}
              {...DefaultProps.navbarProps}
            >
              <Scene
                key="porkies"
                {...DefaultProps.navbarProps}
                component={PorkiesContainer}
                Layout={PorkiesComponent} 
              />
              <Scene
                back
                key="newPorky"
                {...DefaultProps.navbarProps}
                component={NewPorkyContainer}
                Layout={NewPorkyComponent}
              />
              <Scene
                back
                clone
                key="porky"
                {...DefaultProps.navbarProps}
                component={PorkiesContainer}
                Layout={PorkyContainer}
              />
            </Stack>
            <Stack
              key="messages"
              navigationBarTitleImage={TITLE_SHINY_PORKY}
              navigationBarTitleImageStyle={{ width: 260, height: 28, alignSelf: 'center'  }}
              icon={() => <FontAwesome></FontAwesome>}
              {...DefaultProps.navbarProps}
            >
              <Scene key="md-mail" component={MessagesContainer} />
            </Stack>
            <Stack
              key="profile"
              navigationBarTitleImage={TITLE_SHINY_PORKY}
              navigationBarTitleImageStyle={{ width: 260, height: 28, alignSelf: 'center'  }}
              icon={() => <FontAwesome></FontAwesome>}
              {...DefaultProps.navbarProps}
            >
              <Scene key="profileHome" component={ProfileContainer} />
              <Scene
                back
                key="updateProfile"
                {...DefaultProps.navbarProps}
                component={UpdateProfileContainer}
              />
              <Scene
                back
                key="creditCardUser"
                {...DefaultProps.navbarProps}
                component={CreditCardUserContainer}
              />
              <Scene
                back
                key="shippingAddress"
                {...DefaultProps.navbarProps}
                component={ShippingAddressContainer}
              />
              <Scene
                back
                key="notifications"
                {...DefaultProps.navbarProps}
                component={NotificationsContainer}
              />
            </Stack>
          </Tabs>
        </Stack>
      </Router>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticate: state.member.uid,
});

export default compose(
  connect(mapStateToProps),
  withAuthentication
)(RouterWrapper);
