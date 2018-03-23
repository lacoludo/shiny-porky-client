export const TooltipFirst = ({ x, y }) => (
    <G x={x(2) - 75 / 2} key="tooltip">
    <G y={50}>
        <Text
        x={75 / 2}
        dy={y(dataSource[2])}
        alignmentBaseline="middle"
        textAnchor="middle"
        stroke="grey"
        fontSize="16"
        >
        {`${Math.round(dataSource[2])} €`}
        </Text>
    </G>
    <G x={75 / 2}>
        <Circle
        cy={y(dataSource[2])}
        r={6}
        stroke="rgb(211, 175, 55)"
        strokeWidth={2}
        fill="white"
        />
    </G>
    </G>
);