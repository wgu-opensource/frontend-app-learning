"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useActiveEnterpriseAlert;
var _react = _interopRequireWildcard(require("react"));
var _userMessages = require("../../generic/user-messages");
var _modelStore = require("../../generic/model-store");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const ActiveEnterpriseAlert = /*#__PURE__*/_react.default.lazy(() => Promise.resolve().then(() => _interopRequireWildcard(require('./ActiveEnterpriseAlert'))));
function useActiveEnterpriseAlert(courseId) {
  const {
    courseAccess
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  /**
   * This alert should render if
   *    1. course access code is incorrect_active_enterprise
   */
  const isVisible = courseAccess && !courseAccess.hasAccess && courseAccess.errorCode === 'incorrect_active_enterprise';
  const payload = (0, _react.useMemo)(() => ({
    text: courseAccess && courseAccess.userMessage,
    courseId
  }), [courseAccess, courseId]);
  (0, _userMessages.useAlert)(isVisible, {
    code: 'clientActiveEnterpriseAlert',
    topic: 'outline',
    dismissible: false,
    type: _userMessages.ALERT_TYPES.ERROR,
    payload
  });
  return {
    clientActiveEnterpriseAlert: ActiveEnterpriseAlert
  };
}
//# sourceMappingURL=hooks.js.map