import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Container, Content, Text } from 'native-base';
import { connect } from 'react-redux';
import { Permissions } from 'expo';
import { setReminderNotif } from '../../../actions/member';
import HeaderView from './../../../components/HeaderView';
import ButtonView from './../../../components/ButtonView';
import MessageView from './../../../components/MessageView';
import { scheduledNotification } from './scheduledNotifications';
import { TextCard } from '../../../components/styles/StyledText';
import { styles } from './styles';

class MyNotifications extends Component {

  constructor(props) {
    super(props);
    this.state = { reminderValue: this.props.notifications };
  }

  async componentDidMount() {
    const result = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    this.setState({ reminderValue: this.props.notifications });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (this.props.isLoading !== nextProps.isLoading
      || this.props.success !== nextProps.success
      || this.state.reminderValue !== nextState.reminderValue);
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
        <Content padder>
          <HeaderView title="Gestion des notifications" />
          {success && <MessageView message={'Demande enregistrée.'} type={'success'}/>}
          <View style={{ marginVertical: 20, paddingBottom: 10, borderBottomWidth: 2, borderBottomColor: '#DDD' }}>
            <TextCard>Pense à activer les notifications si tu ne veux pas oublier d'acheter de l'or régulièrement.</TextCard>
          </View>
          <TextCard style={{ fontSize: 17, marginBottom: 5 }}>Je souhaite être rappelé tous les: </TextCard>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <TouchableOpacity
              onPress={() => this.onPress('never')}
              style={reminderValue === 'never' ? [styles.buttonLeft, styles.buttonActive] : styles.buttonLeft}
            >
              <Text style={reminderValue === 'never' ? [styles.textInactive, styles.textActive] : styles.textInactive}>Jamais</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onPress('week')}
              style={reminderValue === 'week' ? [styles.buttonMiddle, styles.buttonActive] : styles.buttonMiddle}
            >
              <Text style={reminderValue === 'week' ? [styles.textInactive, styles.textActive] : styles.textInactive}>Semaines</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onPress('month')}
              style={reminderValue === 'month' ? [styles.buttonRight, styles.buttonActive] : styles.buttonRight}
            >
              <Text style={reminderValue === 'month' ? [styles.textInactive, styles.textActive] : styles.textInactive}>Mois</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginVertical: 10 }}>
            <TextCard>Tu peux aussi être notifié à chaque message que tu reçois. Utile pour se tenir informé très rapidement.</TextCard>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginBottom: 30 }}>
            <TouchableOpacity style={[styles.buttonLeft, styles.buttonActive]}>
              <Text style={[styles.textInactive, styles.textActive]}>Oui</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonRight]}>
              <Text style={styles.textInactive}>Non</Text>
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
