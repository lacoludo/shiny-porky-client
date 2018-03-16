import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Content, Text, Button } from 'native-base';

import { purchaseGold } from '../../actions/stripes';

class PurchasePage extends Component {
  static propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
  }

  onPress = () => {
    this.props.purchaseGold();
  }
  render () {
    return (      
    <Container>
      <Content padder>
        <Button onPress={this.onPress}><Text>qsdd</Text></Button>
      </Content>
    </Container>);
  }
}

const mapStateToProps = state => ({
  creditCard: state.creditCard || null,
  errorMessage: state.status.error || null,
  successMessage: state.status.success || null,
});

const mapDispatchToProps = {
  purchaseGold: purchaseGold
};

export default connect(mapStateToProps, mapDispatchToProps)(PurchasePage);
