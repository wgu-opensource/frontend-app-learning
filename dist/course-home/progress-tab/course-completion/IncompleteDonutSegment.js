"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@openedx/paragon");
var _messages = _interopRequireDefault(require("./messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const IncompleteDonutSegment = ({
  incompletePercentage
}) => {
  const intl = (0, _i18n.useIntl)();
  const [showIncompletePopover, setShowIncompletePopover] = (0, _react.useState)(false);
  if (!incompletePercentage) {
    return null;
  }
  const incompleteSegmentOffset = 3.6 * incompletePercentage / 16;
  const incompleteTooltipDegree = incompletePercentage < 100 ? incompleteSegmentOffset : 0;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
    className: "donut-segment-group",
    onBlur: () => setShowIncompletePopover(false),
    onFocus: () => setShowIncompletePopover(true),
    tabIndex: "-1",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
      className: "donut-ring incomplete-stroke",
      cx: "21",
      cy: "21",
      r: "15.91549430918954",
      strokeDasharray: `${incompletePercentage} ${100 - incompletePercentage}`,
      strokeDashoffset: "25"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.OverlayTrigger, {
      show: showIncompletePopover,
      placement: "top",
      overlay: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Popover, {
        id: "incomplete-tooltip-popover",
        "aria-hidden": "true",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Popover.Content, {
          children: intl.formatMessage(_messages.default.incompleteContentTooltip)
        })
      }),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
        x: "19",
        y: "3",
        style: {
          transform: `rotate(${incompleteTooltipDegree}deg)`
        }
      })
    })]
  });
};
IncompleteDonutSegment.propTypes = {
  incompletePercentage: _propTypes.default.number.isRequired
};
var _default = exports.default = IncompleteDonutSegment;
//# sourceMappingURL=IncompleteDonutSegment.js.map