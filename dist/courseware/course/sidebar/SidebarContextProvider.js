"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SidebarProvider;

var _paragon = require("@edx/paragon");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _localStorage = require("../../../data/localStorage");

var _sessionStorage = require("../../../data/sessionStorage");

var _modelStore = require("../../../generic/model-store");

var _SidebarContext = _interopRequireDefault(require("./SidebarContext"));

var _sidebars = require("./sidebars");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SidebarProvider(_ref) {
  let {
    courseId,
    unitId,
    children
  } = _ref;
  const {
    verifiedMode
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);

  const shouldDisplayFullScreen = (0, _paragon.useWindowSize)().width < _paragon.breakpoints.large.minWidth;

  const shouldDisplaySidebarOpen = (0, _paragon.useWindowSize)().width > _paragon.breakpoints.medium.minWidth;

  const showNotificationsOnLoad = (0, _sessionStorage.getSessionStorage)(`notificationTrayStatus.${courseId}`) !== 'closed';
  const initialSidebar = verifiedMode && shouldDisplaySidebarOpen && showNotificationsOnLoad ? _sidebars.SIDEBARS.NOTIFICATIONS.ID : null;
  const [currentSidebar, setCurrentSidebar] = (0, _react.useState)(initialSidebar);
  const [notificationStatus, setNotificationStatus] = (0, _react.useState)((0, _localStorage.getLocalStorage)(`notificationStatus.${courseId}`));
  const [upgradeNotificationCurrentState, setUpgradeNotificationCurrentState] = (0, _react.useState)((0, _localStorage.getLocalStorage)(`upgradeNotificationCurrentState.${courseId}`));
  (0, _react.useEffect)(() => {
    // As a one-off set initial sidebar if the verified mode data has just loaded
    if (verifiedMode && currentSidebar === null && initialSidebar) {
      setCurrentSidebar(initialSidebar);
    }
  }, [initialSidebar, verifiedMode]);

  const onNotificationSeen = () => {
    setNotificationStatus('inactive');
    (0, _localStorage.setLocalStorage)(`notificationStatus.${courseId}`, 'inactive');
  };

  const toggleSidebar = sidebarId => {
    // Switch to new sidebar or hide the current sidebar
    setCurrentSidebar(sidebarId === currentSidebar ? null : sidebarId);
  };

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_SidebarContext.default.Provider, {
    value: {
      toggleSidebar,
      onNotificationSeen,
      setNotificationStatus,
      currentSidebar,
      notificationStatus,
      upgradeNotificationCurrentState,
      setUpgradeNotificationCurrentState,
      shouldDisplaySidebarOpen,
      shouldDisplayFullScreen,
      courseId,
      unitId
    },
    children: children
  });
}

SidebarProvider.propTypes = {
  courseId: _propTypes.default.string.isRequired,
  unitId: _propTypes.default.string.isRequired,
  children: _propTypes.default.node
};
SidebarProvider.defaultProps = {
  children: null
};
//# sourceMappingURL=SidebarContextProvider.js.map