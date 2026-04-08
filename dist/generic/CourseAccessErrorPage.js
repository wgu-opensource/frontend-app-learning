"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _reactRedux = require("react-redux");
var _i18n = require("@edx/frontend-platform/i18n");
var _frontendComponentFooter = require("@edx/frontend-component-footer");
var _constants = require("@src/constants");
var _HeaderSlot = _interopRequireDefault(require("../plugin-slots/HeaderSlot"));
var _activeEntepriseAlert = _interopRequireDefault(require("../alerts/active-enteprise-alert"));
var _userMessages = require("./user-messages");
var _thunks = require("../course-home/data/thunks");
var _PageLoading = _interopRequireDefault(require("./PageLoading"));
var _messages = _interopRequireDefault(require("../tab-page/messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const CourseAccessErrorPage = () => {
  const intl = (0, _i18n.useIntl)();
  const {
    courseId
  } = (0, _reactRouterDom.useParams)();
  const dispatch = (0, _reactRedux.useDispatch)();
  const activeEnterpriseAlert = (0, _activeEntepriseAlert.default)(courseId);
  (0, _react.useEffect)(() => {
    dispatch((0, _thunks.fetchDiscussionTab)(courseId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);
  const {
    courseStatus
  } = (0, _reactRedux.useSelector)(state => state.courseHome);
  if (courseStatus === _constants.LOADING) {
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_HeaderSlot.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_PageLoading.default, {
        srMessage: intl.formatMessage(_messages.default.loading)
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_frontendComponentFooter.FooterSlot, {})]
    });
  }
  if (courseStatus === _constants.LOADED) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Navigate, {
      to: `/redirect/home/${courseId}`,
      replace: true
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_HeaderSlot.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)("main", {
      id: "main-content",
      className: "container my-5 text-center",
      "data-testid": "access-denied-main",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_userMessages.AlertList, {
        topic: "outline",
        className: "mx-5 mt-3",
        customAlerts: _objectSpread({}, activeEnterpriseAlert)
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_frontendComponentFooter.FooterSlot, {})]
  });
};
var _default = exports.default = CourseAccessErrorPage;
//# sourceMappingURL=CourseAccessErrorPage.js.map