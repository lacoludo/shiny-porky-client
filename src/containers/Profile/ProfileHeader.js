import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Grid } from 'native-base';
import { View, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import PorkyLogo from '../../images/porky.png';
import { StyledTitleProfile } from '../../components/styles/StyledTitleView';
import { StyledText } from '../../components/styles/StyledTextForm';

class ProfileHeader extends PureComponent {
  static propTypes = {
    member: PropTypes.shape({}).isRequired,
  }

  render () {
    const { member } = this.props;
    return (      
      <View style={{ width: '100%',  backgroundColor: '#D4AF37', alignItems: 'center' }}>
        <Image
          style={{ marginTop: 20, marginRight: 20, width: 200, height: 200 }}
          source={PorkyLogo}
        />
        <View style={{ paddingBottom: 10, alignItems: 'center' }}>
          <StyledTitleProfile>Bonjour, {member.firstName} {member.lastName}</StyledTitleProfile>
          <StyledText>Que souhaites-tu faire sur ton profil?</StyledText>
        </View>
      </View>
    );
  }
}

export default ProfileHeader;
