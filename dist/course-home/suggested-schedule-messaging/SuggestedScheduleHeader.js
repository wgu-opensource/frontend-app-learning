"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _i18n = require("@edx/frontend-platform/i18n");
var _messages = _interopRequireDefault(require("./messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const SuggestedScheduleHeader = _ref => {
  let {
    intl
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
    className: "large",
    children: intl.formatMessage(_messages.default.suggestedSchedule)
  });
};
SuggestedScheduleHeader.propTypes = {
  intl: _i18n.intlShape.isRequired
};
var _default = (0, _i18n.injectIntl)(SuggestedScheduleHeader);
exports.default = _default;
//# sourceMappingURL=SuggestedScheduleHeader.js.map