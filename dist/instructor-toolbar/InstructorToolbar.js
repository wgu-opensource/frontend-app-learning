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
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
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
var _default = InstructorToolbar;
exports.default = _default;
//# sourceMappingURL=InstructorToolbar.js.map