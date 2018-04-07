import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Grid } from 'native-base';
import { TextResumeProfile, TextNumberProfile } from '../../components/styles/StyledText';
import ColProfileResume from './ColProfileResume';

class ProfileResume extends PureComponent {

  render () {
    return (      
      <Grid style={{ marginTop: 5, backgroundColor: '#FFF' }}>
        <ColProfileResume title={`Cours de l'or`} number={50} right />
        <ColProfileResume title={`Notifications`} number={4} />
        <ColProfileResume title={`Or total`} number={230} left />
      </Grid>
    );
  }
}

export default ProfileResume;
