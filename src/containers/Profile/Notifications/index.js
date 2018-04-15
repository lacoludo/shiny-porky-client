import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Content, ListItem, Radio, Separator, Text } from 'native-base';
import { connect } from 'react-redux';
import { Permissions } from 'expo';
import { setReminderNotif } from '../../../actions/member';
import HeaderView from './../../../components/HeaderView';
import ButtonView from './../../../components/ButtonView';
import MessageView from './../../../components/MessageView';
import { scheduledNotification } from './scheduledNotifications';

const styles = StyleSheet.create({
  radioRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

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
        <Content>
          <Separator bordered style={{ marginBottom: 20 }}>
            <Text style={{ textAlign: 'center', fontSize: 20 }}>{'Etre rappelé tous les :'.toUpperCase()}</Text>
          </Separator>
          <ListItem>
            <Text>Jamais</Text>
            <View style={styles.radioRight}>
              <Radio
                onPress={() => this.onPress('never')}
                selected={reminderValue === 'never' ? true : false}
              />
            </View>
          </ListItem>
          <ListItem>
            <Text>Semaines</Text>
            <View style={styles.radioRight}>
              <Radio
                onPress={() => this.onPress('week')}
                selected={reminderValue === 'week' ? true : false}
              />
            </View>
          </ListItem>
          <ListItem style={{ marginBottom: 20 }}>
            <Text>Mois</Text>
            <View style={styles.radioRight}>
              <Radio
                onPress={() => this.onPress('month')}
                selected={reminderValue === 'month' ? true : false}
              />
            </View>
          </ListItem>
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
