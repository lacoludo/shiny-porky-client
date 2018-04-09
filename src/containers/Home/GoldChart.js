import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActivityIndicator, Text, View  } from 'react-native';
import { Card, CardItem } from 'native-base';
import { AreaChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { getDataGold } from '../../actions/goldChart';
import { TextTitleCard } from '../../components/styles/StyledText';

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
      <Card style={{ paddingHorizontal: 6 }}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#000" style={{ height: 329 }} />
        ) : (
          <View>
            <CardItem style={{ justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#DDD' }}>
              <TextTitleCard>{`Valeur de l'or : ${currentGoldValue}€ pour 5 Grammes`}</TextTitleCard>
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

export default connect(mapStateToProps, mapDispatchToProps)(GoldChart);
