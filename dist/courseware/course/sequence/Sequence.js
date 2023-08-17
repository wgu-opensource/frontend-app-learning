"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _analytics = require("@edx/frontend-platform/analytics");

var _i18n = require("@edx/frontend-platform/i18n");

var _reactRedux = require("react-redux");

var _frontendPlatform = require("@edx/frontend-platform");

var _frontendLibSpecialExams = _interopRequireDefault(require("@edx/frontend-lib-special-exams"));

var _paragon = require("@edx/paragon");

var _PageLoading = _interopRequireDefault(require("../../../generic/PageLoading"));

var _modelStore = require("../../../generic/model-store");

var _hooks = require("../../../alerts/sequence-alerts/hooks");

var _courseLicense = _interopRequireDefault(require("../course-license"));

var _Sidebar = _interopRequireDefault(require("../sidebar/Sidebar"));

var _SidebarTriggers = _interopRequireDefault(require("../sidebar/SidebarTriggers"));

var _messages = _interopRequireDefault(require("./messages"));

var _hiddenAfterDue = _interopRequireDefault(require("./hidden-after-due"));

var _sequenceNavigation = require("./sequence-navigation");

var _SequenceContent = _interopRequireDefault(require("./SequenceContent"));

var _utils = require("../../../experiments/mm-p2p/utils");

var _mmP2p = require("../../../experiments/mm-p2p");

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint-disable no-use-before-define */

/** [MM-P2P] Experiment */
function Sequence(_ref) {
  let {
    unitId,
    sequenceId,
    courseId,
    unitNavigationHandler,
    nextSequenceHandler,
    previousSequenceHandler,
    intl,
    mmp2p
  } = _ref;
  const course = (0, _modelStore.useModel)('coursewareMeta', courseId);
  const {
    isStaff,
    originalUserIsStaff
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const sequence = (0, _modelStore.useModel)('sequences', sequenceId);
  const unit = (0, _modelStore.useModel)('units', unitId);
  const sequenceStatus = (0, _reactRedux.useSelector)(state => state.courseware.sequenceStatus);
  const sequenceMightBeUnit = (0, _reactRedux.useSelector)(state => state.courseware.sequenceMightBeUnit);

  const shouldDisplayNotificationTriggerInSequence = (0, _paragon.useWindowSize)().width < _paragon.breakpoints.small.minWidth;

  const handleNext = () => {
    const nextIndex = sequence.unitIds.indexOf(unitId) + 1;

    if (nextIndex < sequence.unitIds.length) {
      const newUnitId = sequence.unitIds[nextIndex];
      handleNavigate(newUnitId);
    } else {
      nextSequenceHandler();
    }
  };

  const handlePrevious = () => {
    const previousIndex = sequence.unitIds.indexOf(unitId) - 1;

    if (previousIndex >= 0) {
      const newUnitId = sequence.unitIds[previousIndex];
      handleNavigate(newUnitId);
    } else {
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
  }; // We want hide the unit navigation if we're in the middle of navigating to another unit
  // but not if other things about the unit change, like the bookmark status.
  // The array property of this useEffect ensures that we only hide the unit navigation
  // while navigating to another unit.


  (0, _react.useEffect)(() => {
    if (unit) {
      setUnitHasLoaded(false);
    }
  }, [(unit || {}).id]); // If sequence might be a unit, we want to keep showing a spinner - the courseware container will redirect us when
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

  const goToCourseExitPage = () => {
    _frontendPlatform.history.push(`/course/${courseId}/course-end`);
  };

  const defaultContent = /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "sequence-container d-inline-flex flex-row",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: (0, _classnames.default)('sequence w-100', {
        'position-relative': shouldDisplayNotificationTriggerInSequence
      }),
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_sequenceNavigation.SequenceNavigation, {
        sequenceId: sequenceId,
        unitId: unitId,
        className: "mb-4"
        /** [MM-P2P] Experiment */
        ,
        mmp2p: mmp2p,
        nextSequenceHandler: () => {
          logEvent('edx.ui.lms.sequence.next_selected', 'top');
          handleNext();
        },
        onNavigate: destinationUnitId => {
          logEvent('edx.ui.lms.sequence.tab_selected', 'top', destinationUnitId);
          handleNavigate(destinationUnitId);
        },
        previousSequenceHandler: () => {
          logEvent('edx.ui.lms.sequence.previous_selected', 'top');
          handlePrevious();
        },
        goToCourseExitPage: () => goToCourseExitPage()
      }), shouldDisplayNotificationTriggerInSequence && /*#__PURE__*/(0, _jsxRuntime.jsx)(_SidebarTriggers.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "unit-container flex-grow-1",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SequenceContent.default, {
          courseId: courseId,
          gated: gated,
          sequenceId: sequenceId,
          unitId: unitId,
          unitLoadedHandler: handleUnitLoaded
          /** [MM-P2P] Experiment */
          ,
          mmp2p: mmp2p
        }), unitHasLoaded && /*#__PURE__*/(0, _jsxRuntime.jsx)(_sequenceNavigation.UnitNavigation, {
          sequenceId: sequenceId,
          unitId: unitId,
          onClickPrevious: () => {
            logEvent('edx.ui.lms.sequence.previous_selected', 'bottom');
            handlePrevious();
          },
          onClickNext: () => {
            logEvent('edx.ui.lms.sequence.next_selected', 'bottom');
            handleNext();
          },
          goToCourseExitPage: () => goToCourseExitPage()
        })]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Sidebar.default, {}), mmp2p.state.isEnabled && mmp2p.flyover.isVisible && ((0, _utils.isMobile)() ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_mmP2p.MMP2PFlyoverMobile, {
      options: mmp2p
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_mmP2p.MMP2PFlyover, {
      options: mmp2p
    }))]
  });

  if (sequenceStatus === 'loaded') {
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_frontendLibSpecialExams.default, {
        sequence: sequence,
        courseId: courseId,
        isStaff: isStaff,
        originalUserIsStaff: originalUserIsStaff,
        canAccessProctoredExams: course.canAccessProctoredExams,
        children: defaultContent
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_courseLicense.default, {
        license: course.license || undefined
      })]
    });
  } // sequence status 'failed' and any other unexpected sequence status.


  return /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
    className: "text-center py-5 mx-auto",
    style: {
      maxWidth: '30em'
    },
    children: intl.formatMessage(_messages.default.loadFailure)
  });
}

Sequence.propTypes = {
  unitId: _propTypes.default.string,
  sequenceId: _propTypes.default.string,
  courseId: _propTypes.default.string.isRequired,
  unitNavigationHandler: _propTypes.default.func.isRequired,
  nextSequenceHandler: _propTypes.default.func.isRequired,
  previousSequenceHandler: _propTypes.default.func.isRequired,
  intl: _i18n.intlShape.isRequired,

  /** [MM-P2P] Experiment */
  mmp2p: _propTypes.default.shape({
    flyover: _propTypes.default.shape({
      isVisible: _propTypes.default.bool.isRequired
    }),
    meta: _propTypes.default.shape({
      showLock: _propTypes.default.bool
    }),
    state: _propTypes.default.shape({
      isEnabled: _propTypes.default.bool.isRequired
    })
  })
};
Sequence.defaultProps = {
  sequenceId: null,
  unitId: null,

  /** [MM-P2P] Experiment */
  mmp2p: {
    flyover: {
      isVisible: false
    },
    meta: {
      showLock: false
    },
    state: {
      isEnabled: false
    }
  }
};

var _default = (0, _i18n.injectIntl)(Sequence);

exports.default = _default;
//# sourceMappingURL=Sequence.js.map