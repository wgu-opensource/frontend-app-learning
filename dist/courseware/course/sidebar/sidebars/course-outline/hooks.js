"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCourseOutlineSidebar = void 0;
var _react = require("react");
var _reactRedux = require("react-redux");
var _reactRouterDom = require("react-router-dom");
var _analytics = require("@edx/frontend-platform/analytics");
var _paragon = require("@openedx/paragon");
var _modelStore = require("@src/generic/model-store");
var _constants = require("@src/constants");
var _thunks = require("@src/courseware/data/thunks");
var _SidebarContext = _interopRequireDefault(require("@src/courseware/course/sidebar/SidebarContext"));
var _SidebarContext2 = _interopRequireDefault(require("@src/courseware/course/new-sidebar/SidebarContext"));
var _selectors = require("@src/courseware/data/selectors");
var _constants2 = require("./constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// eslint-disable-next-line import/prefer-default-export
const useCourseOutlineSidebar = () => {
  const dispatch = (0, _reactRedux.useDispatch)();
  const isCollapsedOutlineSidebar = window.sessionStorage.getItem('hideCourseOutlineSidebar');
  const {
    enableCompletionTracking: isEnabledCompletionTracking
  } = (0, _reactRedux.useSelector)(_selectors.getCoursewareOutlineSidebarSettings);
  const courseOutlineShouldUpdate = (0, _reactRedux.useSelector)(_selectors.getCourseOutlineShouldUpdate);
  const courseOutlineStatus = (0, _reactRedux.useSelector)(_selectors.getCourseOutlineStatus);
  const sequenceStatus = (0, _reactRedux.useSelector)(_selectors.getSequenceStatus);
  const activeSequenceId = (0, _reactRedux.useSelector)(_selectors.getSequenceId);
  const {
    sections = {},
    sequences = {},
    units = {}
  } = (0, _reactRedux.useSelector)(_selectors.getCourseOutline);
  const {
    courseId
  } = (0, _reactRouterDom.useParams)();
  const course = (0, _modelStore.useModel)('coursewareMeta', courseId);
  const {
    isNewDiscussionSidebarViewEnabled
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const SidebarContext = isNewDiscussionSidebarViewEnabled ? _SidebarContext2.default : _SidebarContext.default;
  const {
    unitId,
    initialSidebar,
    currentSidebar,
    toggleSidebar,
    shouldDisplayFullScreen
  } = (0, _react.useContext)(SidebarContext);
  const isOpenSidebar = !initialSidebar && !isCollapsedOutlineSidebar;
  const [isOpen, setIsOpen] = (0, _react.useState)(true);
  const {
    entranceExamEnabled,
    entranceExamPassed
  } = course.entranceExamData || {};
  const isActiveEntranceExam = entranceExamEnabled && !entranceExamPassed;
  const collapseSidebar = () => {
    toggleSidebar(null);
    window.sessionStorage.setItem('hideCourseOutlineSidebar', 'true');
  };
  const handleToggleCollapse = () => {
    if (currentSidebar === _constants2.ID) {
      collapseSidebar();
    } else {
      toggleSidebar(_constants2.ID);
      window.sessionStorage.removeItem('hideCourseOutlineSidebar');
      window.sessionStorage.setItem(`notificationTrayStatus.${courseId}`, 'closed');
    }
  };
  const handleUnitClick = ({
    sequenceId,
    activeUnitId,
    id
  }) => {
    const logEvent = (eventName, widgetPlacement) => {
      const findSequenceByUnitId = () => Object.values(sequences).find(seq => seq.unitIds.includes(activeUnitId));
      const activeSequence = findSequenceByUnitId(activeUnitId);
      const targetSequence = findSequenceByUnitId(id);
      const payload = {
        id: activeUnitId,
        current_tab: activeSequence.unitIds.indexOf(activeUnitId) + 1,
        tab_count: activeSequence.unitIds.length,
        target_id: id,
        target_tab: targetSequence.unitIds.indexOf(id) + 1,
        widget_placement: widgetPlacement
      };
      if (activeSequence.id !== targetSequence.id) {
        payload.target_tab_count = targetSequence.unitIds.length;
      }
      (0, _analytics.sendTrackEvent)(eventName, payload);
      (0, _analytics.sendTrackingLogEvent)(eventName, payload);
    };
    logEvent('edx.ui.lms.sequence.tab_selected', 'left');
    dispatch((0, _thunks.checkBlockCompletion)(courseId, sequenceId, activeUnitId));

    // Hide the sidebar after selecting a unit on a mobile device.
    if (shouldDisplayFullScreen) {
      handleToggleCollapse();
    }
  };
  (0, _react.useEffect)(() => {
    if (isOpenSidebar && currentSidebar !== _constants2.ID) {
      toggleSidebar(_constants2.ID);
    }
  }, [initialSidebar, unitId]);
  (0, _react.useEffect)(() => {
    if (courseOutlineStatus !== _constants.LOADED || courseOutlineShouldUpdate) {
      dispatch((0, _thunks.getCourseOutlineStructure)(courseId));
    }
  }, [courseId, courseOutlineShouldUpdate]);

  // Collapse sidebar if screen resized to a width that displays the sidebar automatically
  (0, _react.useLayoutEffect)(() => {
    const handleResize = () => {
      // breakpoints.large.maxWidth is 1200px and currently the breakpoint for showing the sidebar
      if (currentSidebar === _constants2.ID && global.innerWidth < _paragon.breakpoints.large.maxWidth) {
        collapseSidebar();
      }
    };
    global.addEventListener('resize', handleResize);
    return () => {
      global.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);
  return {
    courseId,
    unitId,
    currentSidebar,
    shouldDisplayFullScreen,
    isEnabledCompletionTracking,
    isOpen,
    setIsOpen,
    handleToggleCollapse,
    isActiveEntranceExam,
    courseOutlineStatus,
    activeSequenceId,
    sections,
    sequences,
    units,
    handleUnitClick,
    sequenceStatus
  };
};
exports.useCourseOutlineSidebar = useCourseOutlineSidebar;
//# sourceMappingURL=hooks.js.map