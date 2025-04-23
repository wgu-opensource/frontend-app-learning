"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ID = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");
var _frontendPlatform = require("@edx/frontend-platform");
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@openedx/paragon");
var _localStorage = require("../../../../../data/localStorage");
var _sessionStorage = require("../../../../../data/sessionStorage");
var _modelStore = require("../../../../../generic/model-store");
var _thunks = require("../../../../data/thunks");
var _icons = require("../../icons");
var _messages = _interopRequireDefault(require("../../messages"));
var _SidebarContext = _interopRequireDefault(require("../../SidebarContext"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ID = exports.ID = 'DISCUSSIONS_NOTIFICATIONS';
const DiscussionsNotificationsTrigger = _ref => {
  let {
    onClick
  } = _ref;
  const {
    courseId,
    currentSidebar,
    setNotificationStatus,
    upgradeNotificationCurrentState,
    isNotificationbarAvailable,
    isDiscussionbarAvailable
  } = (0, _react.useContext)(_SidebarContext.default);
  const dispatch = (0, _reactRedux.useDispatch)();
  const intl = (0, _i18n.useIntl)();
  const {
    tabs
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const baseUrl = (0, _frontendPlatform.getConfig)().DISCUSSIONS_MFE_BASE_URL;
  const edxProvider = (0, _react.useMemo)(() => tabs?.find(tab => tab.slug === 'discussion'), [tabs]);
  (0, _react.useEffect)(() => {
    if (baseUrl && edxProvider) {
      dispatch((0, _thunks.getCourseDiscussionTopics)(courseId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, baseUrl, edxProvider]);

  /* Re-show a red dot beside the notification trigger for each of the 7 UpgradeNotification stages
   The upgradeNotificationCurrentState prop will be available after UpgradeNotification mounts. Once available,
  compare with the last state they've seen, and if it's different then set dot back to red */
  function updateUpgradeNotificationLastSeen() {
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
    updateUpgradeNotificationLastSeen();
  });
  const handleClick = () => {
    if ((0, _sessionStorage.getSessionStorage)(`notificationTrayStatus.${courseId}`) === 'open') {
      (0, _sessionStorage.setSessionStorage)(`notificationTrayStatus.${courseId}`, 'closed');
    } else {
      (0, _sessionStorage.setSessionStorage)(`notificationTrayStatus.${courseId}`, 'open');
    }
    onClick();
  };
  if (!isDiscussionbarAvailable && !isNotificationbarAvailable) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.IconButton, {
    src: currentSidebar ? _icons.RightSidebarFilled : _icons.RightSidebarOutlined,
    iconAs: _paragon.Icon,
    onClick: handleClick,
    alt: intl.formatMessage(_messages.default.openSidebarTrigger),
    className: "icon-hover"
  });
};
DiscussionsNotificationsTrigger.propTypes = {
  onClick: _propTypes.default.func.isRequired
};
var _default = exports.default = DiscussionsNotificationsTrigger;
//# sourceMappingURL=DiscussionsNotificationsTrigger.js.map