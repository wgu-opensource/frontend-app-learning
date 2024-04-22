"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@edx/paragon");
var _FormattedPricing = _interopRequireDefault(require("./FormattedPricing"));
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["intl", "offer", "variant", "onClick", "verifiedMode"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
const UpgradeButton = props => {
  const {
      intl,
      offer,
      variant,
      onClick,
      verifiedMode
    } = props,
    rest = _objectWithoutProperties(props, _excluded);

  // Prefer offer's url in case it is ever different (though it is not at time of this writing)
  const url = offer ? offer.upgradeUrl : verifiedMode.upgradeUrl;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, _objectSpread(_objectSpread({
    variant: variant,
    href: url,
    onClick: onClick
  }, rest), {}, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
        id: "learning.upgradeButton.buttonText",
        defaultMessage: "Upgrade for {pricing}",
        values: {
          pricing: /*#__PURE__*/(0, _jsxRuntime.jsx)(_FormattedPricing.default, {
            offer: offer,
            verifiedMode: verifiedMode
          })
        }
      })
    })
  }));
};
UpgradeButton.defaultProps = {
  offer: null,
  onClick: null,
  variant: 'primary'
};
UpgradeButton.propTypes = {
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
var _default = (0, _i18n.injectIntl)(UpgradeButton);
exports.default = _default;
//# sourceMappingURL=UpgradeButton.js.map