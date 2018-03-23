import React, {Component} from 'react';
import { Scene, Tabs, Stack } from 'react-native-router-flux';
import { Icon } from 'native-base';

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

import SignUpContainer from '../../containers/SignUp';
import SignUpComponent from '../components/SignUp';

import LoginContainer from '../../containers/Login';
import LoginComponent from '../components/Login';

import ForgotPasswordContainer from '../../containers/ForgotPassword';
import ForgotPasswordComponent from '../components/ForgotPassword';

import UpdateProfileContainer from '../../containers/UpdateProfile';
import UpdateProfileComponent from '../components/UpdateProfile';

import CreditCardUserContainer from '../../containers/Profile/CreditCardUser';

import PurchasePageComponent from '../../containers/PurchasePage';

import MemberContainer from '../../containers/Member';
import ProfileComponent from '../components/Profile';

import HomeComponent from '../../containers/Home';

const Index = (
  <Stack>
    <Scene hideNavBar>
      <Tabs
        key="tabbar"
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
        </Stack>

        <Stack
          key="profile"
          title="PROFILE"
          icon={() => <Icon name="contact" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene
            key="profileHome"
            component={MemberContainer}
            Layout={ProfileComponent}
          />
          <Scene
            back
            key="signUp"
            title="SIGN UP"
            {...DefaultProps.navbarProps}
            component={SignUpContainer}
            Layout={SignUpComponent}
          />
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
        </Stack>
      </Tabs>
    </Scene>

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
);

export default Index;