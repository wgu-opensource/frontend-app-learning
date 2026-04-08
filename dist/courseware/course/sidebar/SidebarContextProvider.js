"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _paragon = require("@openedx/paragon");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = require("react");
var _modelStore = require("@src/generic/model-store");
var _localStorage = require("@src/data/localStorage");
var discussionsSidebar = _interopRequireWildcard(require("./sidebars/discussions"));
var notificationsSidebar = _interopRequireWildcard(require("./sidebars/notifications"));
var _SidebarContext = _interopRequireDefault(require("./SidebarContext"));
var _sidebars = require("./sidebars");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const SidebarProvider = ({
  courseId,
  unitId,
  children
}) => {
  const {
    verifiedMode
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const topic = (0, _modelStore.useModel)('discussionTopics', unitId);
  const isUnitHasDiscussionTopics = topic?.id && topic?.enabledInContext;
  const shouldDisplayFullScreen = (0, _paragon.useWindowSize)().width < _paragon.breakpoints.extraLarge.minWidth;
  const shouldDisplaySidebarOpen = (0, _paragon.useWindowSize)().width > _paragon.breakpoints.extraLarge.minWidth;
  const query = new URLSearchParams(window.location.search);
  const isInitiallySidebarOpen = shouldDisplaySidebarOpen || query.get('sidebar') === 'true';
  let initialSidebar = shouldDisplayFullScreen ? (0, _localStorage.getLocalStorage)(`sidebar.${courseId}`) : null;
  if (!shouldDisplayFullScreen && isInitiallySidebarOpen) {
    initialSidebar = isUnitHasDiscussionTopics ? _sidebars.SIDEBARS[discussionsSidebar.ID].ID : verifiedMode && _sidebars.SIDEBARS[notificationsSidebar.ID].ID;
  }
  const [currentSidebar, setCurrentSidebar] = (0, _react.useState)(initialSidebar);
  const [notificationStatus, setNotificationStatus] = (0, _react.useState)((0, _localStorage.getLocalStorage)(`notificationStatus.${courseId}`));
  const [upgradeNotificationCurrentState, setUpgradeNotificationCurrentState] = (0, _react.useState)((0, _localStorage.getLocalStorage)(`upgradeNotificationCurrentState.${courseId}`));
  (0, _react.useEffect)(() => {
    if (initialSidebar && currentSidebar !== initialSidebar) {
      setCurrentSidebar(initialSidebar);
    }
  }, [unitId, topic]);
  (0, _react.useEffect)(() => {
    if (initialSidebar) {
      setCurrentSidebar(initialSidebar);
    }
  }, [shouldDisplaySidebarOpen]);
  const onNotificationSeen = (0, _react.useCallback)(() => {
    setNotificationStatus('inactive');
    (0, _localStorage.setLocalStorage)(`notificationStatus.${courseId}`, 'inactive');
  }, [courseId]);
  const toggleSidebar = (0, _react.useCallback)(sidebarId => {
    // Switch to new sidebar or hide the current sidebar
    const newSidebar = sidebarId === currentSidebar ? null : sidebarId;
    setCurrentSidebar(newSidebar);
    (0, _localStorage.setLocalStorage)(`sidebar.${courseId}`, newSidebar);
  }, [currentSidebar]);
  const contextValue = (0, _react.useMemo)(() => ({
    initialSidebar,
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
  }), [courseId, currentSidebar, notificationStatus, onNotificationSeen, shouldDisplayFullScreen, shouldDisplaySidebarOpen, toggleSidebar, unitId, upgradeNotificationCurrentState]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_SidebarContext.default.Provider, {
    value: contextValue,
    children: children
  });
};
SidebarProvider.propTypes = {
  courseId: _propTypes.default.string.isRequired,
  unitId: _propTypes.default.string.isRequired,
  children: _propTypes.default.node
};
SidebarProvider.defaultProps = {
  children: null
};
var _default = exports.default = SidebarProvider;
//# sourceMappingURL=SidebarContextProvider.js.map