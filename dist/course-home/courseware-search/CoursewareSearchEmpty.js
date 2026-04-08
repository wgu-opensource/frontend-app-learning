"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _i18n = require("@edx/frontend-platform/i18n");
var _messages = _interopRequireDefault(require("./messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const CoursewareSearchEmpty = () => {
  const intl = (0, _i18n.useIntl)();
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: "courseware-search-results",
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      className: "courseware-search-results__empty",
      "data-testid": "no-results",
      children: intl.formatMessage(_messages.default.searchResultsNone)
    })
  });
};
var _default = exports.default = CoursewareSearchEmpty;
//# sourceMappingURL=CoursewareSearchEmpty.js.map