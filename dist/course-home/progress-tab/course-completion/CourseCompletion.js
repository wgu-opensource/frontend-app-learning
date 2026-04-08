"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _i18n = require("@edx/frontend-platform/i18n");
var _CompletionDonutChart = _interopRequireDefault(require("./CompletionDonutChart"));
var _messages = _interopRequireDefault(require("./messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const CourseCompletion = () => {
  const intl = (0, _i18n.useIntl)();
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("section", {
    className: "text-dark-700 mb-4 rounded raised-card p-4",
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "row w-100 m-0",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "col-12 col-sm-6 col-md-7 p-0",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
          children: intl.formatMessage(_messages.default.courseCompletion)
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          className: "small",
          children: intl.formatMessage(_messages.default.completionBody)
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "col-12 col-sm-6 col-md-5 mt-sm-n3 p-0 text-center",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CompletionDonutChart.default, {})
      })]
    })
  });
};
var _default = exports.default = CourseCompletion;
//# sourceMappingURL=CourseCompletion.js.map