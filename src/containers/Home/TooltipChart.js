import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Circle, G, Text } from "react-native-svg";

class TooltipChart extends PureComponent {
  static propTypes = {
		x: PropTypes.func.isRequired,
		y: PropTypes.func.isRequired,
		index: PropTypes.number.isRequired,
		data: PropTypes.number.isRequired,
	}

  render = () => {
		const { x, y, index, data} = this.props;
    return (
      <G x={x(index) - 75 / 2} key={index}>
				<G y={50}>
					<Text
						x={75 / 2}
						dy={y(data) -30}
						alignmentBaseline="middle"
						textAnchor="middle"
						stroke="grey"
						fontSize="16"
					>
						{`${Math.round(data)} €`}
					</Text>
				</G>
				<G x={75 / 2}>
					<Circle
						cy={y(data)}
						r={6}
						stroke="rgb(211, 175, 55)"
						strokeWidth={2}
						fill="white"
					/>
				</G>
			</G>
    )
  }
}

export default TooltipChart;
