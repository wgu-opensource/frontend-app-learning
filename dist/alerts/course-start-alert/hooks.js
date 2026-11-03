"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.useCourseStartMasqueradeBanner = useCourseStartMasqueradeBanner;
var _react = _interopRequireWildcard(require("react"));
var _userMessages = require("../../generic/user-messages");
var _modelStore = require("../../generic/model-store");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const CourseStartAlert = /*#__PURE__*/_react.default.lazy(() => Promise.resolve().then(() => _interopRequireWildcard(require('./CourseStartAlert'))));
const CourseStartMasqueradeBanner = /*#__PURE__*/_react.default.lazy(() => Promise.resolve().then(() => _interopRequireWildcard(require('./CourseStartMasqueradeBanner'))));
function IsStartDateInFuture(courseId) {
  const {
    start
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const today = new Date();
  const startDate = new Date(start);
  return startDate > today;
}
function useCourseStartAlert(courseId) {
  const {
    isEnrolled
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const isVisible = isEnrolled && IsStartDateInFuture(courseId);
  const payload = (0, _react.useMemo)(() => ({
    courseId
  }), [courseId]);
  (0, _userMessages.useAlert)(isVisible, {
    code: 'clientCourseStartAlert',
    payload,
    topic: 'outline-course-alerts'
  });
  return {
    clientCourseStartAlert: CourseStartAlert
  };
}
function useCourseStartMasqueradeBanner(courseId, tab) {
  const {
    isMasquerading
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const isVisible = isMasquerading && tab === 'progress' && IsStartDateInFuture(courseId);
  const payload = (0, _react.useMemo)(() => ({
    courseId
  }), [courseId]);
  (0, _userMessages.useAlert)(isVisible, {
    code: 'clientCourseStartMasqueradeBanner',
    payload,
    topic: 'instructor-toolbar-alerts'
  });
  return {
    clientCourseStartMasqueradeBanner: CourseStartMasqueradeBanner
  };
}
var _default = exports.default = useCourseStartAlert;
//# sourceMappingURL=hooks.js.map