import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import { Card, CardItem } from 'native-base';
import { AreaChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { getDataGold } from '../../actions/goldChart';
import { TextTitleCard, TextCard } from '../../components/styles/StyledText';

export class GoldChart extends React.Component {
  static propTypes = {
    getDataGold: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    dataGold: PropTypes.array.isRequired,
    currentGoldValue: PropTypes.number.isRequired,
  }

  componentDidMount() {
    this.props.getDataGold();
  }

  render() {
    const { dataGold, isLoading, currentGoldValue } = this.props;
    const currentOzDataGold = dataGold[dataGold.length - 1];
    return (
      <Card style={styles.Shadow}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#000" style={{ height: 329 }} />
        ) : (
          <View>
            <CardItem style={{ justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#DDD' }}>
              <TextCard style={{ fontSize: 16, color: '#282828' }}>{`Valeur de l'or : ${currentGoldValue}€ pour 5 Grammes`}</TextCard>
            </CardItem>
            <CardItem style={{ flex: 1, flexDirection: 'row'}} cardBody>
              <AreaChart
                style={{ height: 200, width: '100%', paddingHorizontal: 5, paddingBottom: 10 }}
                data={dataGold}
                svg={{ fill: "rgba(211, 175, 55, 0.5)", stroke: "rgba(211, 175, 55, 0.9)", strokeWidth: 3, strokeOpacity: 0.8 }}
                curve={shape.curveNatural}
                showGrid={false}
                gridMin={currentOzDataGold - 20}
                gridMax={currentOzDataGold + 20}
              />
            </CardItem>
            <CardItem  style={{ borderTopWidth: 1, borderTopColor: '#DDD' }}>
              <TextCard>Ce graphe représente le cours de l'or sur les 20 derniers jours. Le prix peut différer lors d'un achat réel.</TextCard>
            </CardItem>
          </View>
        )}
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  dataGold: state.goldChart.dataGold,
  isLoading: state.goldChart.isLoading,
  currentGoldValue: state.goldChart.currentGoldValue,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getDataGold: () => getDataGold(dispatch),
    dispatch,
  };
};

const styles = StyleSheet.create({
  Shadow: {
    paddingHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
    borderRadius: 0,
    marginTop: 15,
    marginBottom: 15,
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(GoldChart);
