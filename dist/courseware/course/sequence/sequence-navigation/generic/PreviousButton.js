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
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const PreviousButton = ({
  onClick,
  buttonLabel,
  previousLink,
  variant,
  buttonStyle,
  isFirstUnit,
  isAtTop
}) => {
  const navigate = (0, _reactRouterDom.useNavigate)();
  const disabled = isFirstUnit;
  const {
    pathname
  } = (0, _reactRouterDom.useLocation)();
  const navLink = pathname.startsWith('/preview') ? `/preview${previousLink}` : previousLink;
  const getPrevArrow = () => {
    if (isAtTop) {
      return (0, _i18n.isRtl)((0, _i18n.getLocale)()) ? _icons.ArrowForward : _icons.ArrowBack;
    }
    return (0, _i18n.isRtl)((0, _i18n.getLocale)()) ? _icons.ChevronRight : _icons.ChevronLeft;
  };
  const prevArrow = getPrevArrow();
  const onClickHandler = () => {
    navigate(navLink);
    onClick();
  };
  if (isAtTop) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.IconButton, {
      className: `${buttonStyle} icon-hover`,
      onClick: onClickHandler,
      src: prevArrow,
      disabled: disabled,
      iconAs: _paragon.Icon,
      alt: buttonLabel
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
    variant: variant,
    className: buttonStyle,
    disabled: disabled,
    onClick: onClick,
    as: disabled ? undefined : _reactRouterDom.Link,
    to: disabled ? undefined : navLink,
    iconBefore: prevArrow,
    children: buttonLabel
  });
};
PreviousButton.propTypes = {
  onClick: _propTypes.default.func.isRequired,
  buttonLabel: _propTypes.default.string.isRequired,
  previousLink: _propTypes.default.string.isRequired,
  variant: _propTypes.default.string.isRequired,
  buttonStyle: _propTypes.default.string.isRequired,
  isFirstUnit: _propTypes.default.bool.isRequired,
  isAtTop: _propTypes.default.bool.isRequired
};
var _default = exports.default = PreviousButton;
//# sourceMappingURL=PreviousButton.js.map