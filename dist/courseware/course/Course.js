"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactHelmet = require("react-helmet");

var _reactRedux = require("react-redux");

var _frontendPlatform = require("@edx/frontend-platform");

var _paragon = require("@edx/paragon");

var _userMessages = require("../../generic/user-messages");

var _sequence = _interopRequireDefault(require("./sequence"));

var _celebration = require("./celebration");

var _contentTools = _interopRequireDefault(require("./content-tools"));

var _CourseBreadcrumbs = _interopRequireDefault(require("./CourseBreadcrumbs"));

var _SidebarContextProvider = _interopRequireDefault(require("./sidebar/SidebarContextProvider"));

var _SidebarTriggers = _interopRequireDefault(require("./sidebar/SidebarTriggers"));

var _modelStore = require("../../generic/model-store");

var _sessionStorage = require("../../data/sessionStorage");

var _mmP2p = require("../../experiments/mm-p2p");

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function Course(_ref) {
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
    isStaff
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const sequence = (0, _modelStore.useModel)('sequences', sequenceId);
  const section = (0, _modelStore.useModel)('sections', sequence ? sequence.sectionId : null);
  const pageTitleBreadCrumbs = [sequence, section, course].filter(element => element != null).map(element => element.title); // Below the tabs, above the breadcrumbs alerts (appearing in the order listed here)

  const dispatch = (0, _reactRedux.useDispatch)();
  const [firstSectionCelebrationOpen, setFirstSectionCelebrationOpen] = (0, _react.useState)(false); // If streakLengthToCelebrate is populated, that modal takes precedence. Wait til the next load to display
  // the weekly goal celebration modal.

  const [weeklyGoalCelebrationOpen, setWeeklyGoalCelebrationOpen] = (0, _react.useState)(celebrations && !celebrations.streakLengthToCelebrate && celebrations.weeklyGoal);
  const shouldDisplayTriggers = windowWidth >= _paragon.breakpoints.small.minWidth;
  const daysPerWeek = course?.courseGoals?.selectedGoal?.daysPerWeek; // Responsive breakpoints for showing the notification button/tray

  const shouldDisplayNotificationTrayOpenOnLoad = windowWidth > _paragon.breakpoints.medium.minWidth; // Course specific notification tray open/closed persistance by browser session

  if (!(0, _sessionStorage.getSessionStorage)(`notificationTrayStatus.${courseId}`)) {
    if (shouldDisplayNotificationTrayOpenOnLoad) {
      (0, _sessionStorage.setSessionStorage)(`notificationTrayStatus.${courseId}`, 'open');
    } else {
      // responsive version displays the tray closed on initial load, set the sessionStorage to closed
      (0, _sessionStorage.setSessionStorage)(`notificationTrayStatus.${courseId}`, 'closed');
    }
  }
  /** [MM-P2P] Experiment */


  const MMP2P = (0, _mmP2p.initCoursewareMMP2P)(courseId, sequenceId, unitId);
  (0, _react.useEffect)(() => {
    const celebrateFirstSection = celebrations && celebrations.firstSection;
    setFirstSectionCelebrationOpen((0, _celebration.shouldCelebrateOnSectionLoad)(courseId, sequenceId, celebrateFirstSection, dispatch, celebrations));
  }, [sequenceId]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_SidebarContextProvider.default, {
    courseId: courseId,
    unitId: unitId,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactHelmet.Helmet, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("title", {
        children: `${pageTitleBreadCrumbs.join(' | ')} | ${(0, _frontendPlatform.getConfig)().SITE_NAME}`
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "position-relative d-flex align-items-start",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CourseBreadcrumbs.default, {
        courseId: courseId,
        sectionId: section ? section.id : null,
        sequenceId: sequenceId,
        isStaff: isStaff,
        unitId: unitId //* * [MM-P2P] Experiment */
        ,
        mmp2p: MMP2P
      }), shouldDisplayTriggers && /*#__PURE__*/(0, _jsxRuntime.jsx)(_SidebarTriggers.default, {})]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_userMessages.AlertList, {
      topic: "sequence"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_sequence.default, {
      unitId: unitId,
      sequenceId: sequenceId,
      courseId: courseId,
      unitNavigationHandler: unitNavigationHandler,
      nextSequenceHandler: nextSequenceHandler,
      previousSequenceHandler: previousSequenceHandler //* * [MM-P2P] Experiment */
      ,
      mmp2p: MMP2P
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
    }), MMP2P.meta.modalLock && /*#__PURE__*/(0, _jsxRuntime.jsx)(_mmP2p.MMP2PBlockModal, {
      options: MMP2P
    })]
  });
}

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

function CourseWrapper(props) {
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
}

var _default = CourseWrapper;
exports.default = _default;
//# sourceMappingURL=Course.js.map