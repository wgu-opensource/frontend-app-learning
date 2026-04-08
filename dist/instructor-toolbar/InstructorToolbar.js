"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _frontendPlatform = require("@edx/frontend-platform");
var _i18n = require("@edx/frontend-platform/i18n");
var _userMessages = require("../generic/user-messages");
var _Alert = _interopRequireDefault(require("../generic/user-messages/Alert"));
var _masqueradeWidget = _interopRequireDefault(require("./masquerade-widget"));
var _messages = _interopRequireDefault(require("./messages"));
var _accessExpirationAlert = require("../alerts/access-expiration-alert");
var _courseStartAlert = require("../alerts/course-start-alert");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function getInsightsUrl(courseId) {
  const urlBase = (0, _frontendPlatform.getConfig)().INSIGHTS_BASE_URL;
  let urlFull;
  if (urlBase) {
    urlFull = `${urlBase}/courses`;
    // This shouldn't actually be missing, at present,
    // but we're providing a reasonable fallback,
    // in case of either error or extension.
    if (courseId) {
      urlFull += `/${courseId}`;
    }
  }
  return urlFull;
}
function getStudioUrl(courseId, unitId) {
  const urlBase = (0, _frontendPlatform.getConfig)().STUDIO_BASE_URL;
  let urlFull;
  if (urlBase) {
    if (unitId) {
      urlFull = `${urlBase}/container/${unitId}`;
    } else if (courseId) {
      urlFull = `${urlBase}/course/${courseId}`;
    }
  }
  return urlFull;
}
const InstructorToolbar = props => {
  // This didMount logic became necessary once we had a page that does a redirect on a quick exit.
  // As a result, it unmounts the InstructorToolbar (which will be remounted by the new component),
  // but the InstructorToolbar's MasqueradeWidget has an outgoing request. Since it is unmounted
  // during that time, it raises an error about a potential memory leak. By stopping the render
  // when the InstructorToolbar is unmounted, we avoid the memory leak.
  // NOTE: This was originally added because of the CourseExit page redirect. Once that page stops
  //   doing a redirect because a CourseExit experience exists for all learners, this could be removed
  const [didMount, setDidMount] = (0, _react.useState)(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  (0, _react.useEffect)(() => {
    setDidMount(true);
    // Returning this function here will run setDidMount(false) when this component is unmounted
    return () => setDidMount(false);
  });
  const {
    courseId,
    unitId,
    isStudioButtonVisible,
    tab
  } = props;
  const urlInsights = getInsightsUrl(courseId);
  const urlStudio = getStudioUrl(courseId, unitId);
  const [masqueradeErrorMessage, showMasqueradeError] = (0, _react.useState)(null);
  const {
    formatMessage
  } = (0, _i18n.useIntl)();
  const accessExpirationMasqueradeBanner = (0, _accessExpirationAlert.useAccessExpirationMasqueradeBanner)(courseId, tab);
  const courseStartDateMasqueradeBanner = (0, _courseStartAlert.useCourseStartMasqueradeBanner)(courseId, tab);
  return !didMount ? null : /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    "data-testid": "instructor-toolbar",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "bg-primary text-white",
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "container-xl py-3 d-md-flex justify-content-end align-items-start",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "align-items-center flex-grow-1 d-md-flex mx-1 my-1",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_masqueradeWidget.default, {
            courseId: courseId,
            onError: showMasqueradeError
          })
        }), (urlStudio && isStudioButtonVisible || urlInsights) && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("hr", {
            className: "border-light"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            className: "mr-2 mt-1 col-form-label",
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.titleViewCourseIn))
          })]
        }), urlStudio && isStudioButtonVisible && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          className: "mx-1 my-1",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
            className: "btn btn-inverse-outline-primary",
            href: urlStudio,
            children: formatMessage(_messages.default.titleStudio)
          })
        }), urlInsights && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          className: "mx-1 my-1",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
            className: "btn btn-inverse-outline-primary",
            href: urlInsights,
            children: formatMessage(_messages.default.titleInsights)
          })
        })]
      })
    }), masqueradeErrorMessage && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "container-xl mt-3",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Alert.default, {
        type: _userMessages.ALERT_TYPES.ERROR,
        dismissible: false,
        children: masqueradeErrorMessage
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_userMessages.AlertList, {
      topic: "instructor-toolbar-alerts",
      customAlerts: _objectSpread(_objectSpread({}, accessExpirationMasqueradeBanner), courseStartDateMasqueradeBanner)
    })]
  });
};
InstructorToolbar.propTypes = {
  courseId: _propTypes.default.string,
  unitId: _propTypes.default.string,
  isStudioButtonVisible: _propTypes.default.bool,
  tab: _propTypes.default.string
};
InstructorToolbar.defaultProps = {
  courseId: undefined,
  unitId: undefined,
  isStudioButtonVisible: true,
  tab: ''
};
var _default = exports.default = InstructorToolbar;
//# sourceMappingURL=InstructorToolbar.js.map