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
const _excluded = ["intl", "offer", "variant", "onClick", "verifiedMode"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
const UpgradeNowButton = props => {
  const {
      intl,
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
  intl: _i18n.intlShape.isRequired,
  offer: _propTypes.default.shape({
    upgradeUrl: _propTypes.default.string.isRequired
  }),
  onClick: _propTypes.default.func,
  verifiedMode: _propTypes.default.shape({
    upgradeUrl: _propTypes.default.string.isRequired
  }).isRequired,
  variant: _propTypes.default.string
};
var _default = exports.default = (0, _i18n.injectIntl)(UpgradeNowButton);
//# sourceMappingURL=UpgradeNowButton.js.map