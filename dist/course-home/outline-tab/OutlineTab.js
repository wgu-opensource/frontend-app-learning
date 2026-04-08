"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _reactRouterDom = require("react-router-dom");
var _reactRedux = require("react-redux");
var _analytics = require("@edx/frontend-platform/analytics");
var _auth = require("@edx/frontend-platform/auth");
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@openedx/paragon");
var _CourseOutlineTabNotificationsSlot = require("../../plugin-slots/CourseOutlineTabNotificationsSlot");
var _userMessages = require("../../generic/user-messages");
var _CourseDates = _interopRequireDefault(require("./widgets/CourseDates"));
var _CourseHandouts = _interopRequireDefault(require("./widgets/CourseHandouts"));
var _StartOrResumeCourseCard = _interopRequireDefault(require("./widgets/StartOrResumeCourseCard"));
var _WeeklyLearningGoalCard = _interopRequireDefault(require("./widgets/WeeklyLearningGoalCard"));
var _CourseTools = _interopRequireDefault(require("./widgets/CourseTools"));
var _data = require("../data");
var _messages = _interopRequireDefault(require("./messages"));
var _ShiftDatesAlert = _interopRequireDefault(require("../suggested-schedule-messaging/ShiftDatesAlert"));
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
var _CourseHomeSectionOutlineSlot = _interopRequireDefault(require("../../plugin-slots/CourseHomeSectionOutlineSlot"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const OutlineTab = () => {
  const intl = (0, _i18n.useIntl)();
  const {
    courseId,
    proctoringPanelStatus
  } = (0, _reactRedux.useSelector)(state => state.courseHome);
  const {
    isSelfPaced,
    org,
    title
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const expandButtonRef = (0, _react.useRef)();
  const {
    courseBlocks: {
      courses,
      sections
    },
    courseGoals: {
      selectedGoal,
      weeklyLearningGoalEnabled
    } = {},
    datesWidget: {
      courseDateBlocks
    },
    enableProctoredExams
  } = (0, _modelStore.useModel)('outline', courseId);
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
          courseId: courseId,
          nextElementRef: expandButtonRef
        }), rootCourseId && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            id: "expand-button-row",
            className: "row w-100 m-0 mb-3 justify-content-end",
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              className: "col-12 col-md-auto p-0",
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
                ref: expandButtonRef,
                variant: "outline-primary",
                block: true,
                onClick: () => {
                  setExpandAll(!expandAll);
                },
                children: expandAll ? intl.formatMessage(_messages.default.collapseAll) : intl.formatMessage(_messages.default.expandAll)
              })
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CourseHomeSectionOutlineSlot.default, {
            expandAll: expandAll,
            sectionIds: courses[rootCourseId].sectionIds,
            sections: sections
          })]
        })]
      }), rootCourseId && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "col col-12 col-md-4",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ProctoringInfoPanel.default, {}), (!enableProctoredExams || proctoringPanelStatus === 'loaded') && weeklyLearningGoalEnabled && /*#__PURE__*/(0, _jsxRuntime.jsx)(_WeeklyLearningGoalCard.default, {
          daysPerWeek: selectedGoal && 'daysPerWeek' in selectedGoal ? selectedGoal.daysPerWeek : null,
          subscribedToReminders: selectedGoal && 'subscribedToReminders' in selectedGoal ? selectedGoal.subscribedToReminders : false
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CourseTools.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CourseOutlineTabNotificationsSlot.CourseOutlineTabNotificationsSlot, {
          courseId: courseId
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CourseDates.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CourseHandouts.default, {})]
      })]
    })]
  });
};
var _default = exports.default = OutlineTab;
//# sourceMappingURL=OutlineTab.js.map