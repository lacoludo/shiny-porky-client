import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableOpacity, RefreshControl, Image } from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, Button } from 'native-base';
import Spacer from './../Spacer';

const PorkyCard = ({
  porky,
  reFetch,
  onPress
}) => {
    return (
    <Card transparent style={{ paddingHorizontal: 6 }}>
        <CardItem cardBody>
            <TouchableOpacity onPress={() => onPress(porky)} style={{ flex: 1 }}>
                <Image
                source={{ uri: 'www.google.fr' }}
                style={{
                    height: 100,
                    width: null,
                    flex: 1,
                    borderRadius: 5,
                }}
                />
            </TouchableOpacity>
        </CardItem>
        <CardItem cardBody>
            <Body>
                <Spacer size={10} />
                <Text style={{ fontWeight: '800' }}>{porky.name}</Text>
                <Spacer size={15} />
                <Button
                    block
                    bordered
                    small
                    onPress={() => onPress(porky)}
                >
                    <Text>Nourrir</Text>
                </Button>
                <Spacer size={5} />
            </Body>
        </CardItem>
    </Card>
  );
};

PorkyCard.propTypes = {
  porky: PropTypes.shape().isRequired,
  reFetch: PropTypes.func,
  onPress: PropTypes.func.isRequired,
};

PorkyCard.defaultProps = {
  reFetch: null,
};

export default PorkyCard;
