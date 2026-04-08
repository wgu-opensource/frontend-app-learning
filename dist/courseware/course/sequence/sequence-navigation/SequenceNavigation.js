"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _paragon = require("@openedx/paragon");
var _classnames = _interopRequireDefault(require("classnames"));
var _i18n = require("@edx/frontend-platform/i18n");
var _reactRedux = require("react-redux");
var _constants = require("@src/constants");
var _courseExit = require("../../course-exit");
var _UnitButton = _interopRequireDefault(require("./UnitButton"));
var _SequenceNavigationTabs = _interopRequireDefault(require("./SequenceNavigationTabs"));
var _hooks = require("./hooks");
var _modelStore = require("../../../../generic/model-store");
var _messages = _interopRequireDefault(require("./messages"));
var _PreviousButton = _interopRequireDefault(require("./generic/PreviousButton"));
var _NextUnitTopNavTriggerSlot = require("../../../../plugin-slots/NextUnitTopNavTriggerSlot");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const SequenceNavigation = ({
  unitId,
  sequenceId,
  className,
  onNavigate,
  nextHandler,
  previousHandler
}) => {
  const intl = (0, _i18n.useIntl)();
  const sequence = (0, _modelStore.useModel)('sequences', sequenceId);
  const {
    isFirstUnit,
    isLastUnit,
    nextLink,
    previousLink,
    navigationDisabledPrevSequence,
    navigationDisabledNextSequence
  } = (0, _hooks.useSequenceNavigationMetadata)(sequenceId, unitId);
  const {
    courseId,
    sequenceStatus
  } = (0, _reactRedux.useSelector)(state => state.courseware);
  const isLocked = sequenceStatus === _constants.LOADED ? sequence.gatedContent !== undefined && sequence.gatedContent.gated : undefined;
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
  const renderPreviousButton = () => navigationDisabledPrevSequence || /*#__PURE__*/(0, _jsxRuntime.jsx)(_PreviousButton.default, {
    variant: "link",
    buttonStyle: "previous-btn",
    onClick: previousHandler,
    previousLink: previousLink,
    isFirstUnit: isFirstUnit,
    buttonLabel: shouldDisplayNotificationTriggerInSequence ? null : intl.formatMessage(_messages.default.previousButton)
  });
  const renderNextButton = () => {
    let buttonText;
    const {
      exitActive,
      exitText
    } = (0, _courseExit.GetCourseExitNavigation)(courseId, intl);
    const disabled = isLastUnit && !exitActive;
    if (isLastUnit && exitText) {
      buttonText = exitText;
    } else if (!shouldDisplayNotificationTriggerInSequence) {
      buttonText = intl.formatMessage(_messages.default.nextButton);
    }
    return navigationDisabledNextSequence || /*#__PURE__*/(0, _jsxRuntime.jsx)(_NextUnitTopNavTriggerSlot.NextUnitTopNavTriggerSlot, {
      disabled,
      buttonText,
      nextLink,
      sequenceId,
      onClickHandler: nextHandler,
      variant: 'link',
      buttonStyle: 'next-btn'
    });
  };
  return sequenceStatus === _constants.LOADED ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("nav", {
    id: "courseware-sequence-navigation",
    "data-testid": "courseware-sequence-navigation",
    className: (0, _classnames.default)('sequence-navigation', className, {
      'mr-2': shouldDisplayNotificationTriggerInSequence
    }),
    children: [renderPreviousButton(), renderUnitButtons(), renderNextButton()]
  }) : null;
};
SequenceNavigation.propTypes = {
  sequenceId: _propTypes.default.string.isRequired,
  unitId: _propTypes.default.string,
  className: _propTypes.default.string,
  onNavigate: _propTypes.default.func.isRequired,
  nextHandler: _propTypes.default.func.isRequired,
  previousHandler: _propTypes.default.func.isRequired
};
SequenceNavigation.defaultProps = {
  className: null,
  unitId: null
};
var _default = exports.default = SequenceNavigation;
//# sourceMappingURL=SequenceNavigation.js.map