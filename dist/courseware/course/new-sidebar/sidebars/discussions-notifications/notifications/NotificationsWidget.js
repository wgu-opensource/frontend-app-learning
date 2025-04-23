"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _analytics = require("@edx/frontend-platform/analytics");
var _modelStore = require("../../../../../../generic/model-store");
var _UpgradeNotification = _interopRequireDefault(require("../../../../../../generic/upgrade-notification/UpgradeNotification"));
var _constants = require("../../../../../../constants");
var _SidebarContext = _interopRequireDefault(require("../../../SidebarContext"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const NotificationsWidget = () => {
  const {
    courseId,
    onNotificationSeen,
    upgradeNotificationCurrentState,
    setUpgradeNotificationCurrentState,
    hideNotificationbar,
    toggleSidebar,
    isNotificationbarAvailable,
    currentSidebar
  } = (0, _react.useContext)(_SidebarContext.default);
  const course = (0, _modelStore.useModel)('coursewareMeta', courseId);
  const {
    accessExpiration,
    contentTypeGatingEnabled,
    end,
    enrollmentEnd,
    enrollmentMode,
    enrollmentStart,
    marketingUrl,
    offer,
    start,
    timeOffsetMillis,
    userTimezone,
    verificationStatus
  } = course;
  const {
    courseModes,
    org,
    verifiedMode,
    username
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
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
    name: 'New Sidebar Notification Tray',
    org_key: org,
    username,
    verification_status: verificationStatus
  };

  // After three seconds, update notificationSeen (to hide red dot)
  (0, _react.useEffect)(() => {
    setTimeout(onNotificationSeen, 3000);
    (0, _analytics.sendTrackEvent)('edx.ui.course.upgrade.new_sidebar.notifications', notificationTrayEventProperties);
  }, []);
  if (hideNotificationbar || !isNotificationbarAvailable) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: "border border-light-400 rounded-sm",
    "data-testid": "notification-widget",
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_UpgradeNotification.default, {
      offer: offer,
      verifiedMode: verifiedMode,
      accessExpiration: accessExpiration,
      contentTypeGatingEnabled: contentTypeGatingEnabled,
      marketingUrl: marketingUrl,
      upsellPageName: "in_course",
      userTimezone: userTimezone,
      shouldDisplayBorder: false,
      timeOffsetMillis: timeOffsetMillis,
      courseId: courseId,
      org: org,
      upgradeNotificationCurrentState: upgradeNotificationCurrentState,
      setupgradeNotificationCurrentState: setUpgradeNotificationCurrentState,
      toggleSidebar: () => toggleSidebar(currentSidebar, _constants.WIDGETS.NOTIFICATIONS)
    })
  });
};
var _default = exports.default = NotificationsWidget;
//# sourceMappingURL=NotificationsWidget.js.map