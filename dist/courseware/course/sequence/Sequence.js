"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _analytics = require("@edx/frontend-platform/analytics");
var _i18n = require("@edx/frontend-platform/i18n");
var _reactRedux = require("react-redux");
var _frontendLibSpecialExams = _interopRequireDefault(require("@edx/frontend-lib-special-exams"));
var _PageLoading = _interopRequireDefault(require("@src/generic/PageLoading"));
var _modelStore = require("@src/generic/model-store");
var _hooks = require("@src/alerts/sequence-alerts/hooks");
var _SequenceContainerSlot = _interopRequireDefault(require("../../../plugin-slots/SequenceContainerSlot"));
var _selectors = require("../../data/selectors");
var _courseLicense = _interopRequireDefault(require("../course-license"));
var _Sidebar = _interopRequireDefault(require("../sidebar/Sidebar"));
var _Sidebar2 = _interopRequireDefault(require("../new-sidebar/Sidebar"));
var _courseOutline = require("../sidebar/sidebars/course-outline");
var _messages = _interopRequireDefault(require("./messages"));
var _hiddenAfterDue = _interopRequireDefault(require("./hidden-after-due"));
var _sequenceNavigation = require("./sequence-navigation");
var _SequenceContent = _interopRequireDefault(require("./SequenceContent"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable no-use-before-define */

const Sequence = _ref => {
  let {
    unitId,
    sequenceId,
    courseId,
    unitNavigationHandler,
    nextSequenceHandler,
    previousSequenceHandler
  } = _ref;
  const intl = (0, _i18n.useIntl)();
  const {
    canAccessProctoredExams,
    license
  } = (0, _modelStore.useModel)('coursewareMeta', courseId);
  const {
    isStaff,
    originalUserIsStaff,
    isNewDiscussionSidebarViewEnabled
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const sequence = (0, _modelStore.useModel)('sequences', sequenceId);
  const unit = (0, _modelStore.useModel)('units', unitId);
  const sequenceStatus = (0, _reactRedux.useSelector)(state => state.courseware.sequenceStatus);
  const sequenceMightBeUnit = (0, _reactRedux.useSelector)(state => state.courseware.sequenceMightBeUnit);
  const {
    enableNavigationSidebar: isEnabledOutlineSidebar
  } = (0, _reactRedux.useSelector)(_selectors.getCoursewareOutlineSidebarSettings);
  const handleNext = () => {
    const nextIndex = sequence.unitIds.indexOf(unitId) + 1;
    const newUnitId = sequence.unitIds[nextIndex];
    handleNavigate(newUnitId);
    if (nextIndex >= sequence.unitIds.length) {
      nextSequenceHandler();
    }
  };
  const handlePrevious = () => {
    const previousIndex = sequence.unitIds.indexOf(unitId) - 1;
    const newUnitId = sequence.unitIds[previousIndex];
    handleNavigate(newUnitId);
    if (previousIndex < 0) {
      previousSequenceHandler();
    }
  };
  const handleNavigate = destinationUnitId => {
    unitNavigationHandler(destinationUnitId);
  };
  const logEvent = (eventName, widgetPlacement, targetUnitId) => {
    // Note: tabs are tracked with a 1-indexed position
    // as opposed to a 0-index used throughout this MFE
    const currentIndex = sequence.unitIds.length > 0 ? sequence.unitIds.indexOf(unitId) : 0;
    const payload = {
      current_tab: currentIndex + 1,
      id: unitId,
      tab_count: sequence.unitIds.length,
      widget_placement: widgetPlacement
    };
    if (targetUnitId) {
      const targetIndex = sequence.unitIds.indexOf(targetUnitId);
      payload.target_tab = targetIndex + 1;
    }
    (0, _analytics.sendTrackEvent)(eventName, payload);
    (0, _analytics.sendTrackingLogEvent)(eventName, payload);
  };
  (0, _hooks.useSequenceBannerTextAlert)(sequenceId);
  (0, _hooks.useSequenceEntranceExamAlert)(courseId, sequenceId, intl);
  (0, _react.useEffect)(() => {
    function receiveMessage(event) {
      const {
        type
      } = event.data;
      if (type === 'entranceExam.passed') {
        // I know this seems (is) intense. It is implemented this way since we need to refetch the underlying
        // course blocks that were originally hidden because the Entrance Exam was not passed.
        global.location.reload();
      }
    }
    global.addEventListener('message', receiveMessage);
  }, []);
  const [unitHasLoaded, setUnitHasLoaded] = (0, _react.useState)(false);
  const handleUnitLoaded = () => {
    setUnitHasLoaded(true);
  };

  // We want hide the unit navigation if we're in the middle of navigating to another unit
  // but not if other things about the unit change, like the bookmark status.
  // The array property of this useEffect ensures that we only hide the unit navigation
  // while navigating to another unit.
  (0, _react.useEffect)(() => {
    if (unit) {
      setUnitHasLoaded(false);
    }
  }, [(unit || {}).id]);

  // If sequence might be a unit, we want to keep showing a spinner - the courseware container will redirect us when
  // it knows which sequence to actually go to.
  const loading = sequenceStatus === 'loading' || sequenceStatus === 'failed' && sequenceMightBeUnit;
  if (loading) {
    if (!sequenceId) {
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        children: [" ", intl.formatMessage(_messages.default.noContent), " "]
      });
    }
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_PageLoading.default, {
      srMessage: intl.formatMessage(_messages.default.loadingSequence)
    });
  }
  if (sequenceStatus === 'loaded' && sequence.isHiddenAfterDue) {
    // Shouldn't even be here - these sequences are normally stripped out of the navigation.
    // But we are here, so render a notice instead of the normal content.
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_hiddenAfterDue.default, {
      courseId: courseId
    });
  }
  const gated = sequence && sequence.gatedContent !== undefined && sequence.gatedContent.gated;
  const renderUnitNavigation = isAtTop => /*#__PURE__*/(0, _jsxRuntime.jsx)(_sequenceNavigation.UnitNavigation, {
    sequenceId: sequenceId,
    unitId: unitId,
    isAtTop: isAtTop,
    onClickPrevious: () => {
      logEvent('edx.ui.lms.sequence.previous_selected', 'bottom');
      handlePrevious();
    },
    onClickNext: () => {
      logEvent('edx.ui.lms.sequence.next_selected', 'bottom');
      handleNext();
    }
  });
  const defaultContent = /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "sequence-container d-inline-flex flex-row w-100",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_courseOutline.Trigger, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_courseOutline.Sidebar, {}), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "sequence w-100",
        children: [!isEnabledOutlineSidebar && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "sequence-navigation-container",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_sequenceNavigation.SequenceNavigation, {
            sequenceId: sequenceId,
            unitId: unitId,
            nextHandler: () => {
              logEvent('edx.ui.lms.sequence.next_selected', 'top');
              handleNext();
            },
            onNavigate: destinationUnitId => {
              logEvent('edx.ui.lms.sequence.tab_selected', 'top', destinationUnitId);
              handleNavigate(destinationUnitId);
            },
            previousHandler: () => {
              logEvent('edx.ui.lms.sequence.previous_selected', 'top');
              handlePrevious();
            }
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "unit-container flex-grow-1 pt-4",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SequenceContent.default, {
            courseId: courseId,
            gated: gated,
            sequenceId: sequenceId,
            unitId: unitId,
            unitLoadedHandler: handleUnitLoaded
          }), unitHasLoaded && renderUnitNavigation(false)]
        })]
      }), isNewDiscussionSidebarViewEnabled ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_Sidebar2.default, {}) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_Sidebar.default, {})]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SequenceContainerSlot.default, {
      courseId: courseId,
      unitId: unitId
    })]
  });
  if (sequenceStatus === 'loaded') {
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_frontendLibSpecialExams.default, {
        sequence: sequence,
        courseId: courseId,
        isStaff: isStaff,
        originalUserIsStaff: originalUserIsStaff,
        canAccessProctoredExams: canAccessProctoredExams,
        children: [isEnabledOutlineSidebar && renderUnitNavigation(true), defaultContent]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_courseLicense.default, {
        license: license || undefined
      })]
    });
  }

  // sequence status 'failed' and any other unexpected sequence status.
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
    className: "text-center py-5 mx-auto",
    style: {
      maxWidth: '30em'
    },
    children: intl.formatMessage(_messages.default.loadFailure)
  });
};
Sequence.propTypes = {
  unitId: _propTypes.default.string,
  sequenceId: _propTypes.default.string,
  courseId: _propTypes.default.string.isRequired,
  unitNavigationHandler: _propTypes.default.func.isRequired,
  nextSequenceHandler: _propTypes.default.func.isRequired,
  previousSequenceHandler: _propTypes.default.func.isRequired
};
Sequence.defaultProps = {
  sequenceId: null,
  unitId: null
};
var _default = exports.default = Sequence;
//# sourceMappingURL=Sequence.js.map