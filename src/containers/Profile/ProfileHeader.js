import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Grid } from 'native-base';
import { View, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import PorkyLogo from '../../images/porky-icon.png';
import { StyledTitleProfile } from '../../components/styles/StyledTitleView';
import { StyledText } from '../../components/styles/StyledTextForm';

class ProfileHeader extends PureComponent {
  static propTypes = {
    member: PropTypes.shape({}).isRequired,
  }

  render () {
    const { member } = this.props;
    return (      
      <View style={{ width: '100%', height: 250, backgroundColor: '#D4AF37', alignItems: 'center', paddingTop: 20 }}>
        <Image
          style={{ marginTop: 10 }}
          source={PorkyLogo}
        />
        <StyledTitleProfile>Bonjour, {member.firstName} {member.lastName}</StyledTitleProfile>
        <StyledText>Que souhaites-tu faire sur ton profil?</StyledText>
      </View>
    );
  }
}

export default ProfileHeader;
