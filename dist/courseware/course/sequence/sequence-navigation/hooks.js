"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useIsOnLargeDesktop = useIsOnLargeDesktop;
exports.useIsOnMediumDesktop = useIsOnMediumDesktop;
exports.useIsOnXLDesktop = useIsOnXLDesktop;
exports.useIsSidebarOpen = useIsSidebarOpen;
exports.useSequenceNavigationMetadata = useSequenceNavigationMetadata;
var _react = require("react");
var _reactRedux = require("react-redux");
var _paragon = require("@openedx/paragon");
var _modelStore = require("../../../../generic/model-store");
var _data = require("../../../data");
var _SidebarContext = _interopRequireDefault(require("../../sidebar/SidebarContext"));
var _SidebarContext2 = _interopRequireDefault(require("../../new-sidebar/SidebarContext"));
var _constants = require("../../../../constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function useSequenceNavigationMetadata(currentSequenceId, currentUnitId) {
  const sequenceIds = (0, _reactRedux.useSelector)(_data.sequenceIdsSelector);
  const sequence = (0, _modelStore.useModel)('sequences', currentSequenceId);
  const courseId = (0, _reactRedux.useSelector)(state => state.courseware.courseId);
  const courseStatus = (0, _reactRedux.useSelector)(state => state.courseware.courseStatus);
  const sequenceStatus = (0, _reactRedux.useSelector)(state => state.courseware.sequenceStatus);

  // If we don't know the sequence and unit yet, then assume no.
  if (courseStatus !== 'loaded' || sequenceStatus !== 'loaded' || !currentSequenceId || !currentUnitId) {
    return {
      isFirstUnit: false,
      isLastUnit: false,
      navigationDisabledNextSequence: false,
      navigationDisabledPrevSequence: false
    };
  }
  const sequenceIndex = sequenceIds.indexOf(currentSequenceId);
  const unitIndex = sequence.unitIds.indexOf(currentUnitId);
  const isFirstSequence = sequenceIndex === 0;
  const isFirstUnitInSequence = unitIndex === 0;
  const isFirstUnit = isFirstSequence && isFirstUnitInSequence;
  const isLastSequence = sequenceIndex === sequenceIds.length - 1;
  const isLastUnitInSequence = unitIndex === sequence.unitIds.length - 1;
  const isLastUnit = isLastSequence && isLastUnitInSequence;
  const sequenceNavigationDisabled = sequence.navigationDisabled;
  const navigationDisabledPrevSequence = sequenceNavigationDisabled && isFirstUnitInSequence;
  const navigationDisabledNextSequence = sequenceNavigationDisabled && isLastUnitInSequence;
  const nextSequenceId = sequenceIndex < sequenceIds.length - 1 ? sequenceIds[sequenceIndex + 1] : null;
  const previousSequenceId = sequenceIndex > 0 ? sequenceIds[sequenceIndex - 1] : null;
  let nextLink;
  if (isLastUnit) {
    nextLink = `/course/${courseId}/course-end`;
  } else {
    const nextIndex = unitIndex + 1;
    if (nextIndex < sequence.unitIds.length) {
      const nextUnitId = sequence.unitIds[nextIndex];
      nextLink = `/course/${courseId}/${currentSequenceId}/${nextUnitId}`;
    } else if (nextSequenceId) {
      nextLink = `/course/${courseId}/${nextSequenceId}/first`;
    }
  }
  let previousLink;
  const previousIndex = unitIndex - 1;
  if (previousIndex >= 0) {
    const previousUnitId = sequence.unitIds[previousIndex];
    previousLink = `/course/${courseId}/${currentSequenceId}/${previousUnitId}`;
  } else if (previousSequenceId) {
    previousLink = `/course/${courseId}/${previousSequenceId}/last`;
  }
  return {
    isFirstUnit,
    isLastUnit,
    nextLink,
    previousLink,
    navigationDisabledNextSequence,
    navigationDisabledPrevSequence
  };
}
function useIsOnMediumDesktop() {
  const windowSize = (0, _paragon.useWindowSize)();
  return windowSize.width >= _paragon.breakpoints.medium.minWidth && windowSize.width < _paragon.breakpoints.extraLarge.minWidth;
}
function useIsOnLargeDesktop() {
  const windowSize = (0, _paragon.useWindowSize)();
  return windowSize.width >= _paragon.breakpoints.extraLarge.minWidth && windowSize.width < _paragon.breakpoints.extraLarge.maxWidth;
}
function useIsOnXLDesktop() {
  const windowSize = (0, _paragon.useWindowSize)();
  return windowSize.width >= _paragon.breakpoints.extraLarge.maxWidth;
}
function useIsSidebarOpen(unitId) {
  const courseId = (0, _reactRedux.useSelector)(state => state.courseware.courseId);
  const {
    isNewDiscussionSidebarViewEnabled
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const {
    currentSidebar
  } = (0, _react.useContext)(isNewDiscussionSidebarViewEnabled ? _SidebarContext2.default : _SidebarContext.default);
  const topic = (0, _modelStore.useModel)('discussionTopics', unitId);
  return currentSidebar === _constants.WIDGETS.NOTIFICATIONS || currentSidebar === 'DISCUSSIONS_NOTIFICATIONS' || currentSidebar === _constants.WIDGETS.DISCUSSIONS && !!(topic?.id || topic?.enabledInContext);
}
//# sourceMappingURL=hooks.js.map