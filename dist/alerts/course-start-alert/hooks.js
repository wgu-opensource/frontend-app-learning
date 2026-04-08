"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.useCourseStartMasqueradeBanner = useCourseStartMasqueradeBanner;
var _react = _interopRequireWildcard(require("react"));
var _userMessages = require("../../generic/user-messages");
var _modelStore = require("../../generic/model-store");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
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