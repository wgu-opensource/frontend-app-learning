"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.useAccessExpirationMasqueradeBanner = useAccessExpirationMasqueradeBanner;
var _react = _interopRequireWildcard(require("react"));
var _userMessages = require("../../generic/user-messages");
var _modelStore = require("../../generic/model-store");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
var _default = useAccessExpirationAlert;
exports.default = _default;
//# sourceMappingURL=hooks.js.map