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

var _modelStore = require("../../generic/model-store");

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const DAY_SEC = 24 * 60 * 60; // in seconds

const DAY_MS = DAY_SEC * 1000; // in ms

const YEAR_SEC = 365 * DAY_SEC; // in seconds

function CourseStartAlert(_ref) {
  let {
    payload
  } = _ref;
  const {
    courseId
  } = payload;
  const {
    start: startDate,
    userTimezone
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const timezoneFormatArgs = userTimezone ? {
    timeZone: userTimezone
  } : {};
  const delta = new Date(startDate) - new Date();
  const timeRemaining = /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedRelativeTime, _objectSpread({
    value: delta / 1000,
    numeric: "auto" // 1 year interval to help auto format. It won't format without updateIntervalInSeconds.
    ,
    updateIntervalInSeconds: YEAR_SEC
  }, timezoneFormatArgs), "timeRemaining");

  if (delta < DAY_MS) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Alert, {
      variant: "info",
      icon: _icons.Info,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
        id: "learning.outline.alert.start.short",
        defaultMessage: "Course starts {timeRemaining} at {courseStartTime}.",
        description: "Used when the time remaining is less than a day away.",
        values: {
          courseStartTime: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedTime, _objectSpread({
            day: "numeric",
            month: "short",
            year: "numeric",
            timeZoneName: "short",
            value: startDate
          }, timezoneFormatArgs), "courseStartTime"),
          timeRemaining
        }
      })
    });
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Alert, {
    variant: "info",
    icon: _icons.Info,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("strong", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
        id: "learning.outline.alert.end.long",
        defaultMessage: "Course starts {timeRemaining} on {courseStartDate}.",
        description: "Used when the time remaining is more than a day away.",
        values: {
          courseStartDate: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedDate, _objectSpread({
            day: "numeric",
            month: "short",
            year: "numeric",
            value: startDate
          }, timezoneFormatArgs), "courseStartDate"),
          timeRemaining
        }
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("br", {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
      id: "learning.outline.alert.end.calendar",
      defaultMessage: "Don\u2019t forget to add a calendar reminder!",
      description: "It's just a recommendation for learners to set a reminder for the course starting date and is shown when the course starting date is more than a day. "
    })]
  });
}

CourseStartAlert.propTypes = {
  payload: _propTypes.default.shape({
    courseId: _propTypes.default.string
  }).isRequired
};
var _default = CourseStartAlert;
exports.default = _default;
//# sourceMappingURL=CourseStartAlert.js.map