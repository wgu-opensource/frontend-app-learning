"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _paragon = require("@edx/paragon");

var _icons = require("@edx/paragon/icons");

var _classnames = _interopRequireDefault(require("classnames"));

var _i18n = require("@edx/frontend-platform/i18n");

var _reactRedux = require("react-redux");

var _courseExit = require("../../course-exit");

var _UnitButton = _interopRequireDefault(require("./UnitButton"));

var _SequenceNavigationTabs = _interopRequireDefault(require("./SequenceNavigationTabs"));

var _hooks = require("./hooks");

var _modelStore = require("../../../../generic/model-store");

var _slice = require("../../../data/slice");

var _messages = _interopRequireDefault(require("./messages"));

var _mmP2p = require("../../../../experiments/mm-p2p");

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** [MM-P2P] Experiment */
function SequenceNavigation(_ref) {
  let {
    intl,
    unitId,
    sequenceId,
    className,
    onNavigate,
    nextSequenceHandler,
    previousSequenceHandler,
    goToCourseExitPage,
    mmp2p
  } = _ref;
  const sequence = (0, _modelStore.useModel)('sequences', sequenceId);
  const {
    isFirstUnit,
    isLastUnit
  } = (0, _hooks.useSequenceNavigationMetadata)(sequenceId, unitId);
  const {
    courseId,
    sequenceStatus
  } = (0, _reactRedux.useSelector)(state => state.courseware);
  const isLocked = sequenceStatus === _slice.LOADED ? sequence.gatedContent !== undefined && sequence.gatedContent.gated : undefined;

  const shouldDisplayNotificationTriggerInSequence = (0, _paragon.useWindowSize)().width < _paragon.breakpoints.small.minWidth;

  const renderUnitButtons = () => {
    if (isLocked) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_UnitButton.default, {
        unitId: unitId,
        title: "",
        contentType: "lock",
        isActive: true,
        onClick: () => {}
      });
    }

    if (sequence.unitIds.length === 0 || unitId === null) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          flexBasis: '100%',
          minWidth: 0,
          borderBottom: 'solid 1px #EAEAEA'
        }
      });
    }

    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_SequenceNavigationTabs.default, {
      unitIds: sequence.unitIds,
      unitId: unitId,
      showCompletion: sequence.showCompletion,
      onNavigate: onNavigate
    });
  };

  const renderNextButton = () => {
    const {
      exitActive,
      exitText
    } = (0, _courseExit.getCourseExitNavigation)(courseId, intl);
    const buttonOnClick = isLastUnit ? goToCourseExitPage : nextSequenceHandler;
    const buttonText = isLastUnit && exitText ? exitText : intl.formatMessage(_messages.default.nextButton);
    const disabled = isLastUnit && !exitActive;
    const nextArrow = (0, _i18n.isRtl)((0, _i18n.getLocale)()) ? _icons.ChevronLeft : _icons.ChevronRight;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
      variant: "link",
      className: "next-btn",
      onClick: buttonOnClick,
      disabled: disabled,
      iconAfter: nextArrow,
      children: shouldDisplayNotificationTriggerInSequence ? null : buttonText
    });
  };

  const prevArrow = (0, _i18n.isRtl)((0, _i18n.getLocale)()) ? _icons.ChevronRight : _icons.ChevronLeft;
  return sequenceStatus === _slice.LOADED && /*#__PURE__*/(0, _jsxRuntime.jsxs)("nav", {
    id: "courseware-sequenceNavigation",
    className: (0, _classnames.default)('sequence-navigation', className),
    style: {
      width: shouldDisplayNotificationTriggerInSequence ? '90%' : null
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
      variant: "link",
      className: "previous-btn",
      onClick: previousSequenceHandler,
      disabled: isFirstUnit,
      iconBefore: prevArrow,
      children: shouldDisplayNotificationTriggerInSequence ? null : intl.formatMessage(_messages.default.previousButton)
    }), renderUnitButtons(), renderNextButton(), mmp2p.state.isEnabled && /*#__PURE__*/(0, _jsxRuntime.jsx)(_mmP2p.MMP2PFlyoverTriggerMobile, {
      options: mmp2p
    })]
  });
}

SequenceNavigation.propTypes = {
  intl: _i18n.intlShape.isRequired,
  sequenceId: _propTypes.default.string.isRequired,
  unitId: _propTypes.default.string,
  className: _propTypes.default.string,
  onNavigate: _propTypes.default.func.isRequired,
  nextSequenceHandler: _propTypes.default.func.isRequired,
  previousSequenceHandler: _propTypes.default.func.isRequired,
  goToCourseExitPage: _propTypes.default.func.isRequired,

  /** [MM-P2P] Experiment */
  mmp2p: _propTypes.default.shape({
    state: _propTypes.default.shape({
      isEnabled: _propTypes.default.bool.isRequired
    })
  })
};
SequenceNavigation.defaultProps = {
  className: null,
  unitId: null,

  /** [MM-P2P] Experiment */
  mmp2p: {
    state: {
      isEnabled: false
    }
  }
};

var _default = (0, _i18n.injectIntl)(SequenceNavigation);

exports.default = _default;
//# sourceMappingURL=SequenceNavigation.js.map