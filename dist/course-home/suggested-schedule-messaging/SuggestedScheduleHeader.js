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
const SuggestedScheduleHeader = () => {
  const intl = (0, _i18n.useIntl)();
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
    className: "large",
    children: intl.formatMessage(_messages.default.suggestedSchedule)
  });
};
var _default = exports.default = SuggestedScheduleHeader;
//# sourceMappingURL=SuggestedScheduleHeader.js.map