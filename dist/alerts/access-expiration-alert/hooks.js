"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.useAccessExpirationMasqueradeBanner = useAccessExpirationMasqueradeBanner;
var _react = _interopRequireWildcard(require("react"));
var _userMessages = require("../../generic/user-messages");
var _modelStore = require("../../generic/model-store");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const AccessExpirationAlert = /*#__PURE__*/_react.default.lazy(() => Promise.resolve().then(() => _interopRequireWildcard(require('./AccessExpirationAlert'))));
const AccessExpirationMasqueradeBanner = /*#__PURE__*/_react.default.lazy(() => Promise.resolve().then(() => _interopRequireWildcard(require('./AccessExpirationMasqueradeBanner'))));
function useAccessExpirationAlert(accessExpiration, courseId, org, userTimezone, topic, analyticsPageName) {
  const isVisible = accessExpiration && !accessExpiration.masqueradingExpiredCourse; // If it exists, show it.
  const payload = (0, _react.useMemo)(() => ({
    accessExpiration,
    courseId,
    org,
    userTimezone,
    analyticsPageName
  }), [accessExpiration, analyticsPageName, courseId, org, userTimezone]);
  (0, _userMessages.useAlert)(isVisible, {
    code: 'clientAccessExpirationAlert',
    payload,
    topic
  });
  return {
    clientAccessExpirationAlert: AccessExpirationAlert
  };
}
function useAccessExpirationMasqueradeBanner(courseId, tab) {
  const {
    userTimezone
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const {
    accessExpiration
  } = (0, _modelStore.useModel)(tab, courseId);
  const isVisible = accessExpiration && accessExpiration.masqueradingExpiredCourse;
  const expirationDate = accessExpiration && accessExpiration.expirationDate;
  const payload = (0, _react.useMemo)(() => ({
    expirationDate,
    userTimezone
  }), [expirationDate, userTimezone]);
  (0, _userMessages.useAlert)(isVisible, {
    code: 'clientAccessExpirationMasqueradeBanner',
    payload,
    topic: 'instructor-toolbar-alerts'
  });
  return {
    clientAccessExpirationMasqueradeBanner: AccessExpirationMasqueradeBanner
  };
}
var _default = exports.default = useAccessExpirationAlert;
//# sourceMappingURL=hooks.js.map