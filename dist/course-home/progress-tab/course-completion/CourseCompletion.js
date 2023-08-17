"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@edx/frontend-platform/i18n");

var _CompletionDonutChart = _interopRequireDefault(require("./CompletionDonutChart"));

var _messages = _interopRequireDefault(require("./messages"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CourseCompletion(_ref) {
  let {
    intl
  } = _ref;
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
}

CourseCompletion.propTypes = {
  intl: _i18n.intlShape.isRequired
};

var _default = (0, _i18n.injectIntl)(CourseCompletion);

exports.default = _default;
//# sourceMappingURL=CourseCompletion.js.map