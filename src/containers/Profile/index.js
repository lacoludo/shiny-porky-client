import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Container, Content, List, ListItem, Body, Left, Right, Text, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import ProfileHeader from './ProfileHeader';
import ProfileResume from './ProfileResume';

import { logout, getMemberData } from '../../actions/member';

class ProfilePage extends Component {
  static propTypes = {
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
          <ProfileResume />
          <View style={{ height: 20 }} />
          <List>
            <ListItem onPress={Actions.updateProfile} icon>
              <Left>
                <Icon name="person-add" />
              </Left>
              <Body>
                <Text>Modifier mon profil</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem onPress={Actions.creditCardUser} icon>
              <Left>
                <Icon name="card" />
              </Left>
              <Body>
                <Text>Informations bancaires</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem onPress={Actions.shippingAddress} icon>
              <Left>
                <Icon name="plane" />
              </Left>
              <Body>
                <Text>Adresse de livraison</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem onPress={Actions.notifications} icon>
              <Left>
                <Icon name="letter" />
              </Left>
              <Body>
                <Text>Gestion des notifications</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          </List>
          <ListItem style={{ marginTop: 20 }} onPress={logout} icon>
              <Left>
                <Icon name="power" />
              </Left>
              <Body>
                <Text>Se déconnecter</Text>
              </Body>
          </ListItem>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
