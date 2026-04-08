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
var _SequenceContainerSlot = _interopRequireDefault(require("@src/plugin-slots/SequenceContainerSlot"));
var _CourseOutlineSidebarSlot = require("@src/plugin-slots/CourseOutlineSidebarSlot");
var _CourseOutlineSidebarTriggerSlot = require("@src/plugin-slots/CourseOutlineSidebarTriggerSlot");
var _NotificationsDiscussionsSidebarSlot = require("@src/plugin-slots/NotificationsDiscussionsSidebarSlot");
var _SequenceNavigationSlot = _interopRequireDefault(require("@src/plugin-slots/SequenceNavigationSlot"));
var _courseLicense = _interopRequireDefault(require("../course-license"));
var _messages = _interopRequireDefault(require("./messages"));
var _hiddenAfterDue = _interopRequireDefault(require("./hidden-after-due"));
var _sequenceNavigation = require("./sequence-navigation");
var _SequenceContent = _interopRequireDefault(require("./SequenceContent"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable @typescript-eslint/no-use-before-define */
const Sequence = ({
  unitId,
  sequenceId,
  courseId,
  unitNavigationHandler,
  nextSequenceHandler,
  previousSequenceHandler
}) => {
  const intl = (0, _i18n.useIntl)();
  const {
    canAccessProctoredExams,
    license
  } = (0, _modelStore.useModel)('coursewareMeta', courseId);
  const {
    isStaff,
    originalUserIsStaff
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const sequence = (0, _modelStore.useModel)('sequences', sequenceId);
  const section = (0, _modelStore.useModel)('sections', sequence ? sequence.sectionId : null);
  const unit = (0, _modelStore.useModel)('units', unitId);
  const sequenceStatus = (0, _reactRedux.useSelector)(state => state.courseware.sequenceStatus);
  const sequenceMightBeUnit = (0, _reactRedux.useSelector)(state => state.courseware.sequenceMightBeUnit);
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

  /* istanbul ignore next */
  const nextHandler = () => {
    logEvent('edx.ui.lms.sequence.next_selected', 'top');
    handleNext();
  };

  /* istanbul ignore next */
  const previousHandler = () => {
    logEvent('edx.ui.lms.sequence.previous_selected', 'top');
    handlePrevious();
  };

  /* istanbul ignore next */
  const onNavigate = destinationUnitId => {
    logEvent('edx.ui.lms.sequence.tab_selected', 'top', destinationUnitId);
    handleNavigate(destinationUnitId);
  };
  const sequenceNavProps = {
    nextHandler,
    previousHandler,
    onNavigate
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
    courseId: courseId,
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
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CourseOutlineSidebarTriggerSlot.CourseOutlineSidebarTriggerSlot, {
        sectionId: section ? section.id : null,
        sequenceId: sequenceId,
        isStaff: isStaff,
        unitId: unitId
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CourseOutlineSidebarSlot.CourseOutlineSidebarSlot, {}), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "sequence w-100",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "sequence-navigation-container",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SequenceNavigationSlot.default, _objectSpread({
            sequenceId: sequenceId,
            unitId: unitId
          }, _objectSpread(_objectSpread({}, sequenceNavProps), {}, {
            nextSequenceHandler,
            handleNavigate
          })))
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "unit-container flex-grow-1 pt-4",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SequenceContent.default, {
            courseId: courseId,
            gated: gated,
            sequenceId: sequenceId,
            unitId: unitId,
            unitLoadedHandler: handleUnitLoaded,
            isOriginalUserStaff: originalUserIsStaff,
            renderUnitNavigation: renderUnitNavigation
          }), unitHasLoaded && renderUnitNavigation(false)]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_NotificationsDiscussionsSidebarSlot.NotificationsDiscussionsSidebarSlot, {
        courseId: courseId
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SequenceContainerSlot.default, {
      courseId: courseId,
      unitId: unitId
    })]
  });
  if (sequenceStatus === 'loaded') {
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "d-flex flex-column flex-grow-1 justify-content-center",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_frontendLibSpecialExams.default, {
          sequence: sequence,
          courseId: courseId,
          isStaff: isStaff,
          originalUserIsStaff: originalUserIsStaff,
          canAccessProctoredExams: canAccessProctoredExams,
          children: defaultContent
        })
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