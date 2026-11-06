"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));
var _paragon = require("@openedx/paragon");
var _localStorage = require("../../../data/localStorage");
var _modelStore = require("../../../generic/model-store");
var _constants = require("../../../constants");
var _SidebarContext = _interopRequireDefault(require("./SidebarContext"));
var _sidebars = require("./sidebars");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const SidebarProvider = _ref => {
  let {
    courseId,
    unitId,
    children
  } = _ref;
  const {
    verifiedMode
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const topic = (0, _modelStore.useModel)('discussionTopics', unitId);
  const shouldDisplayFullScreen = (0, _paragon.useWindowSize)().width < _paragon.breakpoints.large.minWidth;
  const shouldDisplaySidebarOpen = (0, _paragon.useWindowSize)().width > _paragon.breakpoints.medium.minWidth;
  const query = new URLSearchParams(window.location.search);
  const isInitiallySidebarOpen = shouldDisplaySidebarOpen || query.get('sidebar') === 'true';
  const sidebarKey = `sidebar.${courseId}`;
  let initialSidebar = shouldDisplayFullScreen && sidebarKey in localStorage ? (0, _localStorage.getLocalStorage)(sidebarKey) : _sidebars.SIDEBARS.DISCUSSIONS_NOTIFICATIONS.ID;
  if (!shouldDisplayFullScreen && isInitiallySidebarOpen) {
    initialSidebar = _sidebars.SIDEBARS.DISCUSSIONS_NOTIFICATIONS.ID;
  }
  const [currentSidebar, setCurrentSidebar] = (0, _react.useState)(initialSidebar);
  const [notificationStatus, setNotificationStatus] = (0, _react.useState)((0, _localStorage.getLocalStorage)(`notificationStatus.${courseId}`));
  const [hideDiscussionbar, setHideDiscussionbar] = (0, _react.useState)(false);
  const [hideNotificationbar, setHideNotificationbar] = (0, _react.useState)(false);
  const [upgradeNotificationCurrentState, setUpgradeNotificationCurrentState] = (0, _react.useState)((0, _localStorage.getLocalStorage)(`upgradeNotificationCurrentState.${courseId}`));
  const isDiscussionbarAvailable = topic?.id && topic?.enabledInContext || false;
  const isNotificationbarAvailable = !(0, _isEmpty.default)(verifiedMode);
  const onNotificationSeen = (0, _react.useCallback)(() => {
    setNotificationStatus('inactive');
    (0, _localStorage.setLocalStorage)(`notificationStatus.${courseId}`, 'inactive');
  }, [courseId]);
  (0, _react.useEffect)(() => {
    setHideDiscussionbar(!isDiscussionbarAvailable);
    setHideNotificationbar(!isNotificationbarAvailable);
    if (initialSidebar && currentSidebar !== initialSidebar) {
      setCurrentSidebar(_sidebars.SIDEBARS.DISCUSSIONS_NOTIFICATIONS.ID);
    }
  }, [unitId, topic]);
  (0, _react.useEffect)(() => {
    if (hideDiscussionbar && hideNotificationbar) {
      setCurrentSidebar(null);
    }
  }, [hideDiscussionbar, hideNotificationbar]);
  (0, _react.useEffect)(() => {
    setCurrentSidebar(initialSidebar);
  }, [shouldDisplaySidebarOpen, initialSidebar]);
  const handleWidgetToggle = (0, _react.useCallback)((widgetId, sidebarId) => {
    setHideDiscussionbar(prevWidgetId => widgetId === _constants.WIDGETS.DISCUSSIONS ? true : prevWidgetId);
    setHideNotificationbar(prevWidgetId => widgetId === _constants.WIDGETS.NOTIFICATIONS ? true : prevWidgetId);
    (0, _localStorage.setLocalStorage)(sidebarKey, sidebarId);
  }, []);
  const handleSidebarToggle = (0, _react.useCallback)(sidebarId => {
    setCurrentSidebar(prevSidebar => sidebarId === prevSidebar ? null : sidebarId);
    setHideDiscussionbar(!isDiscussionbarAvailable);
    setHideNotificationbar(!isNotificationbarAvailable);
    (0, _localStorage.setLocalStorage)(sidebarKey, sidebarId === currentSidebar ? null : sidebarId);
  }, [currentSidebar, isDiscussionbarAvailable, isNotificationbarAvailable]);
  const clearSidebarKeyIfWidgetsUnavailable = (0, _react.useCallback)(widgetId => {
    if ((!isNotificationbarAvailable || hideNotificationbar) && widgetId === _constants.WIDGETS.DISCUSSIONS || (!isDiscussionbarAvailable || hideDiscussionbar) && widgetId === _constants.WIDGETS.NOTIFICATIONS) {
      (0, _localStorage.setLocalStorage)(sidebarKey, null);
    }
  }, [isDiscussionbarAvailable, isNotificationbarAvailable, hideDiscussionbar, hideNotificationbar]);
  const toggleSidebar = (0, _react.useCallback)(function () {
    let sidebarId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    let widgetId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    if (widgetId) {
      handleWidgetToggle(widgetId, sidebarId);
    } else {
      handleSidebarToggle(sidebarId);
    }
    clearSidebarKeyIfWidgetsUnavailable(widgetId);
  }, [handleWidgetToggle, handleSidebarToggle, clearSidebarKeyIfWidgetsUnavailable]);
  const contextValue = (0, _react.useMemo)(() => ({
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
    unitId,
    hideDiscussionbar,
    hideNotificationbar,
    isNotificationbarAvailable,
    isDiscussionbarAvailable
  }), [courseId, currentSidebar, notificationStatus, onNotificationSeen, shouldDisplayFullScreen, shouldDisplaySidebarOpen, toggleSidebar, unitId, upgradeNotificationCurrentState, hideDiscussionbar, hideNotificationbar, isNotificationbarAvailable, isDiscussionbarAvailable]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_SidebarContext.default.Provider, {
    value: contextValue,
    children: children
  });
};
var _default = exports.default = SidebarProvider;
//# sourceMappingURL=SidebarContextProvider.js.map