"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _i18n = require("@edx/frontend-platform/i18n");

var _paragon = require("@edx/paragon");

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function AccessExpirationMasqueradeBanner(_ref) {
  let {
    payload
  } = _ref;
  const {
    expirationDate,
    userTimezone
  } = payload;
  const timezoneFormatArgs = userTimezone ? {
    timeZone: userTimezone
  } : {};
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.PageBanner, {
    variant: "warning",
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
      id: "instructorToolbar.pageBanner.courseHasExpired",
      defaultMessage: "This learner no longer has access to this course. Their access expired on {date}.",
      description: "It's a warning that is shown to course author when being masqueraded as learner, while the course has expired for the real learner.",
      values: {
        date: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedDate, _objectSpread({
          value: expirationDate
        }, timezoneFormatArgs), "instructorToolbar.pageBanner.accessExpirationDate")
      }
    })
  });
}

AccessExpirationMasqueradeBanner.propTypes = {
  payload: _propTypes.default.shape({
    expirationDate: _propTypes.default.string.isRequired,
    userTimezone: _propTypes.default.string.isRequired
  }).isRequired
};
var _default = AccessExpirationMasqueradeBanner;
exports.default = _default;
//# sourceMappingURL=AccessExpirationMasqueradeBanner.js.map