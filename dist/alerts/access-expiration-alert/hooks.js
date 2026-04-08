"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.useAccessExpirationMasqueradeBanner = useAccessExpirationMasqueradeBanner;
var _react = _interopRequireWildcard(require("react"));
var _userMessages = require("../../generic/user-messages");
var _modelStore = require("../../generic/model-store");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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