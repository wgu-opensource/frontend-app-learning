"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireWildcard(require("react"));

var _SidebarContext = _interopRequireDefault(require("./SidebarContext"));

var _sidebars = require("./sidebars");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SidebarTriggers() {
  const {
    toggleSidebar,
    currentSidebar
  } = (0, _react.useContext)(_SidebarContext.default);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: "d-flex ml-auto",
    children: _sidebars.SIDEBAR_ORDER.map(sidebarId => {
      const {
        Trigger
      } = _sidebars.SIDEBARS[sidebarId];
      const isActive = sidebarId === currentSidebar;
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: (0, _classnames.default)('mt-3', {
          'border-primary-700': isActive
        }),
        style: {
          borderBottom: isActive ? '2px solid' : null
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(Trigger, {
          onClick: () => toggleSidebar(sidebarId)
        }, sidebarId)
      }, sidebarId);
    })
  });
}

SidebarTriggers.propTypes = {};
var _default = SidebarTriggers;
exports.default = _default;
//# sourceMappingURL=SidebarTriggers.js.map