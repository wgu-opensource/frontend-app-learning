"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ID = void 0;
var _react = require("react");
var _i18n = require("@edx/frontend-platform/i18n");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("@src/constants");
var _localStorage = require("@src/data/localStorage");
var _messages = _interopRequireDefault(require("../../../messages"));
var _TriggerBase = _interopRequireDefault(require("../../common/TriggerBase"));
var _SidebarContext = _interopRequireDefault(require("../../SidebarContext"));
var _NotificationIcon = _interopRequireDefault(require("./NotificationIcon"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ID = exports.ID = _constants.WIDGETS.NOTIFICATIONS;
const NotificationTrigger = _ref => {
  let {
    intl,
    onClick
  } = _ref;
  const {
    courseId,
    notificationStatus,
    setNotificationStatus,
    upgradeNotificationCurrentState
  } = (0, _react.useContext)(_SidebarContext.default);

  /* Re-show a red dot beside the notification trigger for each of the 7 UpgradeNotification stages
   The upgradeNotificationCurrentState prop will be available after UpgradeNotification mounts. Once available,
  compare with the last state they've seen, and if it's different then set dot back to red */
  function UpdateUpgradeNotificationLastSeen() {
    if (upgradeNotificationCurrentState) {
      if ((0, _localStorage.getLocalStorage)(`upgradeNotificationLastSeen.${courseId}`) !== upgradeNotificationCurrentState) {
        setNotificationStatus('active');
        (0, _localStorage.setLocalStorage)(`notificationStatus.${courseId}`, 'active');
        (0, _localStorage.setLocalStorage)(`upgradeNotificationLastSeen.${courseId}`, upgradeNotificationCurrentState);
      }
    }
  }
  if (!(0, _localStorage.getLocalStorage)(`notificationStatus.${courseId}`)) {
    (0, _localStorage.setLocalStorage)(`notificationStatus.${courseId}`, 'active'); // Show red dot on notificationTrigger until seen
  }
  if (!(0, _localStorage.getLocalStorage)(`upgradeNotificationCurrentState.${courseId}`)) {
    (0, _localStorage.setLocalStorage)(`upgradeNotificationCurrentState.${courseId}`, 'initialize');
  }
  (0, _react.useEffect)(() => {
    UpdateUpgradeNotificationLastSeen();
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_TriggerBase.default, {
    onClick: onClick,
    ariaLabel: intl.formatMessage(_messages.default.openNotificationTrigger),
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_NotificationIcon.default, {
      status: notificationStatus,
      notificationColor: "bg-danger-500"
    })
  });
};
NotificationTrigger.propTypes = {
  intl: _i18n.intlShape.isRequired,
  onClick: _propTypes.default.func.isRequired
};
var _default = exports.default = (0, _i18n.injectIntl)(NotificationTrigger);
//# sourceMappingURL=NotificationTrigger.js.map