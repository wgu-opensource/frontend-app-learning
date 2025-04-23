"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _frontendPlatform = require("@edx/frontend-platform");
var _userMessages = require("../generic/user-messages");
var _Alert = _interopRequireDefault(require("../generic/user-messages/Alert"));
var _masqueradeWidget = _interopRequireDefault(require("./masquerade-widget"));
var _accessExpirationAlert = require("../alerts/access-expiration-alert");
var _courseStartAlert = require("../alerts/course-start-alert");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
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
    tab
  } = props;
  const urlInsights = getInsightsUrl(courseId);
  const urlStudio = getStudioUrl(courseId, unitId);
  const [masqueradeErrorMessage, showMasqueradeError] = (0, _react.useState)(null);
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
        }), (urlStudio || urlInsights) && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("hr", {
            className: "border-light"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            className: "mr-2 mt-1 col-form-label",
            children: "View course in:"
          })]
        }), urlStudio && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          className: "mx-1 my-1",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
            className: "btn btn-inverse-outline-primary",
            href: urlStudio,
            children: "Studio"
          })
        }), urlInsights && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          className: "mx-1 my-1",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
            className: "btn btn-inverse-outline-primary",
            href: urlInsights,
            children: "Insights"
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
  tab: _propTypes.default.string
};
InstructorToolbar.defaultProps = {
  courseId: undefined,
  unitId: undefined,
  tab: ''
};
var _default = exports.default = InstructorToolbar;
//# sourceMappingURL=InstructorToolbar.js.map