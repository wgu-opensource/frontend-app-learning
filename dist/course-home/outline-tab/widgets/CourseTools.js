"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _analytics = require("@edx/frontend-platform/analytics");
var _auth = require("@edx/frontend-platform/auth");
var _i18n = require("@edx/frontend-platform/i18n");
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _faBookmark = require("@fortawesome/free-solid-svg-icons/faBookmark");
var _faCertificate = require("@fortawesome/free-solid-svg-icons/faCertificate");
var _faInfo = require("@fortawesome/free-solid-svg-icons/faInfo");
var _faCalendar = require("@fortawesome/free-solid-svg-icons/faCalendar");
var _faStar = require("@fortawesome/free-solid-svg-icons/faStar");
var _faNewspaper = require("@fortawesome/free-regular-svg-icons/faNewspaper");
var _messages = _interopRequireDefault(require("../messages"));
var _modelStore = require("../../../generic/model-store");
var _LaunchCourseHomeTourButton = _interopRequireDefault(require("../../../product-tours/newUserCourseHomeTour/LaunchCourseHomeTourButton"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const CourseTools = _ref => {
  let {
    intl
  } = _ref;
  const {
    courseId
  } = (0, _reactRedux.useSelector)(state => state.courseHome);
  const {
    org
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const {
    courseTools
  } = (0, _modelStore.useModel)('outline', courseId);
  if (courseTools.length === 0) {
    return null;
  }
  const eventProperties = {
    org_key: org,
    courserun_key: courseId
  };
  const logClick = analyticsId => {
    const {
      administrator
    } = (0, _auth.getAuthenticatedUser)();
    (0, _analytics.sendTrackingLogEvent)('edx.course.tool.accessed', _objectSpread(_objectSpread({}, eventProperties), {}, {
      course_id: courseId,
      // should only be courserun_key, but left as-is for historical reasons
      is_staff: administrator,
      tool_name: analyticsId
    }));
  };
  const renderIcon = iconClasses => {
    switch (iconClasses) {
      case 'edx.bookmarks':
        return _faBookmark.faBookmark;
      case 'edx.tool.verified_upgrade':
        return _faCertificate.faCertificate;
      case 'edx.tool.financial_assistance':
        return _faInfo.faInfo;
      case 'edx.calendar-sync':
        return _faCalendar.faCalendar;
      case 'edx.updates':
        return _faNewspaper.faNewspaper;
      case 'edx.reviews':
        return _faStar.faStar;
      default:
        return null;
    }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
    className: "mb-4",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
      className: "h4",
      children: intl.formatMessage(_messages.default.tools)
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("ul", {
      className: "list-unstyled",
      children: [courseTools.map(courseTool => /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
        className: "small",
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("a", {
          href: courseTool.url,
          onClick: () => logClick(courseTool.analyticsId),
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
            icon: renderIcon(courseTool.analyticsId),
            className: "mr-2",
            fixedWidth: true
          }), courseTool.title]
        })
      }, courseTool.analyticsId)), /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
        className: "small",
        id: "courseHome-launchTourLink",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_LaunchCourseHomeTourButton.default, {})
      })]
    })]
  });
};
CourseTools.propTypes = {
  intl: _i18n.intlShape.isRequired
};
var _default = exports.default = (0, _i18n.injectIntl)(CourseTools);
//# sourceMappingURL=CourseTools.js.map