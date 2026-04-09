import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import PropTypes from 'prop-types';
const DashedCircleIcon = (props) => (_jsxs("svg", Object.assign({ width: 24, height: 24, viewBox: "0 0 40 40", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, props, { children: [_jsx("circle", { cx: "20", cy: "20", r: "15", stroke: "#ccc", strokeWidth: "3", strokeDasharray: "2.6 2.3", fill: "transparent", strokeDashoffset: "27" }), _jsx("circle", { cx: "20", cy: "20", r: "15", fill: "transparent", stroke: "#0d7d4d", strokeWidth: "3", strokeDasharray: `${props.percentage} ${props.remainder}`, strokeDashoffset: "29" })] })));
DashedCircleIcon.propTypes = {
    percentage: PropTypes.number.isRequired,
    remainder: PropTypes.number.isRequired,
};
export default DashedCircleIcon;
//# sourceMappingURL=DashedCircleIcon.js.map