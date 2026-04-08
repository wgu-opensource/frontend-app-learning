"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@openedx/paragon");
var _hooks = require("../../../../data/hooks");
var _modelStore = require("../../../../generic/model-store");
var _messages = _interopRequireDefault(require("../messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const CurrentGradeTooltip = ({
  tooltipClassName
}) => {
  const intl = (0, _i18n.useIntl)();
  const courseId = (0, _hooks.useContextId)();
  const {
    assignmentTypeGradeSummary,
    courseGrade: {
      isPassing,
      percent
    }
  } = (0, _modelStore.useModel)('progress', courseId);
  const currentGrade = Number((percent * 100).toFixed(0));
  let currentGradeDirection = currentGrade < 50 ? '' : '-';
  const isLocaleRtl = (0, _i18n.isRtl)((0, _i18n.getLocale)());
  const hasHiddenGrades = assignmentTypeGradeSummary.some(assignmentType => assignmentType.hasHiddenContribution !== 'none');
  if (isLocaleRtl) {
    currentGradeDirection = currentGrade < 50 ? '-' : '';
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.OverlayTrigger, {
      show: true,
      placement: "top",
      overlay: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Popover, {
        id: `${isPassing ? 'passing' : 'non-passing'}-grade-tooltip`,
        "aria-hidden": "true",
        className: tooltipClassName,
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Popover.Content, {
          "data-testid": "currentGradeTooltipContent",
          className: isPassing ? 'text-white' : 'text-dark-700',
          children: [currentGrade.toFixed(0), isLocaleRtl ? '\u200f' : '', "%"]
        })
      }),
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
          cx: `${Math.min(...[isLocaleRtl ? 100 - currentGrade : currentGrade, 100])}%`,
          cy: "50%",
          r: "8.5",
          fill: "transparent"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
          className: "grade-bar__divider",
          x: `${Math.min(...[isLocaleRtl ? 100 - currentGrade : currentGrade, 100])}%`,
          style: {
            transform: 'translateY(2.61em)'
          }
        })]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("text", {
      className: "x-small",
      textAnchor: currentGrade < 50 ? 'start' : 'end',
      x: `${Math.min(...[isLocaleRtl ? 100 - currentGrade : currentGrade, 100])}%`,
      y: "20px",
      style: {
        transform: `translateX(${currentGradeDirection}3.4em)`
      },
      children: intl.formatMessage(_messages.default.currentGradeLabel)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("text", {
      className: "x-small",
      textAnchor: currentGrade < 50 ? 'start' : 'end',
      x: `${Math.min(...[isLocaleRtl ? 100 - currentGrade : currentGrade, 100])}%`,
      y: "35px",
      style: {
        transform: `translateX(${currentGradeDirection}3.4em)`
      },
      children: hasHiddenGrades ? ` + ${intl.formatMessage(_messages.default.hiddenScoreLabel)}` : ''
    })]
  });
};
CurrentGradeTooltip.defaultProps = {
  tooltipClassName: ''
};
CurrentGradeTooltip.propTypes = {
  tooltipClassName: _propTypes.default.string
};
var _default = exports.default = CurrentGradeTooltip;
//# sourceMappingURL=CurrentGradeTooltip.js.map