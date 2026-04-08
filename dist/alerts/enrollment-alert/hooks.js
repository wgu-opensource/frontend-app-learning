"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useEnrollmentAlert = useEnrollmentAlert;
var _react = _interopRequireWildcard(require("react"));
var _react2 = require("@edx/frontend-platform/react");
var _userMessages = require("../../generic/user-messages");
var _modelStore = require("../../generic/model-store");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); } /* eslint-disable import/prefer-default-export */
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