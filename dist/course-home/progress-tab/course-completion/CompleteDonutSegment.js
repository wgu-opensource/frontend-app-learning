"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _i18n = require("@edx/frontend-platform/i18n");

var _paragon = require("@edx/paragon");

var _messages = _interopRequireDefault(require("./messages"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function CompleteDonutSegment(_ref) {
  let {
    completePercentage,
    intl,
    lockedPercentage
  } = _ref;

  if (!completePercentage) {
    return null;
  }

  const [showCompletePopover, setShowCompletePopover] = (0, _react.useState)(false);
  const completeSegmentOffset = 3.6 * completePercentage / 8;
  let completeTooltipDegree = completePercentage < 100 ? -completeSegmentOffset : 0;
  const lockedSegmentOffset = lockedPercentage - 75;

  if (lockedPercentage > 0) {
    completeTooltipDegree = (lockedSegmentOffset + completePercentage) * -3.6 + 90 + completeSegmentOffset;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
    className: "donut-segment-group",
    onBlur: () => setShowCompletePopover(false),
    onFocus: () => setShowCompletePopover(true),
    tabIndex: "-1",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.OverlayTrigger, {
      show: showCompletePopover,
      placement: "top",
      overlay: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Popover, {
        "aria-hidden": "true",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Popover.Content, {
          children: intl.formatMessage(_messages.default.completeContentTooltip)
        })
      }),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
        x: "19",
        y: "3",
        style: {
          transform: `rotate(${completeTooltipDegree}deg)`
        }
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
      className: "donut-segment complete-stroke",
      cx: "21",
      cy: "21",
      r: "15.91549430918954",
      strokeDasharray: `${completePercentage} ${100 - completePercentage}`,
      strokeDashoffset: lockedSegmentOffset + completePercentage
    }), lockedPercentage > 0 && lockedPercentage < 100 && /*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
      cx: "21",
      cy: "21",
      r: "15.91549430918954",
      className: "donut-segment divider-stroke",
      strokeDasharray: "0.3 99.7",
      strokeDashoffset: 0.15 + lockedSegmentOffset
    }), completePercentage < 100 && lockedPercentage > 0 && lockedPercentage < 100 && lockedPercentage + completePercentage === 100 && /*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
      cx: "21",
      cy: "21",
      r: "15.91549430918954",
      className: "donut-segment divider-stroke",
      strokeDasharray: "0.3 99.7",
      strokeDashoffset: "25.15"
    })]
  });
}

CompleteDonutSegment.propTypes = {
  completePercentage: _propTypes.default.number.isRequired,
  intl: _i18n.intlShape.isRequired,
  lockedPercentage: _propTypes.default.number.isRequired
};

var _default = (0, _i18n.injectIntl)(CompleteDonutSegment);

exports.default = _default;
//# sourceMappingURL=CompleteDonutSegment.js.map