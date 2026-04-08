"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _paragon = require("@openedx/paragon");
var _i18n = require("@edx/frontend-platform/i18n");
var _reactRedux = require("react-redux");
var _analytics = require("@edx/frontend-platform/analytics");
var _messages = _interopRequireDefault(require("../messages"));
var _modelStore = require("../../../generic/model-store");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const StartOrResumeCourseCard = () => {
  const intl = (0, _i18n.useIntl)();
  const {
    courseId
  } = (0, _reactRedux.useSelector)(state => state.courseHome);
  const {
    org
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const eventProperties = {
    org_key: org,
    courserun_key: courseId
  };
  const {
    resumeCourse: {
      hasVisitedCourse,
      url: resumeCourseUrl
    }
  } = (0, _modelStore.useModel)('outline', courseId);
  if (!resumeCourseUrl) {
    return null;
  }
  const logResumeCourseClick = () => {
    (0, _analytics.sendTrackingLogEvent)('edx.course.home.resume_course.clicked', _objectSpread(_objectSpread({}, eventProperties), {}, {
      event_type: hasVisitedCourse ? 'resume' : 'start',
      url: resumeCourseUrl
    }));
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Card, {
    className: "mb-3 raised-card",
    "data-testid": "start-resume-card",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Card.Header, {
      title: hasVisitedCourse ? intl.formatMessage(_messages.default.resumeBlurb) : intl.formatMessage(_messages.default.startBlurb),
      actions: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
        variant: "brand",
        block: true,
        href: resumeCourseUrl,
        onClick: () => logResumeCourseClick(),
        children: hasVisitedCourse ? intl.formatMessage(_messages.default.resume) : intl.formatMessage(_messages.default.start)
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Card.Footer, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {})
    })]
  });
};
var _default = exports.default = StartOrResumeCourseCard;
//# sourceMappingURL=StartOrResumeCourseCard.js.map