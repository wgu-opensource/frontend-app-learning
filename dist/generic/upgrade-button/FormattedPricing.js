"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _messages = _interopRequireDefault(require("./messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const FormattedPricing = props => {
  const {
    inline,
    intl,
    offer,
    verifiedMode
  } = props;
  let currencySymbol;
  if (verifiedMode) {
    currencySymbol = verifiedMode.currencySymbol;
  }
  if (!offer) {
    const {
      price
    } = verifiedMode;
    return `${currencySymbol}${price}`;
  }
  const {
    discountedPrice,
    originalPrice
  } = offer;

  // The inline style is meant for being embedded in a sentence - it bolds the discount and leaves the original price
  // as a parenthetical. The normal styling is more suited for a button, where the price and discount are side by side.
  if (inline) {
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: "font-weight-bold",
        children: discountedPrice
      }), "\xA0(", /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: "sr-only",
        children: intl.formatMessage(_messages.default.srInlinePrices, {
          originalPrice
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        "aria-hidden": "true",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("del", {
          children: originalPrice
        })
      }), ")"]
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: "sr-only",
      children: intl.formatMessage(_messages.default.srPrices, {
        discountedPrice,
        originalPrice
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
      "aria-hidden": "true",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        children: discountedPrice
      }), " (", /*#__PURE__*/(0, _jsxRuntime.jsx)("del", {
        children: originalPrice
      }), ")"]
    })]
  });
};
FormattedPricing.defaultProps = {
  inline: false,
  offer: null,
  verifiedMode: null
};
FormattedPricing.propTypes = {
  inline: _propTypes.default.bool,
  intl: _i18n.intlShape.isRequired,
  offer: _propTypes.default.shape({
    discountedPrice: _propTypes.default.string.isRequired,
    originalPrice: _propTypes.default.string.isRequired,
    upgradeUrl: _propTypes.default.string.isRequired
  }),
  verifiedMode: _propTypes.default.shape({
    currencySymbol: _propTypes.default.string.isRequired,
    price: _propTypes.default.number.isRequired,
    upgradeUrl: _propTypes.default.string.isRequired
  })
};
var _default = (0, _i18n.injectIntl)(FormattedPricing);
exports.default = _default;
//# sourceMappingURL=FormattedPricing.js.map