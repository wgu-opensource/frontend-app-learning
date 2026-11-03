"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ID", {
  enumerable: true,
  get: function () {
    return _NotificationTrigger.ID;
  }
});
Object.defineProperty(exports, "Sidebar", {
  enumerable: true,
  get: function () {
    return _NotificationTray.default;
  }
});
Object.defineProperty(exports, "Trigger", {
  enumerable: true,
  get: function () {
    return _NotificationTrigger.default;
  }
});
var _NotificationTray = _interopRequireDefault(require("./NotificationTray"));
var _NotificationTrigger = _interopRequireWildcard(require("./NotificationTrigger"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
//# sourceMappingURL=index.js.map