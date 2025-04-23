"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@openedx/paragon");
var _modelStore = require("../../generic/model-store");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const CourseStartMasqueradeBanner = _ref => {
  let {
    payload
  } = _ref;
  const {
    courseId
  } = payload;
  const {
    start,
    userTimezone
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const timezoneFormatArgs = userTimezone ? {
    timeZone: userTimezone
  } : {};
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.PageBanner, {
    variant: "warning",
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
      id: "instructorToolbar.pageBanner.courseHasNotStarted",
      defaultMessage: "This learner does not yet have access to this course. The course starts on {date}.",
      description: "It's a warning that is shown to course author when being masqueraded as learner, while the course hasn't started for the real learner yet.",
      values: {
        date: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedDate, _objectSpread({
          value: start
        }, timezoneFormatArgs), "instructorToolbar.pageBanner.courseStartDate")
      }
    })
  });
};
CourseStartMasqueradeBanner.propTypes = {
  payload: _propTypes.default.shape({
    courseId: _propTypes.default.string.isRequired
  }).isRequired
};
var _default = exports.default = CourseStartMasqueradeBanner;
//# sourceMappingURL=CourseStartMasqueradeBanner.js.map