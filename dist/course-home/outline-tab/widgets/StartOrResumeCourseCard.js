"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _paragon = require("@edx/paragon");
var _i18n = require("@edx/frontend-platform/i18n");
var _reactRedux = require("react-redux");
var _analytics = require("@edx/frontend-platform/analytics");
var _messages = _interopRequireDefault(require("../messages"));
var _modelStore = require("../../../generic/model-store");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const StartOrResumeCourseCard = _ref => {
  let {
    intl
  } = _ref;
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
StartOrResumeCourseCard.propTypes = {
  intl: _i18n.intlShape.isRequired
};
var _default = (0, _i18n.injectIntl)(StartOrResumeCourseCard);
exports.default = _default;
//# sourceMappingURL=StartOrResumeCourseCard.js.map