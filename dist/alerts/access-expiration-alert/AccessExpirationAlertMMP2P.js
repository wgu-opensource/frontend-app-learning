"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _i18n = require("@edx/frontend-platform/i18n");

var _paragon = require("@edx/paragon");

var _icons = require("@edx/paragon/icons");

var _messages = _interopRequireDefault(require("./messages"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function AccessExpirationAlertMMP2P(_ref) {
  let {
    payload
  } = _ref;
  const {
    accessExpiration,
    userTimezone
  } = payload;
  const timezoneFormatArgs = userTimezone ? {
    timeZone: userTimezone
  } : {};

  if (!accessExpiration) {
    return null;
  }

  const {
    expirationDate,
    upgradeDeadline,
    upgradeUrl
  } = accessExpiration;
  let deadlineMessage = null;

  const formatDate = (val, key) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedDate, _objectSpread({
    day: "numeric",
    month: "short",
    year: "numeric",
    value: val
  }, timezoneFormatArgs), `accessExpiration.${key}`);

  if (upgradeDeadline && upgradeUrl) {
    deadlineMessage = /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: ["Upgrade by ", formatDate(upgradeDeadline, 'upgradeDesc'), " to unlock unlimited access to all course activities, including graded assignments. \xA0", /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Hyperlink, {
        className: "font-weight-bold",
        style: {
          textDecoration: 'underline'
        },
        destination: upgradeUrl,
        children: _messages.default.upgradeNow.defaultMessage
      })]
    });
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Alert, {
    variant: "info",
    icon: _icons.Info,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
      className: "font-weight-bold",
      children: ["Unlock full course content by ", formatDate(upgradeDeadline, 'upgradeTitle')]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("br", {}), deadlineMessage, /*#__PURE__*/(0, _jsxRuntime.jsx)("br", {}), "You lose all access to the first two weeks of scheduled content on ", formatDate(expirationDate, 'expirationBody'), "."]
  });
}

AccessExpirationAlertMMP2P.propTypes = {
  payload: _propTypes.default.shape({
    accessExpiration: _propTypes.default.shape({
      expirationDate: _propTypes.default.string.isRequired,
      masqueradingExpiredCourse: _propTypes.default.bool.isRequired,
      upgradeDeadline: _propTypes.default.string,
      upgradeUrl: _propTypes.default.string
    }).isRequired,
    userTimezone: _propTypes.default.string.isRequired
  }).isRequired
};

var _default = (0, _i18n.injectIntl)(AccessExpirationAlertMMP2P);

exports.default = _default;
//# sourceMappingURL=AccessExpirationAlertMMP2P.js.map