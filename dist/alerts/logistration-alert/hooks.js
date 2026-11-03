"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLogistrationAlert = useLogistrationAlert;
var _react = _interopRequireWildcard(require("react"));
var _react2 = require("@edx/frontend-platform/react");
var _userMessages = require("../../generic/user-messages");
var _modelStore = require("../../generic/model-store");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; } /* eslint-disable import/prefer-default-export */
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