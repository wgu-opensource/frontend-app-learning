"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactHelmet = require("react-helmet");
var _reactRedux = require("react-redux");
var _frontendPlatform = require("@edx/frontend-platform");
var _paragon = require("@openedx/paragon");
var _userMessages = require("@src/generic/user-messages");
var _modelStore = require("@src/generic/model-store");
var _selectors = require("../data/selectors");
var _courseOutline = require("./sidebar/sidebars/course-outline");
var _Chat = _interopRequireDefault(require("./chat/Chat"));
var _SidebarContextProvider = _interopRequireDefault(require("./sidebar/SidebarContextProvider"));
var _SidebarTriggers = _interopRequireDefault(require("./sidebar/SidebarTriggers"));
var _SidebarContextProvider2 = _interopRequireDefault(require("./new-sidebar/SidebarContextProvider"));
var _SidebarTriggers2 = _interopRequireDefault(require("./new-sidebar/SidebarTriggers"));
var _celebration = require("./celebration");
var _CourseBreadcrumbs = _interopRequireDefault(require("./CourseBreadcrumbs"));
var _contentTools = _interopRequireDefault(require("./content-tools"));
var _sequence = _interopRequireDefault(require("./sequence"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const Course = _ref => {
  let {
    courseId,
    sequenceId,
    unitId,
    nextSequenceHandler,
    previousSequenceHandler,
    unitNavigationHandler,
    windowWidth
  } = _ref;
  const course = (0, _modelStore.useModel)('coursewareMeta', courseId);
  const {
    celebrations,
    isStaff,
    isNewDiscussionSidebarViewEnabled
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const sequence = (0, _modelStore.useModel)('sequences', sequenceId);
  const section = (0, _modelStore.useModel)('sections', sequence ? sequence.sectionId : null);
  const {
    enableNavigationSidebar
  } = (0, _reactRedux.useSelector)(_selectors.getCoursewareOutlineSidebarSettings);
  const navigationDisabled = enableNavigationSidebar || (sequence?.navigationDisabled ?? false);
  const pageTitleBreadCrumbs = [sequence, section, course].filter(element => element != null).map(element => element.title);

  // Below the tabs, above the breadcrumbs alerts (appearing in the order listed here)
  const dispatch = (0, _reactRedux.useDispatch)();
  const [firstSectionCelebrationOpen, setFirstSectionCelebrationOpen] = (0, _react.useState)(false);
  // If streakLengthToCelebrate is populated, that modal takes precedence. Wait til the next load to display
  // the weekly goal celebration modal.
  const [weeklyGoalCelebrationOpen, setWeeklyGoalCelebrationOpen] = (0, _react.useState)(celebrations && !celebrations.streakLengthToCelebrate && celebrations.weeklyGoal);
  const shouldDisplayChat = windowWidth >= _paragon.breakpoints.medium.minWidth;
  const daysPerWeek = course?.courseGoals?.selectedGoal?.daysPerWeek;
  (0, _react.useEffect)(() => {
    const celebrateFirstSection = celebrations && celebrations.firstSection;
    setFirstSectionCelebrationOpen((0, _celebration.shouldCelebrateOnSectionLoad)(courseId, sequenceId, celebrateFirstSection, dispatch, celebrations));
  }, [sequenceId]);
  (0, _react.useEffect)(() => {
    const celebrateFirstSection = celebrations && celebrations.firstSection;
    setFirstSectionCelebrationOpen((0, _celebration.shouldCelebrateOnSectionLoad)(courseId, sequenceId, celebrateFirstSection, dispatch, celebrations));
  }, [sequenceId]);
  const SidebarProviderComponent = isNewDiscussionSidebarViewEnabled ? _SidebarContextProvider2.default : _SidebarContextProvider.default;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(SidebarProviderComponent, {
    courseId: courseId,
    unitId: unitId,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactHelmet.Helmet, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("title", {
        children: `${pageTitleBreadCrumbs.join(' | ')} | ${(0, _frontendPlatform.getConfig)().SITE_NAME}`
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "position-relative d-flex align-items-xl-center mb-4 mt-1 flex-column flex-xl-row",
      children: [navigationDisabled || /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CourseBreadcrumbs.default, {
          courseId: courseId,
          sectionId: section ? section.id : null,
          sequenceId: sequenceId,
          isStaff: isStaff,
          unitId: unitId
        })
      }), shouldDisplayChat && /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Chat.default, {
          enabled: course.learningAssistantEnabled,
          enrollmentMode: course.enrollmentMode,
          isStaff: isStaff,
          courseId: courseId,
          contentToolsEnabled: course.showCalculator || course.notes.enabled,
          unitId: unitId
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "w-100 d-flex align-items-center",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_courseOutline.Trigger, {
          isMobileView: true
        }), isNewDiscussionSidebarViewEnabled ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_SidebarTriggers2.default, {}) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_SidebarTriggers.default, {})]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_userMessages.AlertList, {
      topic: "sequence"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_sequence.default, {
      unitId: unitId,
      sequenceId: sequenceId,
      courseId: courseId,
      unitNavigationHandler: unitNavigationHandler,
      nextSequenceHandler: nextSequenceHandler,
      previousSequenceHandler: previousSequenceHandler
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_celebration.CelebrationModal, {
      courseId: courseId,
      isOpen: firstSectionCelebrationOpen,
      onClose: () => setFirstSectionCelebrationOpen(false)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_celebration.WeeklyGoalCelebrationModal, {
      courseId: courseId,
      daysPerWeek: daysPerWeek,
      isOpen: weeklyGoalCelebrationOpen,
      onClose: () => setWeeklyGoalCelebrationOpen(false)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_contentTools.default, {
      course: course
    })]
  });
};
Course.propTypes = {
  courseId: _propTypes.default.string,
  sequenceId: _propTypes.default.string,
  unitId: _propTypes.default.string,
  nextSequenceHandler: _propTypes.default.func.isRequired,
  previousSequenceHandler: _propTypes.default.func.isRequired,
  unitNavigationHandler: _propTypes.default.func.isRequired,
  windowWidth: _propTypes.default.number.isRequired
};
Course.defaultProps = {
  courseId: null,
  sequenceId: null,
  unitId: null
};
const CourseWrapper = props => {
  // useWindowSize initially returns an undefined width intentionally at first.
  // See https://www.joshwcomeau.com/react/the-perils-of-rehydration/ for why.
  // But <Course> has some tricky window-size-dependent, session-storage-setting logic and React would yell at us if
  // we exited that component early, before hitting all the useState() calls.
  // So just skip all that until we have a window size available.
  const windowWidth = (0, _paragon.useWindowSize)().width;
  if (windowWidth === undefined) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Course, _objectSpread(_objectSpread({}, props), {}, {
    windowWidth: windowWidth
  }));
};
var _default = exports.default = CourseWrapper;
//# sourceMappingURL=Course.js.map