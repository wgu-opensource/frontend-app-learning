"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _courseExit = require("../../course-exit");
var _hooks = require("./hooks");
var _messages = _interopRequireDefault(require("./messages"));
var _PreviousButton = _interopRequireDefault(require("./generic/PreviousButton"));
var _NextButton = _interopRequireDefault(require("./generic/NextButton"));
var _NextUnitTopNavTriggerSlot = require("../../../../plugin-slots/NextUnitTopNavTriggerSlot");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const UnitNavigation = ({
  sequenceId,
  unitId,
  onClickPrevious,
  onClickNext,
  isAtTop,
  courseId
}) => {
  const intl = (0, _i18n.useIntl)();
  const {
    isFirstUnit,
    isLastUnit,
    nextLink,
    previousLink
  } = (0, _hooks.useSequenceNavigationMetadata)(sequenceId, unitId);
  const renderPreviousButton = () => {
    const buttonStyle = `previous-button ${isAtTop ? 'text-dark mr-3' : 'justify-content-center'}`;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_PreviousButton.default, {
      isFirstUnit: isFirstUnit,
      variant: "outline-secondary",
      buttonLabel: intl.formatMessage(_messages.default.previousButton),
      buttonStyle: buttonStyle,
      onClick: onClickPrevious,
      previousLink: previousLink,
      isAtTop: isAtTop
    });
  };
  const renderNextButton = () => {
    const {
      exitActive,
      exitText
    } = (0, _courseExit.GetCourseExitNavigation)(courseId, intl);
    const buttonText = isLastUnit && exitText ? exitText : intl.formatMessage(_messages.default.nextButton);
    const disabled = isLastUnit && !exitActive;
    const variant = 'outline-primary';
    const buttonStyle = `next-button ${isAtTop ? 'text-dark' : 'justify-content-center'}`;
    if (isAtTop) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_NextUnitTopNavTriggerSlot.NextUnitTopNavTriggerSlot, {
        variant,
        buttonStyle,
        buttonText,
        disabled,
        sequenceId,
        nextLink,
        onClickHandler: onClickNext,
        isAtTop
      });
    }
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_NextButton.default, {
      variant: variant,
      buttonStyle: buttonStyle,
      onClickHandler: onClickNext,
      disabled: disabled,
      buttonText: buttonText,
      nextLink: nextLink,
      hasEffortEstimate: true
    });
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: (0, _classnames.default)('d-flex', {
      'unit-navigation': !isAtTop,
      'top-unit-navigation': isAtTop
    }),
    children: [renderPreviousButton(), renderNextButton()]
  });
};
UnitNavigation.propTypes = {
  courseId: _propTypes.default.string.isRequired,
  sequenceId: _propTypes.default.string.isRequired,
  unitId: _propTypes.default.string,
  onClickPrevious: _propTypes.default.func.isRequired,
  onClickNext: _propTypes.default.func.isRequired,
  isAtTop: _propTypes.default.bool
};
UnitNavigation.defaultProps = {
  unitId: null,
  isAtTop: false
};
var _default = exports.default = UnitNavigation;
//# sourceMappingURL=UnitNavigation.js.map