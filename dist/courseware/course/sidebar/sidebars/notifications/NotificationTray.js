"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _i18n = require("@edx/frontend-platform/i18n");
var _classnames = _interopRequireDefault(require("classnames"));
var _react = require("react");
var _analytics = require("@edx/frontend-platform/analytics");
var _auth = require("@edx/frontend-platform/auth");
var _modelStore = require("@src/generic/model-store");
var _NotificationTraySlot = require("../../../../../plugin-slots/NotificationTraySlot");
var _messages = _interopRequireDefault(require("../../../messages"));
var _SidebarBase = _interopRequireDefault(require("../../common/SidebarBase"));
var _SidebarContext = _interopRequireDefault(require("../../SidebarContext"));
var _NotificationTrigger = _interopRequireWildcard(require("./NotificationTrigger"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const NotificationTray = () => {
  const intl = (0, _i18n.useIntl)();
  const {
    courseId,
    onNotificationSeen,
    shouldDisplayFullScreen,
    upgradeNotificationCurrentState,
    setUpgradeNotificationCurrentState
  } = (0, _react.useContext)(_SidebarContext.default);
  const course = (0, _modelStore.useModel)('coursewareMeta', courseId);
  const {
    end,
    enrollmentEnd,
    enrollmentMode,
    enrollmentStart,
    start,
    verificationStatus
  } = course;
  const {
    courseModes,
    org,
    verifiedMode,
    username,
    isStaff
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const {
    administrator
  } = (0, _auth.getAuthenticatedUser)();
  const activeCourseModes = (0, _react.useMemo)(() => courseModes?.map(mode => mode.slug), [courseModes]);
  const notificationTrayEventProperties = {
    course_end: end,
    course_modes: activeCourseModes,
    course_start: start,
    courserun_key: courseId,
    enrollment_end: enrollmentEnd,
    enrollment_mode: enrollmentMode,
    enrollment_start: enrollmentStart,
    is_upgrade_notification_visible: !!verifiedMode,
    name: 'Old Sidebar Notification Tray',
    org_key: org,
    username,
    verification_status: verificationStatus,
    is_staff: isStaff,
    is_admin: administrator
  };
  // After three seconds, update notificationSeen (to hide red dot)
  (0, _react.useEffect)(() => {
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    setTimeout(onNotificationSeen, 3000);
    (0, _analytics.sendTrackEvent)('edx.ui.course.upgrade.old_sidebar.notifications', notificationTrayEventProperties);
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_SidebarBase.default, {
    title: intl.formatMessage(_messages.default.notificationTitle),
    ariaLabel: intl.formatMessage(_messages.default.notificationTray),
    sidebarId: _NotificationTrigger.ID,
    width: "45rem",
    className: (0, _classnames.default)({
      'h-100': !verifiedMode && !shouldDisplayFullScreen,
      'ml-4': !shouldDisplayFullScreen
    }),
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      children: verifiedMode ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_NotificationTraySlot.NotificationTraySlot, {
        courseId: courseId,
        notificationCurrentState: upgradeNotificationCurrentState,
        setNotificationCurrentState: setUpgradeNotificationCurrentState
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        className: "p-3 small",
        children: intl.formatMessage(_messages.default.noNotificationsMessage)
      })
    })
  });
};
NotificationTray.Trigger = _NotificationTrigger.default;
NotificationTray.ID = _NotificationTrigger.ID;
var _default = exports.default = NotificationTray;
//# sourceMappingURL=NotificationTray.js.map