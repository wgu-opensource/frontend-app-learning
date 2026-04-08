"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@openedx/paragon");
var _icons = require("@openedx/paragon/icons");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const DAY_SEC = 24 * 60 * 60; // in seconds
const DAY_MS = DAY_SEC * 1000; // in ms
const YEAR_SEC = 365 * DAY_SEC; // in seconds

const CourseEndAlert = ({
  payload
}) => {
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
var _default = exports.default = CourseEndAlert;
//# sourceMappingURL=CourseEndAlert.js.map