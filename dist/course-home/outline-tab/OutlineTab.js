"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _reactRedux = require("react-redux");
var _analytics = require("@edx/frontend-platform/analytics");
var _auth = require("@edx/frontend-platform/auth");
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@edx/paragon");
var _userMessages = require("../../generic/user-messages");
var _CourseDates = _interopRequireDefault(require("./widgets/CourseDates"));
var _CourseHandouts = _interopRequireDefault(require("./widgets/CourseHandouts"));
var _StartOrResumeCourseCard = _interopRequireDefault(require("./widgets/StartOrResumeCourseCard"));
var _WeeklyLearningGoalCard = _interopRequireDefault(require("./widgets/WeeklyLearningGoalCard"));
var _CourseTools = _interopRequireDefault(require("./widgets/CourseTools"));
var _data = require("../data");
var _messages = _interopRequireDefault(require("./messages"));
var _Section = _interopRequireDefault(require("./Section"));
var _ShiftDatesAlert = _interopRequireDefault(require("../suggested-schedule-messaging/ShiftDatesAlert"));
var _UpgradeNotification = _interopRequireDefault(require("../../generic/upgrade-notification/UpgradeNotification"));
var _UpgradeToShiftDatesAlert = _interopRequireDefault(require("../suggested-schedule-messaging/UpgradeToShiftDatesAlert"));
var _certificateStatusAlert = _interopRequireDefault(require("./alerts/certificate-status-alert"));
var _courseEndAlert = _interopRequireDefault(require("./alerts/course-end-alert"));
var _courseStartAlert = _interopRequireDefault(require("../../alerts/course-start-alert"));
var _privateCourseAlert = _interopRequireDefault(require("./alerts/private-course-alert"));
var _scheduledContentAlert = _interopRequireDefault(require("./alerts/scheduled-content-alert"));
var _modelStore = require("../../generic/model-store");
var _WelcomeMessage = _interopRequireDefault(require("./widgets/WelcomeMessage"));
var _ProctoringInfoPanel = _interopRequireDefault(require("./widgets/ProctoringInfoPanel"));
var _AccountActivationAlert = _interopRequireDefault(require("../../alerts/logistration-alert/AccountActivationAlert"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const OutlineTab = _ref => {
  let {
    intl
  } = _ref;
  const {
    courseId,
    proctoringPanelStatus
  } = (0, _reactRedux.useSelector)(state => state.courseHome);
  const {
    isSelfPaced,
    org,
    title,
    userTimezone
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const {
    accessExpiration,
    courseBlocks: {
      courses,
      sections
    },
    courseGoals: {
      selectedGoal,
      weeklyLearningGoalEnabled
    } = {},
    datesBannerInfo,
    datesWidget: {
      courseDateBlocks
    },
    enableProctoredExams,
    offer,
    timeOffsetMillis,
    verifiedMode
  } = (0, _modelStore.useModel)('outline', courseId);
  const {
    marketingUrl
  } = (0, _modelStore.useModel)('coursewareMeta', courseId);
  const [expandAll, setExpandAll] = (0, _react.useState)(false);
  const navigate = (0, _reactRouterDom.useNavigate)();
  const eventProperties = {
    org_key: org,
    courserun_key: courseId
  };

  // Below the course title alerts (appearing in the order listed here)
  const courseStartAlert = (0, _courseStartAlert.default)(courseId);
  const courseEndAlert = (0, _courseEndAlert.default)(courseId);
  const certificateAvailableAlert = (0, _certificateStatusAlert.default)(courseId);
  const privateCourseAlert = (0, _privateCourseAlert.default)(courseId);
  const scheduledContentAlert = (0, _scheduledContentAlert.default)(courseId);
  const rootCourseId = courses && Object.keys(courses)[0];
  const hasDeadlines = courseDateBlocks && courseDateBlocks.some(x => x.dateType === 'assignment-due-date');
  const logUpgradeToShiftDatesLinkClick = () => {
    (0, _analytics.sendTrackEvent)('edx.bi.ecommerce.upsell_links_clicked', _objectSpread(_objectSpread({}, eventProperties), {}, {
      linkCategory: 'personalized_learner_schedules',
      linkName: 'course_home_upgrade_shift_dates',
      linkType: 'button',
      pageName: 'course_home'
    }));
  };
  const isEnterpriseUser = () => {
    const authenticatedUser = (0, _auth.getAuthenticatedUser)();
    const userRoleNames = authenticatedUser ? authenticatedUser.roles.map(role => role.split(':')[0]) : [];
    return userRoleNames.includes('enterprise_learner');
  };

  /** show post enrolment survey to only B2C learners */
  const learnerType = isEnterpriseUser() ? 'enterprise_learner' : 'b2c_learner';
  const location = (0, _reactRouterDom.useLocation)();
  (0, _react.useEffect)(() => {
    const currentParams = new URLSearchParams(location.search);
    const startCourse = currentParams.get('start_course');
    if (startCourse === '1') {
      (0, _analytics.sendTrackEvent)('enrollment.email.clicked.startcourse', {});

      // Deleting the course_start query param as it only needs to be set once
      // whenever passed in query params.
      currentParams.delete('start_course');
      navigate({
        pathname: location.pathname,
        search: `?${currentParams.toString()}`,
        replace: true
      });
    }
  }, [location.search]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      "data-learner-type": learnerType,
      className: "row w-100 mx-0 my-3 justify-content-between",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "col-12 col-sm-auto p-0",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          role: "heading",
          "aria-level": "1",
          className: "h2",
          children: title
        })
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "row course-outline-tab",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_AccountActivationAlert.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "col-12",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_userMessages.AlertList, {
          topic: "outline-private-alerts",
          customAlerts: _objectSpread({}, privateCourseAlert)
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "col col-12 col-md-8",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_userMessages.AlertList, {
          topic: "outline-course-alerts",
          className: "mb-3",
          customAlerts: _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, certificateAvailableAlert), courseEndAlert), courseStartAlert), scheduledContentAlert)
        }), isSelfPaced && hasDeadlines && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ShiftDatesAlert.default, {
            model: "outline",
            fetch: _data.fetchOutlineTab
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_UpgradeToShiftDatesAlert.default, {
            model: "outline",
            logUpgradeLinkClick: logUpgradeToShiftDatesLinkClick
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_StartOrResumeCourseCard.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_WelcomeMessage.default, {
          courseId: courseId
        }), rootCourseId && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "row w-100 m-0 mb-3 justify-content-end",
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              className: "col-12 col-md-auto p-0",
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
                variant: "outline-primary",
                block: true,
                onClick: () => {
                  setExpandAll(!expandAll);
                },
                children: expandAll ? intl.formatMessage(_messages.default.collapseAll) : intl.formatMessage(_messages.default.expandAll)
              })
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("ol", {
            id: "courseHome-outline",
            className: "list-unstyled",
            children: courses[rootCourseId].sectionIds.map(sectionId => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Section.default, {
              courseId: courseId,
              defaultOpen: sections[sectionId].resumeBlock,
              expand: expandAll,
              section: sections[sectionId]
            }, sectionId))
          })]
        })]
      }), rootCourseId && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "col col-12 col-md-4",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ProctoringInfoPanel.default, {}), (!enableProctoredExams || proctoringPanelStatus === 'loaded') && weeklyLearningGoalEnabled && /*#__PURE__*/(0, _jsxRuntime.jsx)(_WeeklyLearningGoalCard.default, {
          daysPerWeek: selectedGoal && 'daysPerWeek' in selectedGoal ? selectedGoal.daysPerWeek : null,
          subscribedToReminders: selectedGoal && 'subscribedToReminders' in selectedGoal ? selectedGoal.subscribedToReminders : false
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CourseTools.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_UpgradeNotification.default, {
          offer: offer,
          verifiedMode: verifiedMode,
          accessExpiration: accessExpiration,
          contentTypeGatingEnabled: datesBannerInfo.contentTypeGatingEnabled,
          marketingUrl: marketingUrl,
          upsellPageName: "course_home",
          userTimezone: userTimezone,
          shouldDisplayBorder: true,
          timeOffsetMillis: timeOffsetMillis,
          courseId: courseId,
          org: org
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CourseDates.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CourseHandouts.default, {})]
      })]
    })]
  });
};
OutlineTab.propTypes = {
  intl: _i18n.intlShape.isRequired
};
var _default = (0, _i18n.injectIntl)(OutlineTab);
exports.default = _default;
//# sourceMappingURL=OutlineTab.js.map