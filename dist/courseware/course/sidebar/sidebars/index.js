"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SIDEBAR_ORDER = exports.SIDEBARS = void 0;
var notifications = _interopRequireWildcard(require("./notifications"));
var discussions = _interopRequireWildcard(require("./discussions"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const SIDEBARS = exports.SIDEBARS = {
  [notifications.ID]: {
    ID: notifications.ID,
    Sidebar: notifications.Sidebar,
    Trigger: notifications.Trigger
  },
  [discussions.ID]: {
    ID: discussions.ID,
    Sidebar: discussions.Sidebar,
    Trigger: discussions.Trigger
  }
};
const SIDEBAR_ORDER = exports.SIDEBAR_ORDER = [discussions.ID, notifications.ID];
//# sourceMappingURL=index.js.map