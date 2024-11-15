"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = require("prop-types");
var _i18n = require("@edx/frontend-platform/i18n");
var _reactShare = require("react-share");
var _queryString = require("query-string");
var _paragon = require("@edx/paragon");
var _messages = _interopRequireDefault(require("./messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ShareTwitterIcon = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactShare.TwitterIcon, {
  round: true,
  iconFillColor: "#0A3055",
  bgStyle: {
    fill: '#fff'
  }
});
const ShareButton = _ref => {
  let {
    url
  } = _ref;
  const {
    formatMessage
  } = (0, _i18n.useIntl)();
  const twitterUrl = (0, _queryString.stringifyUrl)({
    url,
    query: {
      utm_source: 'twitter',
      utm_medium: 'social',
      utm_campaign: 'social-share-exp'
    }
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactShare.TwitterShareButton, {
    url: twitterUrl,
    title: formatMessage(_messages.default.shareQuote),
    resetButtonStyle: false,
    className: "px-1 ml-n1 btn-sm text-primary-500 btn btn-link",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
      src: ShareTwitterIcon
    }), formatMessage(_messages.default.shareButton)]
  });
};
ShareButton.propTypes = {
  url: _propTypes.PropTypes.string.isRequired
};
var _default = ShareButton;
exports.default = _default;
//# sourceMappingURL=ShareButton.js.map