import React, {Component} from 'react';
import { compose } from "redux";
import { connect } from 'react-redux';
import { Scene, Tabs, Router, Stack } from 'react-native-router-flux';
import { Icon } from 'native-base';
import withAuthentication from './../withAuthentication';

import DefaultProps from '../constants/navigation';
import AppConfig from '../../constants/config';

import RecipesContainer from '../../containers/Recipes';
import RecipesComponent from '../components/Recipes';
import RecipeViewComponent from '../components/Recipe';

import PorkiesContainer from '../../containers/Porkies';
import PorkiesComponent from '../components/Porkies/Porkies';
import PorkyViewComponent from '../components/Porky';

import NewPorkyContainer from '../../containers/Porkies/NewPorky';
import NewPorkyComponent from '../components/Porkies/NewPorky';

import ForgotPasswordContainer from '../../containers/ForgotPassword';
import ForgotPasswordComponent from '../components/ForgotPassword';

import UpdateProfileContainer from '../../containers/UpdateProfile';
import UpdateProfileComponent from '../components/UpdateProfile';

import CreditCardUserContainer from '../../containers/Profile/CreditCardUser';
import ShippingAddressContainer from '../../containers/Profile/ShippingAddress';
import PurchasePageComponent from '../../containers/PurchasePage';

import MemberContainer from '../../containers/Member';
import ProfileComponent from '../components/Profile';

import HomeComponent from '../../containers/Home';

class RouterWrapper extends Component {
  render() {
    return (
      <Router>
        <Stack key="root">
            <Tabs
              wrap
              hideNavBar
              key="root"
              swipeEnabled
              type="replace"
              showLabel={false}
              {...DefaultProps.tabProps}
            >
              <Stack
                key="home"
                title={AppConfig.appName.toUpperCase()}
                icon={() => <Icon name="home" {...DefaultProps.icons} />}
                {...DefaultProps.navbarProps}
              >
                <Scene key="home" component={HomeComponent} />
              </Stack>

              <Stack
                key="porkies"
                title="PORKIES"
                icon={() => <Icon name="apps" {...DefaultProps.icons} />}
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
                  title="New porky"
                  {...DefaultProps.navbarProps}
                  component={NewPorkyContainer}
                  Layout={NewPorkyComponent}
                />
                <Scene
                  back
                  clone
                  key="porky"
                  title="PORKY"
                  {...DefaultProps.navbarProps}
                  component={PorkiesContainer}
                  Layout={PorkyViewComponent}
                />
              </Stack>

              <Stack
                key="profile"
                title="PROFILE"
                icon={() => <Icon name="contact" {...DefaultProps.icons} />}
                {...DefaultProps.navbarProps}
              >
                <Scene key="profileHome" component={MemberContainer} Layout={ProfileComponent} />
                <Scene
                  back
                  key="forgotPassword"
                  title="FORGOT PASSWORD"
                  {...DefaultProps.navbarProps}
                  component={ForgotPasswordContainer}
                  Layout={ForgotPasswordComponent}
                />
                <Scene
                  back
                  key="updateProfile"
                  title="UPDATE PROFILE"
                  {...DefaultProps.navbarProps}
                  component={UpdateProfileContainer}
                  Layout={UpdateProfileComponent}
                />
                <Scene
                  back
                  key="creditCardUser"
                  title="CREDIT CARD INFORMATIONS"
                  {...DefaultProps.navbarProps}
                  component={CreditCardUserContainer}
                />
                <Scene
                  back
                  key="shippingAddress"
                  title="ADRESSE DE LIVRAISON"
                  {...DefaultProps.navbarProps}
                  component={ShippingAddressContainer}
                />
              </Stack>
            </Tabs>
            <Scene
              back
              clone
              key="purchase"
              title="PURCHASE"
              {...DefaultProps.navbarProps}
              component={PurchasePageComponent}
            />

            <Scene
              back
              clone
              key="recipe"
              title="RECIPE"
              {...DefaultProps.navbarProps}
              component={RecipesContainer}
              Layout={RecipeViewComponent}
            />
      </Stack>
    </Router>)
  }
}

const mapStateToProps = state => ({
  isAuthenticate: state.member.uid,
});

export default compose(
  connect(mapStateToProps),
  withAuthentication
)(RouterWrapper);
