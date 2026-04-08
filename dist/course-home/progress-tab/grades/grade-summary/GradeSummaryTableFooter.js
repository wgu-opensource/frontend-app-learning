"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@openedx/paragon");
var _icons = require("@openedx/paragon/icons");
var _hooks = require("../../../../data/hooks");
var _modelStore = require("../../../../generic/model-store");
var _messages = _interopRequireDefault(require("../messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const GradeSummaryTableFooter = () => {
  const intl = (0, _i18n.useIntl)();
  const courseId = (0, _hooks.useContextId)();
  const {
    courseGrade: {
      isPassing,
      percent
    },
    finalGrades
  } = (0, _modelStore.useModel)('progress', courseId);
  const getGradePercent = grade => {
    const percentage = grade * 100;
    return Number.isInteger(percentage) ? percentage.toFixed(0) : percentage.toFixed(2);
  };
  const rawGrade = getGradePercent(finalGrades);
  const bgColor = isPassing ? 'bg-success-100' : 'bg-warning-100';
  const totalGrade = (percent * 100).toFixed(0);
  const isLocaleRtl = (0, _i18n.isRtl)((0, _i18n.getLocale)());
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.DataTable.TableFooter, {
    className: `border-top border-primary ${bgColor}`,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "row w-100 m-0",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        id: "weighted-grade-summary",
        className: "col-8 p-0 small",
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Stack, {
          gap: 2,
          direction: "horizontal",
          children: [intl.formatMessage(_messages.default.weightedGradeSummary), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.OverlayTrigger, {
            trigger: "hover",
            placement: "bottom",
            overlay: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Tooltip, {
              children: intl.formatMessage(_messages.default.weightedGradeSummaryTooltip, {
                roundedGrade: totalGrade,
                rawGrade
              })
            }),
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
              src: _icons.InfoOutline,
              size: "sm",
              alt: intl.formatMessage(_messages.default.gradeSummaryTooltipAlt)
            })
          })]
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        "data-testid": "gradeSummaryFooterTotalWeightedGrade",
        "aria-labelledby": "weighted-grade-summary",
        className: "col-4 p-0 text-right font-weight-bold small",
        children: [totalGrade, isLocaleRtl && '\u200f', "%"]
      })]
    })
  });
};
var _default = exports.default = GradeSummaryTableFooter;
//# sourceMappingURL=GradeSummaryTableFooter.js.map