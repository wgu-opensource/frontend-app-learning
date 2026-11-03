"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useEnrollmentAlert = useEnrollmentAlert;
var _react = _interopRequireWildcard(require("react"));
var _react2 = require("@edx/frontend-platform/react");
var _userMessages = require("../../generic/user-messages");
var _modelStore = require("../../generic/model-store");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; } /* eslint-disable import/prefer-default-export */
const EnrollmentAlert = /*#__PURE__*/_react.default.lazy(() => Promise.resolve().then(() => _interopRequireWildcard(require('./EnrollmentAlert'))));
function useEnrollmentAlert(courseId) {
  const {
    authenticatedUser
  } = (0, _react.useContext)(_react2.AppContext);
  const course = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const outline = (0, _modelStore.useModel)('outline', courseId);
  const enrolledUser = course && course.isEnrolled !== undefined && course.isEnrolled;
  const privateOutline = outline && outline.courseBlocks && !outline.courseBlocks.courses;
  /**
   * This alert should render if
   *    1. the user is not enrolled,
   *    2. the user is authenticated, AND
   *    3. the course is private.
   */
  const isVisible = !enrolledUser && authenticatedUser !== null && privateOutline;
  const payload = (0, _react.useMemo)(() => ({
    canEnroll: outline && outline.enrollAlert ? outline.enrollAlert.canEnroll : false,
    courseId,
    extraText: outline && outline.enrollAlert ? outline.enrollAlert.extraText : '',
    isStaff: course && course.isStaff
  }), [course, courseId, outline]);
  (0, _userMessages.useAlert)(isVisible, {
    code: 'clientEnrollmentAlert',
    payload,
    topic: 'outline'
  });
  return {
    clientEnrollmentAlert: EnrollmentAlert
  };
}
//# sourceMappingURL=hooks.js.map