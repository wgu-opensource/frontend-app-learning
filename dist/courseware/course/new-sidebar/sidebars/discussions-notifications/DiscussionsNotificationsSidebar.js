"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _i18n = require("@edx/frontend-platform/i18n");
var _SidebarBase = _interopRequireDefault(require("../../common/SidebarBase"));
var _messages = _interopRequireDefault(require("../../messages"));
var _SidebarContext = _interopRequireDefault(require("../../SidebarContext"));
var _DiscussionsWidget = _interopRequireDefault(require("./discussions/DiscussionsWidget"));
var _NotificationsWidget = _interopRequireDefault(require("./notifications/NotificationsWidget"));
var _DiscussionsNotificationsTrigger = require("./DiscussionsNotificationsTrigger");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const DiscussionsNotificationsSidebar = () => {
  const intl = (0, _i18n.useIntl)();
  const {
    hideNotificationbar
  } = (0, _react.useContext)(_SidebarContext.default);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_SidebarBase.default, {
    ariaLabel: intl.formatMessage(_messages.default.discussionNotificationTray),
    sidebarId: _DiscussionsNotificationsTrigger.ID,
    className: "d-flex flex-column flex-fill",
    showTitleBar: false,
    showBorder: false,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_NotificationsWidget.default, {}), !hideNotificationbar && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "my-1.5"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DiscussionsWidget.default, {})]
  });
};
var _default = exports.default = DiscussionsNotificationsSidebar;
//# sourceMappingURL=DiscussionsNotificationsSidebar.js.map