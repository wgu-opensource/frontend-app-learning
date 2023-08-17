"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _i18n = require("@edx/frontend-platform/i18n");

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireWildcard(require("react"));

var _modelStore = require("../../../../../generic/model-store");

var _UpgradeNotification = _interopRequireDefault(require("../../../../../generic/upgrade-notification/UpgradeNotification"));

var _messages = _interopRequireDefault(require("../../../messages"));

var _SidebarBase = _interopRequireDefault(require("../../common/SidebarBase"));

var _SidebarContext = _interopRequireDefault(require("../../SidebarContext"));

var _NotificationTrigger = _interopRequireWildcard(require("./NotificationTrigger"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function NotificationTray(_ref) {
  let {
    intl
  } = _ref;
  const {
    courseId,
    onNotificationSeen,
    shouldDisplayFullScreen,
    upgradeNotificationCurrentState,
    setUpgradeNotificationCurrentState
  } = (0, _react.useContext)(_SidebarContext.default);
  const course = (0, _modelStore.useModel)('coursewareMeta', courseId);
  const {
    accessExpiration,
    contentTypeGatingEnabled,
    marketingUrl,
    offer,
    timeOffsetMillis,
    userTimezone
  } = course;
  const {
    org,
    verifiedMode
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId); // After three seconds, update notificationSeen (to hide red dot)

  (0, _react.useEffect)(() => {
    setTimeout(onNotificationSeen, 3000);
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_SidebarBase.default, {
    title: intl.formatMessage(_messages.default.notificationTitle),
    ariaLabel: intl.formatMessage(_messages.default.notificationTray),
    sidebarId: _NotificationTrigger.ID,
    className: (0, _classnames.default)({
      'h-100': !verifiedMode && !shouldDisplayFullScreen
    }),
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      children: verifiedMode ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_UpgradeNotification.default, {
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
        setupgradeNotificationCurrentState: setUpgradeNotificationCurrentState
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        className: "p-3 small",
        children: intl.formatMessage(_messages.default.noNotificationsMessage)
      })
    })
  });
}

NotificationTray.propTypes = {
  intl: _i18n.intlShape.isRequired
};
NotificationTray.Trigger = _NotificationTrigger.default;
NotificationTray.ID = _NotificationTrigger.ID;

var _default = (0, _i18n.injectIntl)(NotificationTray);

exports.default = _default;
//# sourceMappingURL=NotificationTray.js.map