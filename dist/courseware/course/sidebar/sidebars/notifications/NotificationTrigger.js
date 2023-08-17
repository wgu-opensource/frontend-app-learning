"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ID = void 0;

var _i18n = require("@edx/frontend-platform/i18n");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _localStorage = require("../../../../../data/localStorage");

var _sessionStorage = require("../../../../../data/sessionStorage");

var _messages = _interopRequireDefault(require("../../../messages"));

var _TriggerBase = _interopRequireDefault(require("../../common/TriggerBase"));

var _SidebarContext = _interopRequireDefault(require("../../SidebarContext"));

var _NotificationIcon = _interopRequireDefault(require("./NotificationIcon"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ID = 'NOTIFICATIONS';
exports.ID = ID;

function NotificationTrigger(_ref) {
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

  const handleClick = () => {
    if ((0, _sessionStorage.getSessionStorage)(`notificationTrayStatus.${courseId}`) === 'open') {
      (0, _sessionStorage.setSessionStorage)(`notificationTrayStatus.${courseId}`, 'closed');
    } else {
      (0, _sessionStorage.setSessionStorage)(`notificationTrayStatus.${courseId}`, 'open');
    }

    onClick();
  };

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_TriggerBase.default, {
    onClick: handleClick,
    ariaLabel: intl.formatMessage(_messages.default.openNotificationTrigger),
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_NotificationIcon.default, {
      status: notificationStatus,
      notificationColor: "bg-danger-500"
    })
  });
}

NotificationTrigger.propTypes = {
  intl: _i18n.intlShape.isRequired,
  onClick: _propTypes.default.func.isRequired
};

var _default = (0, _i18n.injectIntl)(NotificationTrigger);

exports.default = _default;
//# sourceMappingURL=NotificationTrigger.js.map