import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Container, Content, List, ListItem, Body, Left, Text, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import HeaderView from '../../components/HeaderView';
import ProfileHeader from '../../components/ProfileHeader';

import { logout, getMemberData } from '../../actions/member';

class Member extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    memberLogout: PropTypes.func.isRequired,
    getMemberData: PropTypes.func.isRequired,
    member: PropTypes.shape({
      isLoading: PropTypes.bool.isRequired,
      error: PropTypes.string,
    }).isRequired,
  }

  componentDidMount = () => this.props.getMemberData();

  render = () => {
    const { Layout, member, memberLogout } = this.props;
    return (
      <Container>
        <Content>
          <ProfileHeader member={member} />
          <View style={{ height: 40 }} />
          <List>
            {(member && member.email) ?
              <View>
                <ListItem onPress={Actions.updateProfile} icon>
                  <Left>
                    <Icon name="person-add" />
                  </Left>
                  <Body>
                    <Text>Modifier mon profil</Text>
                  </Body>
                </ListItem>
                <ListItem onPress={Actions.creditCardUser} icon>
                  <Left>
                    <Icon name="card" />
                  </Left>
                  <Body>
                    <Text>Informations bancaires</Text>
                  </Body>
                </ListItem>
                <ListItem onPress={Actions.shippingAddress} icon>
                  <Left>
                    <Icon name="plane" />
                  </Left>
                  <Body>
                    <Text>Adresse de livraison</Text>
                  </Body>
                </ListItem>
                <ListItem onPress={Actions.notifications} icon>
                  <Left>
                    <Icon name="letter" />
                  </Left>
                  <Body>
                    <Text>Gestion des notifications</Text>
                  </Body>
                </ListItem>
                <ListItem onPress={logout} icon>
                  <Left>
                    <Icon name="power" />
                  </Left>
                  <Body>
                    <Text>Logout</Text>
                  </Body>
                </ListItem>
              </View>
            :
              <View>
                <Content padder>
                  <Header
                    title="Hi there,"
                    content="Please login to gain extra access"
                  />
                </Content>
    
                <ListItem onPress={Actions.login} icon>
                  <Left>
                    <Icon name="power" />
                  </Left>
                  <Body>
                    <Text>Login</Text>
                  </Body>
                </ListItem>
                <ListItem onPress={Actions.signUp} icon>
                  <Left>
                    <Icon name="add-circle" />
                  </Left>
                  <Body>
                    <Text>Sign Up</Text>
                  </Body>
                </ListItem>
                <ListItem onPress={Actions.forgotPassword} icon>
                  <Left>
                    <Icon name="help-buoy" />
                  </Left>
                  <Body>
                    <Text>Forgot Password</Text>
                  </Body>
                </ListItem>
              </View>
            }
          </List>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  member: state.member || {},
});

const mapDispatchToProps = {
  memberLogout: logout,
  getMemberData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Member);
