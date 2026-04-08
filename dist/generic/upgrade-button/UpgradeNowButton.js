"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@openedx/paragon");
var _FormattedPricing = _interopRequireDefault(require("./FormattedPricing"));
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["offer", "variant", "onClick", "verifiedMode"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
const UpgradeNowButton = props => {
  const {
      offer,
      variant,
      onClick,
      verifiedMode
    } = props,
    rest = _objectWithoutProperties(props, _excluded);

  // Prefer offer's url in case it is different (might hold a coupon code that the normal does not)
  const url = offer ? offer.upgradeUrl : verifiedMode.upgradeUrl;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, _objectSpread(_objectSpread({
    variant: variant,
    href: url,
    onClick: onClick
  }, rest), {}, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
      id: "learning.upgradeNowButton.buttonText",
      defaultMessage: "Upgrade now for {pricing}",
      values: {
        pricing: /*#__PURE__*/(0, _jsxRuntime.jsx)(_FormattedPricing.default, {
          offer: offer,
          verifiedMode: verifiedMode
        })
      }
    })
  }));
};
UpgradeNowButton.defaultProps = {
  offer: null,
  onClick: null,
  variant: 'primary'
};
UpgradeNowButton.propTypes = {
  offer: _propTypes.default.shape({
    upgradeUrl: _propTypes.default.string.isRequired
  }),
  onClick: _propTypes.default.func,
  verifiedMode: _propTypes.default.shape({
    upgradeUrl: _propTypes.default.string.isRequired
  }).isRequired,
  variant: _propTypes.default.string
};
var _default = exports.default = UpgradeNowButton;
//# sourceMappingURL=UpgradeNowButton.js.map