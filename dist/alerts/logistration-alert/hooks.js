"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLogistrationAlert = useLogistrationAlert;
var _react = _interopRequireWildcard(require("react"));
var _react2 = require("@edx/frontend-platform/react");
var _userMessages = require("../../generic/user-messages");
var _modelStore = require("../../generic/model-store");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); } /* eslint-disable import/prefer-default-export */
const LogistrationAlert = /*#__PURE__*/_react.default.lazy(() => Promise.resolve().then(() => _interopRequireWildcard(require('./LogistrationAlert'))));
function useLogistrationAlert(courseId) {
  const {
    authenticatedUser
  } = (0, _react.useContext)(_react2.AppContext);
  const outline = (0, _modelStore.useModel)('outline', courseId);
  const privateOutline = outline && outline.courseBlocks && !outline.courseBlocks.courses;
  /**
   * This alert should render if
   *    1. the user is not authenticated, AND
   *    2. the course is private.
   */
  const isVisible = authenticatedUser === null && privateOutline;
  (0, _userMessages.useAlert)(isVisible, {
    code: 'clientLogistrationAlert',
    topic: 'outline',
    dismissible: false,
    type: _userMessages.ALERT_TYPES.ERROR
  });
  return {
    clientLogistrationAlert: LogistrationAlert
  };
}
//# sourceMappingURL=hooks.js.map