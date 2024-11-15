"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRouterDom = require("react-router-dom");
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
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const SequenceNavigation = _ref => {
  let {
    intl,
    unitId,
    sequenceId,
    className,
    onNavigate,
    nextHandler,
    previousHandler
  } = _ref;
  const sequence = (0, _modelStore.useModel)('sequences', sequenceId);
  const {
    isFirstUnit,
    isLastUnit,
    nextLink,
    previousLink
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
  const renderPreviousButton = () => {
    const disabled = isFirstUnit;
    const prevArrow = (0, _i18n.isRtl)((0, _i18n.getLocale)()) ? _icons.ChevronRight : _icons.ChevronLeft;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
      variant: "link",
      className: "previous-btn",
      onClick: previousHandler,
      disabled: disabled,
      iconBefore: prevArrow,
      as: disabled ? undefined : _reactRouterDom.Link,
      to: disabled ? undefined : previousLink,
      children: shouldDisplayNotificationTriggerInSequence ? null : intl.formatMessage(_messages.default.previousButton)
    });
  };
  const renderNextButton = () => {
    const {
      exitActive,
      exitText
    } = (0, _courseExit.GetCourseExitNavigation)(courseId, intl);
    const buttonText = isLastUnit && exitText ? exitText : intl.formatMessage(_messages.default.nextButton);
    const disabled = isLastUnit && !exitActive;
    const nextArrow = (0, _i18n.isRtl)((0, _i18n.getLocale)()) ? _icons.ChevronLeft : _icons.ChevronRight;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
      variant: "link",
      className: "next-btn",
      onClick: nextHandler,
      disabled: disabled,
      iconAfter: nextArrow,
      as: disabled ? undefined : _reactRouterDom.Link,
      to: disabled ? undefined : nextLink,
      children: shouldDisplayNotificationTriggerInSequence ? null : buttonText
    });
  };
  return sequenceStatus === _slice.LOADED && /*#__PURE__*/(0, _jsxRuntime.jsxs)("nav", {
    id: "courseware-sequenceNavigation",
    className: (0, _classnames.default)('sequence-navigation', className, {
      'mr-2': shouldDisplayNotificationTriggerInSequence
    }),
    children: [renderPreviousButton(), renderUnitButtons(), renderNextButton()]
  });
};
SequenceNavigation.propTypes = {
  intl: _i18n.intlShape.isRequired,
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
var _default = (0, _i18n.injectIntl)(SequenceNavigation);
exports.default = _default;
//# sourceMappingURL=SequenceNavigation.js.map