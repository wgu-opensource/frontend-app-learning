"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _paragon = require("@edx/paragon");
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _faChevronLeft = require("@fortawesome/free-solid-svg-icons/faChevronLeft");
var _faChevronRight = require("@fortawesome/free-solid-svg-icons/faChevronRight");
var _i18n = require("@edx/frontend-platform/i18n");
var _reactRedux = require("react-redux");
var _courseExit = require("../../course-exit");
var _UnitNavigationEffortEstimate = _interopRequireDefault(require("./UnitNavigationEffortEstimate"));
var _hooks = require("./hooks");
var _messages = _interopRequireDefault(require("./messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const UnitNavigation = _ref => {
  let {
    intl,
    sequenceId,
    unitId,
    onClickPrevious,
    onClickNext,
    goToCourseExitPage
  } = _ref;
  const {
    isFirstUnit,
    isLastUnit
  } = (0, _hooks.useSequenceNavigationMetadata)(sequenceId, unitId);
  const {
    courseId
  } = (0, _reactRedux.useSelector)(state => state.courseware);
  const renderNextButton = () => {
    const {
      exitActive,
      exitText
    } = (0, _courseExit.GetCourseExitNavigation)(courseId, intl);
    const buttonOnClick = isLastUnit ? goToCourseExitPage : onClickNext;
    const buttonText = isLastUnit && exitText ? exitText : intl.formatMessage(_messages.default.nextButton);
    const disabled = isLastUnit && !exitActive;
    const nextArrow = (0, _i18n.isRtl)((0, _i18n.getLocale)()) ? _faChevronLeft.faChevronLeft : _faChevronRight.faChevronRight;
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Button, {
      variant: "outline-primary",
      className: "next-button d-flex align-items-center justify-content-center",
      onClick: buttonOnClick,
      disabled: disabled,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_UnitNavigationEffortEstimate.default, {
        sequenceId: sequenceId,
        unitId: unitId,
        children: buttonText
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
        icon: nextArrow,
        className: "ml-2",
        size: "sm"
      })]
    });
  };
  const prevArrow = (0, _i18n.isRtl)((0, _i18n.getLocale)()) ? _faChevronRight.faChevronRight : _faChevronLeft.faChevronLeft;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "unit-navigation d-flex",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Button, {
      variant: "outline-secondary",
      className: "previous-button mr-2 d-flex align-items-center justify-content-center",
      disabled: isFirstUnit,
      onClick: onClickPrevious,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
        icon: prevArrow,
        className: "mr-2",
        size: "sm"
      }), intl.formatMessage(_messages.default.previousButton)]
    }), renderNextButton()]
  });
};
UnitNavigation.propTypes = {
  intl: _i18n.intlShape.isRequired,
  sequenceId: _propTypes.default.string.isRequired,
  unitId: _propTypes.default.string,
  onClickPrevious: _propTypes.default.func.isRequired,
  onClickNext: _propTypes.default.func.isRequired,
  goToCourseExitPage: _propTypes.default.func.isRequired
};
UnitNavigation.defaultProps = {
  unitId: null
};
var _default = (0, _i18n.injectIntl)(UnitNavigation);
exports.default = _default;
//# sourceMappingURL=UnitNavigation.js.map