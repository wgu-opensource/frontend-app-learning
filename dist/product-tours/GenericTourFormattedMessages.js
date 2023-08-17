"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DismissButtonFormattedMessage = DismissButtonFormattedMessage;
exports.NextButtonFormattedMessage = NextButtonFormattedMessage;
exports.OkayButtonFormattedMessage = OkayButtonFormattedMessage;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@edx/frontend-platform/i18n");

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DismissButtonFormattedMessage() {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
    id: "tours.button.dismiss",
    defaultMessage: "Dismiss",
    description: "A button used to close the tour of the website"
  });
}

function NextButtonFormattedMessage() {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
    id: "tours.button.next",
    defaultMessage: "Next",
    description: "A button used within a tour of the website to advance to the next piece of information"
  });
}

function OkayButtonFormattedMessage() {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
    id: "tours.button.okay",
    defaultMessage: "Okay",
    description: "A button used to end the tour of the website"
  });
}
//# sourceMappingURL=GenericTourFormattedMessages.js.map