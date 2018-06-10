import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row, Grid } from 'native-base';
import { TextResumeProfile, TextNumberProfile } from '../../components/styles/StyledText';
import ColProfileResume from './ColProfileResume';

class ProfileResume extends PureComponent {
  static propTypes = {
    messagesUnseen: PropTypes.number.isRequired,
    currentGoldValue: PropTypes.number.isRequired,
  }

  render () {
    const { currentGoldValue, messagesUnseen } = this.props;
    return (      
      <Grid style={{ marginTop: 5, backgroundColor: '#FFF' }}>
        <ColProfileResume title={`Prix de l'or`} number={currentGoldValue} right />
        <ColProfileResume title={`Message(s)`} number={messagesUnseen} />
        <ColProfileResume title={`Or total`} number={0} left />
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  messagesUnseen: state.messages.count,
  currentGoldValue: state.goldChart.currentGoldValue
});

export default connect(mapStateToProps, null)(ProfileResume);
