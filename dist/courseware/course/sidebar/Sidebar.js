"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _sidebars = require("./sidebars");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Sidebar = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
  children: _sidebars.SIDEBAR_ORDER.map(sideBarId => {
    const SidebarToRender = _sidebars.SIDEBARS[sideBarId].Sidebar;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(SidebarToRender, {});
  })
});
var _default = Sidebar;
exports.default = _default;
//# sourceMappingURL=Sidebar.js.map