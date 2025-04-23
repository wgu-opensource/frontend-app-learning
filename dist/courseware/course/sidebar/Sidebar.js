"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _SidebarContext = _interopRequireDefault(require("./SidebarContext"));
var _sidebars = require("./sidebars");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Sidebar = () => {
  const {
    currentSidebar
  } = (0, _react.useContext)(_SidebarContext.default);
  if (!currentSidebar || !_sidebars.SIDEBARS[currentSidebar]) {
    return null;
  }
  const SidebarToRender = _sidebars.SIDEBARS[currentSidebar].Sidebar;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(SidebarToRender, {});
};
var _default = exports.default = Sidebar;
//# sourceMappingURL=Sidebar.js.map