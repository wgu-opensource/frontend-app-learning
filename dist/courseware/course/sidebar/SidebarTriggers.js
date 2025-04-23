"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _classnames = _interopRequireDefault(require("classnames"));
var _paragon = require("@openedx/paragon");
var _SidebarContext = _interopRequireDefault(require("./SidebarContext"));
var _sidebars = require("./sidebars");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const SidebarTriggers = () => {
  const {
    toggleSidebar,
    currentSidebar
  } = (0, _react.useContext)(_SidebarContext.default);
  const isMobileView = (0, _paragon.useWindowSize)().width < _paragon.breakpoints.small.minWidth;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: "d-flex ml-auto",
    children: _sidebars.SIDEBAR_ORDER.map(sidebarId => {
      const {
        Trigger
      } = _sidebars.SIDEBARS[sidebarId];
      const isActive = sidebarId === currentSidebar;
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: (0, _classnames.default)({
          'ml-1': !isMobileView,
          'border-primary-700 sidebar-active': isActive
        }),
        style: {
          borderBottom: '2px solid',
          borderColor: isActive ? 'inherit' : 'transparent'
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(Trigger, {
          onClick: () => toggleSidebar(sidebarId)
        }, sidebarId)
      }, sidebarId);
    })
  });
};
SidebarTriggers.propTypes = {};
var _default = exports.default = SidebarTriggers;
//# sourceMappingURL=SidebarTriggers.js.map