import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Content, Text, Form, Item, Label } from 'native-base';
import { TouchableOpacity, ActivityIndicator, Button, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Notifications, Permissions, Constants } from 'expo';
import { NOTIFICATIONS_GOLD_REMINDER } from './constants';

import { setReminderNotif, getReminderNotif } from '../../../actions/member';
import HeaderView from './../../../components/HeaderView';
import ButtonView from './../../../components/ButtonView';
import MessageView from './../../../components/MessageView';

class MyNotifications extends Component {

  constructor(props) {
    super(props);
    this.state = { reminderValue: this.props.notifications };
  }

  async componentDidMount() {
    let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (Constants.lisDevice && resut.status === 'granted') {
     console.log('Notification permissions granted.')
    }
    this.setState({ reminderValue: this.props.notifications });
  }

  onPress = (value) => {
    this.setState({ reminderValue: value });
  }

  onSubmitForm = () => {
    this.props.setReminderNotif(this.state.reminderValue);
  }

  componentWillUnmount() {
    console.log('je passe');
    this.props.dispatch({ type: 'RESET_NOTIFICATIONS' });
  }

  render() {
    const { reminderValue } = this.state;
    const { isLoading, success } = this.props;
    /*let t = new Date();
    t.setSeconds(t.getSeconds() + 10);
    const schedulingOptions = {
      time: t,
      repeat: 'minute',
    };
    Notifications.scheduleLocalNotificationAsync(NOTIFICATIONS_GOLD_REMINDER, schedulingOptions);
    */
    return (
      <Container>
        <Content padder>
          <HeaderView title="Gestion des notifications" />
          {success && <MessageView message={'Demande enregistrée.'} type={'success'}/>}
          <Form>
            <Label>Etre rappelé tous les</Label>
            <View style={{ width: '100%', justifyContent: 'center', flex: 1, flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => this.onPress('never')}
                style={reminderValue === 'never' ? buttonActive : buttonInactive}
              >
                  <Text style={reminderValue === 'never' ? textActive : textInactive}>Jamais</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.onPress('week')}
                style={reminderValue === 'week' ? buttonActive : buttonInactive}
              >
                <Text style={reminderValue === 'week' ? textActive : textInactive}>Semaines</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.onPress('month')}
                style={reminderValue === 'month' ? buttonActive : buttonInactive}
              >
                <Text style={reminderValue === 'month' ? textActive : textInactive}>Mois</Text>
              </TouchableOpacity>
            </View>
            <ButtonView onPress={this.onSubmitForm} label={'Mettre à jour'} isLoading={isLoading} />
          </Form>
        </Content>
      </Container>
    )
  }
}

const buttonInactive = {
  flex: 1,
  backgroundColor: '#FFF',
  borderColor: '#D4AF37',
  borderWidth: 1,
}

const buttonActive = {
  flex: 1,
  backgroundColor: '#D4AF37',
  borderColor: '#D4AF37',
  borderWidth: 1,
}

const textInactive = { width: '100%', textAlign: 'center', color: '#D4AF37' };
const textActive = { width: '100%', textAlign: 'center', color: '#FFF' };

const mapStateToProps = state => ({
  isLoading: state.notifications.isLoading,
  notifications: state.member.reminderNotif,
  success: state.notifications.success,
});
  
const mapDispatchToProps = (dispatch) => {
  return {
    setReminderNotif: (reminder) => setReminderNotif(reminder, dispatch),
    dispatch,
  };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(MyNotifications);
