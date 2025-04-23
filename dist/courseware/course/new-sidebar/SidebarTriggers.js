"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _SidebarContext = _interopRequireDefault(require("./SidebarContext"));
var _sidebars = require("./sidebars");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const SidebarTriggers = () => {
  const {
    toggleSidebar
  } = (0, _react.useContext)(_SidebarContext.default);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: "d-flex ml-auto",
    children: _sidebars.SIDEBAR_ORDER.map(sidebarId => {
      const {
        Trigger
      } = _sidebars.SIDEBARS[sidebarId];
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(Trigger, {
        onClick: () => toggleSidebar(sidebarId)
      }, sidebarId);
    })
  });
};
var _default = exports.default = SidebarTriggers;
//# sourceMappingURL=SidebarTriggers.js.map