"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRouterDom = require("react-router-dom");
var _paragon = require("@openedx/paragon");
var _icons = require("@openedx/paragon/icons");
var _i18n = require("@edx/frontend-platform/i18n");
var _UnitNavigationEffortEstimate = _interopRequireDefault(require("../UnitNavigationEffortEstimate"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const NextButton = ({
  onClickHandler,
  buttonText,
  nextLink,
  variant,
  buttonStyle,
  disabled,
  hasEffortEstimate,
  isAtTop
}) => {
  const navigate = (0, _reactRouterDom.useNavigate)();
  const {
    pathname
  } = (0, _reactRouterDom.useLocation)();
  const navLink = pathname.startsWith('/preview') ? `/preview${nextLink}` : nextLink;
  const buttonContent = hasEffortEstimate ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_UnitNavigationEffortEstimate.default, {
    children: buttonText
  }) : buttonText;
  const getNextArrow = () => {
    if (isAtTop) {
      return (0, _i18n.isRtl)((0, _i18n.getLocale)()) ? _icons.ArrowBack : _icons.ArrowForward;
    }
    return (0, _i18n.isRtl)((0, _i18n.getLocale)()) ? _icons.ChevronLeft : _icons.ChevronRight;
  };
  const nextArrow = getNextArrow();
  const onClick = () => {
    navigate(navLink);
    onClickHandler();
  };
  if (isAtTop) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.IconButton, {
      className: `${buttonStyle} icon-hover`,
      onClick: onClick,
      src: nextArrow,
      disabled: disabled,
      iconAs: _paragon.Icon,
      alt: buttonText
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
    variant: variant,
    className: buttonStyle,
    disabled: disabled,
    onClick: onClickHandler,
    as: disabled ? undefined : _reactRouterDom.Link,
    to: disabled ? undefined : navLink,
    iconAfter: nextArrow,
    children: buttonContent
  });
};
NextButton.defaultProps = {
  hasEffortEstimate: false
};
NextButton.propTypes = {
  onClickHandler: _propTypes.default.func.isRequired,
  buttonText: _propTypes.default.string.isRequired,
  nextLink: _propTypes.default.string.isRequired,
  variant: _propTypes.default.string.isRequired,
  buttonStyle: _propTypes.default.string.isRequired,
  disabled: _propTypes.default.bool.isRequired,
  hasEffortEstimate: _propTypes.default.bool,
  isAtTop: _propTypes.default.bool.isRequired
};
var _default = exports.default = NextButton;
//# sourceMappingURL=NextButton.js.map