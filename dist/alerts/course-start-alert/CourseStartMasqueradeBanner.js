"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _i18n = require("@edx/frontend-platform/i18n");

var _paragon = require("@edx/paragon");

var _modelStore = require("../../generic/model-store");

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function CourseStartMasqueradeBanner(_ref) {
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
}

CourseStartMasqueradeBanner.propTypes = {
  payload: _propTypes.default.shape({
    courseId: _propTypes.default.string.isRequired
  }).isRequired
};
var _default = CourseStartMasqueradeBanner;
exports.default = _default;
//# sourceMappingURL=CourseStartMasqueradeBanner.js.map