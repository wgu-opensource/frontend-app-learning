"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _i18n = require("@edx/frontend-platform/i18n");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SidebarTriggerBase(_ref) {
  let {
    onClick,
    ariaLabel,
    children
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    className: "border border-light-400 bg-transparent align-items-center align-content-center d-flex",
    type: "button",
    onClick: onClick,
    "aria-label": ariaLabel,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "icon-container d-flex position-relative align-items-center",
      children: children
    })
  });
}

SidebarTriggerBase.propTypes = {
  onClick: _propTypes.default.func.isRequired,
  ariaLabel: _propTypes.default.string.isRequired,
  children: _propTypes.default.element.isRequired
};

var _default = (0, _i18n.injectIntl)(SidebarTriggerBase);

exports.default = _default;
//# sourceMappingURL=TriggerBase.js.map