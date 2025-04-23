"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _paragon = require("@openedx/paragon");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");
var _react = require("react");
var _modelStore = require("@src/generic/model-store");
var _localStorage = require("@src/data/localStorage");
var _selectors = require("../../data/selectors");
var discussionsSidebar = _interopRequireWildcard(require("./sidebars/discussions"));
var notificationsSidebar = _interopRequireWildcard(require("./sidebars/notifications"));
var _SidebarContext = _interopRequireDefault(require("./SidebarContext"));
var _sidebars = require("./sidebars");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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
  const isUnitHasDiscussionTopics = topic?.id && topic?.enabledInContext;
  const shouldDisplayFullScreen = (0, _paragon.useWindowSize)().width < _paragon.breakpoints.extraLarge.minWidth;
  const shouldDisplaySidebarOpen = (0, _paragon.useWindowSize)().width > _paragon.breakpoints.extraLarge.minWidth;
  const query = new URLSearchParams(window.location.search);
  const {
    alwaysOpenAuxiliarySidebar
  } = (0, _reactRedux.useSelector)(_selectors.getCoursewareOutlineSidebarSettings);
  const isInitiallySidebarOpen = shouldDisplaySidebarOpen || query.get('sidebar') === 'true';
  let initialSidebar = null;
  if (isInitiallySidebarOpen && alwaysOpenAuxiliarySidebar) {
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
    setCurrentSidebar(sidebarId === currentSidebar ? null : sidebarId);
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