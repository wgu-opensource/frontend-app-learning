"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@edx/paragon");
var _messages = _interopRequireDefault(require("../messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const PassingGradeTooltip = _ref => {
  let {
    intl,
    passingGrade,
    tooltipClassName
  } = _ref;
  const isLocaleRtl = (0, _i18n.isRtl)((0, _i18n.getLocale)());
  let passingGradeDirection = passingGrade < 50 ? '' : '-';
  if (isLocaleRtl) {
    passingGradeDirection = passingGrade < 50 ? '-' : '';
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.OverlayTrigger, {
      show: true,
      placement: "bottom",
      overlay: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Popover, {
        id: "minimum-grade-tooltip",
        className: `bg-primary-500 ${tooltipClassName}`,
        "aria-hidden": "true",
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Popover.Content, {
          className: "text-white",
          children: [passingGrade, isLocaleRtl && '\u200f', "%"]
        })
      }),
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
          cx: `${isLocaleRtl ? 100 - passingGrade : passingGrade}%`,
          cy: "50%",
          r: "8.5",
          fill: "transparent"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
          className: "grade-bar--passing",
          cx: `${isLocaleRtl ? 100 - passingGrade : passingGrade}%`,
          cy: "50%",
          r: "4.5"
        })]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("text", {
      className: "x-small",
      textAnchor: passingGrade < 50 ? 'start' : 'end',
      x: `${isLocaleRtl ? 100 - passingGrade : passingGrade}%`,
      y: "90px",
      style: {
        transform: `translateX(${passingGradeDirection}3.4em)`
      },
      children: intl.formatMessage(_messages.default.passingGradeLabel)
    })]
  });
};
PassingGradeTooltip.defaultProps = {
  tooltipClassName: ''
};
PassingGradeTooltip.propTypes = {
  intl: _i18n.intlShape.isRequired,
  passingGrade: _propTypes.default.number.isRequired,
  tooltipClassName: _propTypes.default.string
};
var _default = (0, _i18n.injectIntl)(PassingGradeTooltip);
exports.default = _default;
//# sourceMappingURL=PassingGradeTooltip.js.map