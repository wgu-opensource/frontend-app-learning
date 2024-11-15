"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _i18n = require("@edx/frontend-platform/i18n");
var _modelStore = require("../../../generic/model-store");
var _CompleteDonutSegment = _interopRequireDefault(require("./CompleteDonutSegment"));
var _IncompleteDonutSegment = _interopRequireDefault(require("./IncompleteDonutSegment"));
var _LockedDonutSegment = _interopRequireDefault(require("./LockedDonutSegment"));
var _messages = _interopRequireDefault(require("./messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const CompletionDonutChart = _ref => {
  let {
    intl
  } = _ref;
  const {
    courseId
  } = (0, _reactRedux.useSelector)(state => state.courseHome);
  const {
    completionSummary: {
      completeCount,
      incompleteCount,
      lockedCount
    }
  } = (0, _modelStore.useModel)('progress', courseId);
  const numTotalUnits = completeCount + incompleteCount + lockedCount;
  const completePercentage = completeCount ? Number((completeCount / numTotalUnits * 100).toFixed(0)) : 0;
  const lockedPercentage = lockedCount ? Number((lockedCount / numTotalUnits * 100).toFixed(0)) : 0;
  const incompletePercentage = 100 - completePercentage - lockedPercentage;
  const isLocaleRtl = (0, _i18n.isRtl)((0, _i18n.getLocale)());
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("svg", {
      role: "img",
      width: "50%",
      height: "100%",
      viewBox: "0 0 42 42",
      className: "donut",
      style: {
        maxWidth: '178px'
      },
      "aria-hidden": "true",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
        className: "donut-hole",
        fill: "#fff",
        cx: "21",
        cy: "21",
        r: "15.91549430918954"
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
        className: "donut-chart-text",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("text", {
          x: "50%",
          y: "50%",
          className: "donut-chart-number",
          children: [completePercentage, isLocaleRtl && '\u200f', "%"]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("text", {
          x: "50%",
          y: "50%",
          className: "donut-chart-label",
          children: intl.formatMessage(_messages.default.donutLabel)
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_IncompleteDonutSegment.default, {
        incompletePercentage: incompletePercentage
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LockedDonutSegment.default, {
        lockedPercentage: lockedPercentage
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CompleteDonutSegment.default, {
        completePercentage: completePercentage,
        lockedPercentage: lockedPercentage
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "sr-only",
      children: [intl.formatMessage(_messages.default.percentComplete, {
        percent: completePercentage
      }), intl.formatMessage(_messages.default.percentIncomplete, {
        percent: incompletePercentage
      }), lockedPercentage > 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
        children: intl.formatMessage(_messages.default.percentLocked, {
          percent: lockedPercentage
        })
      })]
    })]
  });
};
CompletionDonutChart.propTypes = {
  intl: _i18n.intlShape.isRequired
};
var _default = (0, _i18n.injectIntl)(CompletionDonutChart);
exports.default = _default;
//# sourceMappingURL=CompletionDonutChart.js.map