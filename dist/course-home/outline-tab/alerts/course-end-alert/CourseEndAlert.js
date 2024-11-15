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
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const DAY_SEC = 24 * 60 * 60; // in seconds
const DAY_MS = DAY_SEC * 1000; // in ms
const YEAR_SEC = 365 * DAY_SEC; // in seconds

const CourseEndAlert = _ref => {
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
  let msg;
  const delta = new Date(endDate) - new Date();
  const timeRemaining = /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedRelativeTime, _objectSpread({
    value: delta / 1000,
    numeric: "auto"
    // 1 year interval to help auto format. It won't format without updateIntervalInSeconds.
    ,
    updateIntervalInSeconds: YEAR_SEC
  }, timezoneFormatArgs), "timeRemaining");
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
};
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