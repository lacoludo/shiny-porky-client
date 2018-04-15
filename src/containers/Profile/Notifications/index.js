import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Button, Container, Content, Text } from 'native-base';
import { connect } from 'react-redux';
import { Permissions } from 'expo';
import { setReminderNotif } from '../../../actions/member';
import HeaderView from './../../../components/HeaderView';
import ButtonView from './../../../components/ButtonView';
import MessageView from './../../../components/MessageView';
import { scheduledNotification } from './scheduledNotifications';

const textActive = {
  width: '100%',
  textAlign: 'center',
  color: '#fff'
};

const textInactive = {
  width: '100%',
  textAlign: 'center',
  color: '#d4af37',
};

const buttonActiveLeft = {
  flex: 1,
  backgroundColor: '#d4af37',
  borderColor: '#d4af37',
  borderWidth: 1,
  borderTopLeftRadius: 10,
  borderBottomLeftRadius: 10,
}

const buttonInactiveLeft = {
  flex: 1,
  backgroundColor: '#fff',
  borderColor: '#d4af37',
  borderWidth: 1,
  borderTopLeftRadius: 10,
  borderBottomLeftRadius: 10,
}

const buttonActiveMiddle = {
  flex: 1,
  backgroundColor: '#d4af37',
  borderColor: '#d4af37',
  borderWidth: 1,
}

const buttonInactiveMiddle = {
  flex: 1,
  backgroundColor: '#fff',
  borderColor: '#d4af37',
  borderWidth: 1,
}

const buttonActiveRight = {
  flex: 1,
  backgroundColor: '#d4af37',
  borderColor: '#d4af37',
  borderWidth: 1,
  borderTopRightRadius: 10,
  borderBottomRightRadius: 10,
}

const buttonInactiveRight = {
  flex: 1,
  backgroundColor: '#fff',
  borderColor: '#d4af37',
  borderWidth: 1,
  borderTopRightRadius: 10,
  borderBottomRightRadius: 10,
}

class MyNotifications extends Component {

  constructor(props) {
    super(props);
    this.state = { reminderValue: this.props.notifications };
  }

  async componentDidMount() {
    const result = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    this.setState({ reminderValue: this.props.notifications });
  }

  onPress = (value) => {
    this.setState({ reminderValue: value });
  }

  onSubmitForm = () => {
    this.props.setReminderNotif(this.state.reminderValue);
    scheduledNotification(this.state.reminderValue);
  }

  render() {
    const { reminderValue } = this.state;
    const { isLoading, success } = this.props;
    return (
      <Container>
        <HeaderView title="Gestion des notifications" />
        {success && <MessageView message={'Demande enregistrée.'} type={'success'}/>}
        <Content padder>
          <View style={{ marginTop: 40, marginBottom: 20 }}>
            <Text style={{ textAlign: 'center', fontSize: 20 }}>Etre rappelé tous les :</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
            <TouchableOpacity
              onPress={() => this.onPress('never')}
              style={reminderValue === 'never' ? buttonActiveLeft : buttonInactiveLeft}
            >
              <Text style={reminderValue === 'never' ? textActive : textInactive}>Jamais</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onPress('week')}
              style={reminderValue === 'week' ? buttonActiveMiddle : buttonInactiveMiddle}
            >
              <Text style={reminderValue === 'week' ? textActive : textInactive}>Semaines</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onPress('month')}
              style={reminderValue === 'month' ? buttonActiveRight : buttonInactiveRight}
            >
              <Text style={reminderValue === 'month' ? textActive : textInactive}>Mois</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 15, marginBottom: 20 }}>
            <Text style={{ textAlign: 'center', fontSize: 20 }}>Etre informé régulièrement de l'achat d'or :</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 40 }}>
            <TouchableOpacity style={buttonActiveLeft}>
              <Text style={textActive}>Oui</Text>
            </TouchableOpacity>
            <TouchableOpacity style={buttonInactiveRight}>
              <Text style={textInactive}>Non</Text>
            </TouchableOpacity>
          </View>
          <ButtonView onPress={this.onSubmitForm} label={'Mettre à jour'} isLoading={isLoading} />
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.notifications.isLoading,
  notifications: state.member.reminderNotif,
  success: state.notifications.success,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setReminderNotif: reminder => setReminderNotif(reminder, dispatch),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyNotifications);
