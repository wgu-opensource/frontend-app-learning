"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _frontendPlatform = require("@edx/frontend-platform");
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@openedx/paragon");
var _reactRedux = require("react-redux");
var _reactRouterDom = require("react-router-dom");
var _CourseCelebration = _interopRequireDefault(require("./CourseCelebration"));
var _CourseInProgress = _interopRequireDefault(require("./CourseInProgress"));
var _CourseNonPassing = _interopRequireDefault(require("./CourseNonPassing"));
var _utils = require("./utils");
var _messages = _interopRequireDefault(require("./messages"));
var _thunks = require("./data/thunks");
var _modelStore = require("../../../generic/model-store");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const CourseExit = _ref => {
  let {
    intl
  } = _ref;
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
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "row w-100 mt-2 mb-4 justify-content-end",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
        variant: "outline-primary",
        href: `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/dashboard`,
        children: intl.formatMessage(_messages.default.viewCoursesButton)
      })
    }), body]
  });
};
CourseExit.propTypes = {
  intl: _i18n.intlShape.isRequired
};
var _default = exports.default = (0, _i18n.injectIntl)(CourseExit);
//# sourceMappingURL=CourseExit.js.map