"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _i18n = require("@edx/frontend-platform/i18n");

var _modelStore = require("../../../../generic/model-store");

var _CurrentGradeTooltip = _interopRequireDefault(require("./CurrentGradeTooltip"));

var _PassingGradeTooltip = _interopRequireDefault(require("./PassingGradeTooltip"));

var _messages = _interopRequireDefault(require("../messages"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function GradeBar(_ref) {
  let {
    intl,
    passingGrade
  } = _ref;
  const {
    courseId
  } = (0, _reactRedux.useSelector)(state => state.courseHome);
  const {
    courseGrade: {
      isPassing,
      percent
    },
    gradesFeatureIsFullyLocked
  } = (0, _modelStore.useModel)('progress', courseId);
  const currentGrade = Number((percent * 100).toFixed(0));
  const lockedTooltipClassName = gradesFeatureIsFullyLocked ? 'locked-overlay' : '';

  const adjustedRtlStyle = percentOffest => (0, _i18n.isRtl)((0, _i18n.getLocale)()) ? {
    transform: `translateX(${100 - percentOffest}%)`
  } : {};

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "col-12 col-sm-6 align-self-center p-0",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "sr-only",
      children: intl.formatMessage(_messages.default.courseGradeBarAltText, {
        currentGrade,
        passingGrade
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("svg", {
      width: "100%",
      height: "100px",
      className: "grade-bar",
      "aria-hidden": "true",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
        style: {
          transform: 'translateY(2.61em)'
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
          className: "grade-bar__base",
          width: "100%"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
          className: "grade-bar--passing",
          width: `${passingGrade}%`,
          style: adjustedRtlStyle(passingGrade)
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
          className: `grade-bar--current-${isPassing ? 'passing' : 'non-passing'}`,
          width: `${currentGrade}%`,
          style: adjustedRtlStyle(currentGrade)
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
          className: "grade-bar__divider"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
          className: "grade-bar__divider",
          x: "99.7%"
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_PassingGradeTooltip.default, {
        passingGrade: passingGrade,
        tooltipClassName: lockedTooltipClassName
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CurrentGradeTooltip.default, {
        tooltipClassName: lockedTooltipClassName
      })]
    })]
  });
}

GradeBar.propTypes = {
  intl: _i18n.intlShape.isRequired,
  passingGrade: _propTypes.default.number.isRequired
};

var _default = (0, _i18n.injectIntl)(GradeBar);

exports.default = _default;
//# sourceMappingURL=GradeBar.js.map