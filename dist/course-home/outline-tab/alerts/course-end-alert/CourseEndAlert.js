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

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const DAY_MS = 24 * 60 * 60 * 1000; // in ms

function CourseEndAlert(_ref) {
  let {
    payload
  } = _ref;
  const {
    description,
    endDate,
    userTimezone
  } = payload;
  const timezoneFormatArgs = userTimezone ? {
    timeZone: userTimezone
  } : {};
  const timeRemaining = /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedRelativeTime, _objectSpread({
    value: endDate
  }, timezoneFormatArgs), "timeRemaining");
  let msg;
  const delta = new Date(endDate) - new Date();

  if (delta < DAY_MS) {
    const courseEndTime = /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedTime, _objectSpread({
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZoneName: "short",
      value: endDate
    }, timezoneFormatArgs), "courseEndTime");
    msg = /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
      id: "learning.outline.alert.end.short",
      defaultMessage: "This course is ending {timeRemaining} at {courseEndTime}.",
      description: "Used when the time remaining is less than a day away.",
      values: {
        courseEndTime,
        timeRemaining
      }
    });
  } else {
    const courseEndDate = /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedDate, _objectSpread({
      day: "numeric",
      month: "short",
      year: "numeric",
      value: endDate
    }, timezoneFormatArgs), "courseEndDate");
    msg = /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
      id: "learning.outline.alert.end.long",
      defaultMessage: "This course is ending {timeRemaining} on {courseEndDate}.",
      description: "Used when the time remaining is more than a day away.",
      values: {
        courseEndDate,
        timeRemaining
      }
    });
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Alert, {
    variant: "info",
    icon: _icons.Info,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("strong", {
      children: msg
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("br", {}), description]
  });
}

CourseEndAlert.propTypes = {
  payload: _propTypes.default.shape({
    description: _propTypes.default.string,
    endDate: _propTypes.default.string,
    userTimezone: _propTypes.default.string
  }).isRequired
};
var _default = CourseEndAlert;
exports.default = _default;
//# sourceMappingURL=CourseEndAlert.js.map