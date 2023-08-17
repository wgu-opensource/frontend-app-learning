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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function UpgradeNowButton(props) {
  const {
    intl,
    offer,
    variant,
    onClick,
    verifiedMode
  } = props,
        rest = _objectWithoutProperties(props, _excluded); // Prefer offer's url in case it is different (might hold a coupon code that the normal does not)


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
}

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

var _default = (0, _i18n.injectIntl)(UpgradeNowButton);

exports.default = _default;
//# sourceMappingURL=UpgradeNowButton.js.map