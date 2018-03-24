import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActivityIndicator, View } from "react-native";
import { Card, CardItem } from "native-base";
import { AreaChart } from "react-native-svg-charts";
import * as shape from "d3-shape";
import TooltipChart from './TooltipChart';
import { getDataGold } from '../../actions/goldChart';

export class GoldChart extends React.Component {
  static propTypes = {
    getDataGold: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    dataGold: PropTypes.array.isRequired,
  }

  componentDidMount() {
    this.props.getDataGold();
  }

  render() {
    const { dataGold, isLoading } = this.props;
    const lastIndexToDisplay = dataGold.length - 3;
    const TooltipFirst = ({ x, y }) => (<TooltipChart x={x} y={y} index={2} data={dataGold[2]} key={2} />)
    const TooltipLast = ({ x, y }) => (<TooltipChart x={x} y={y} index={lastIndexToDisplay} key={lastIndexToDisplay} data={dataGold[lastIndexToDisplay]} />);
  
    return (
      <Card style={{ paddingHorizontal: 6 }}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#000" style={{ height: 329}} />
        ) : (
          <CardItem cardBody>
            <AreaChart
              style={{ height: 200, width: 300 }}
              data={dataGold}
              svg={{ fill: "rgba(211, 175, 55, 0.8)" }}
              contentInset={{ top: 20, bottom: 20 }}
              extras={[TooltipFirst, TooltipLast]}
              curve={shape.curveLinear}
              showGrid={false}
            />
          </CardItem>
        )}
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  dataGold: state.goldChart.dataGold,
  isLoading: state.goldChart.isLoading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getDataGold: () => getDataGold(dispatch),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GoldChart);
