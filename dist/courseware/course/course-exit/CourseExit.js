"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _reactRedux = require("react-redux");
var _reactRouterDom = require("react-router-dom");
var _CourseCelebration = _interopRequireDefault(require("./CourseCelebration"));
var _CourseInProgress = _interopRequireDefault(require("./CourseInProgress"));
var _CourseNonPassing = _interopRequireDefault(require("./CourseNonPassing"));
var _utils = require("./utils");
var _thunks = require("./data/thunks");
var _CourseExitPluginSlots = require("../../../plugin-slots/CourseExitPluginSlots");
var _modelStore = require("../../../generic/model-store");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const CourseExit = () => {
  const {
    courseId
  } = (0, _reactRedux.useSelector)(state => state.courseware);
  const {
    certificateData,
    courseExitPageIsActive,
    courseGoals,
    enrollmentMode,
    hasScheduledContent,
    isEnrolled,
    userHasPassingGrade
  } = (0, _modelStore.useModel)('coursewareMeta', courseId);
  const {
    isMasquerading,
    canViewCertificate
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const mode = (0, _utils.getCourseExitMode)(certificateData, hasScheduledContent, isEnrolled, userHasPassingGrade, courseExitPageIsActive, canViewCertificate);

  // Audit users cannot fully complete a course, so we will
  // unsubscribe them from goal reminders once they reach the course exit page
  // to avoid spamming them with goal reminder emails
  if (courseGoals && enrollmentMode === 'audit' && !isMasquerading) {
    (0, _react.useEffect)(() => {
      (0, _thunks.unsubscribeFromGoalReminders)(courseId);
    }, []);
  }
  let body = null;
  if (mode === _utils.COURSE_EXIT_MODES.nonPassing) {
    body = /*#__PURE__*/(0, _jsxRuntime.jsx)(_CourseNonPassing.default, {});
  } else if (mode === _utils.COURSE_EXIT_MODES.inProgress) {
    body = /*#__PURE__*/(0, _jsxRuntime.jsx)(_CourseInProgress.default, {});
  } else if (mode === _utils.COURSE_EXIT_MODES.celebration) {
    body = /*#__PURE__*/(0, _jsxRuntime.jsx)(_CourseCelebration.default, {});
  } else {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Navigate, {
      to: `/course/${courseId}`,
      replace: true
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CourseExitPluginSlots.CourseExitViewCoursesPluginSlot, {}), body]
  });
};
var _default = exports.default = CourseExit;
//# sourceMappingURL=CourseExit.js.map