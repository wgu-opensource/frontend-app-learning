"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const SidebarTriggerBase = ({
  onClick,
  ariaLabel,
  children
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
  className: "border border-light-400 bg-transparent align-items-center align-content-center d-flex notification-btn",
  type: "button",
  onClick: onClick,
  "aria-label": ariaLabel,
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: "icon-container d-flex position-relative align-items-center",
    children: children
  })
});
SidebarTriggerBase.propTypes = {
  onClick: _propTypes.default.func.isRequired,
  ariaLabel: _propTypes.default.string.isRequired,
  children: _propTypes.default.element.isRequired
};
var _default = exports.default = SidebarTriggerBase;
//# sourceMappingURL=TriggerBase.js.map