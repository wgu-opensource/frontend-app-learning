"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _frontendComponentHeader = require("@edx/frontend-component-header");
var _reactRouterDom = require("react-router-dom");
var _reactRedux = require("react-redux");
var _i18n = require("@edx/frontend-platform/i18n");
var _frontendSlotFooter = _interopRequireDefault(require("@openedx/frontend-slot-footer"));
var _activeEntepriseAlert = _interopRequireDefault(require("../alerts/active-enteprise-alert"));
var _userMessages = require("./user-messages");
var _thunks = require("../course-home/data/thunks");
var _slice = require("../course-home/data/slice");
var _PageLoading = _interopRequireDefault(require("./PageLoading"));
var _messages = _interopRequireDefault(require("../tab-page/messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const CourseAccessErrorPage = _ref => {
  let {
    intl
  } = _ref;
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
  if (courseStatus === _slice.LOADING) {
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_frontendComponentHeader.LearningHeader, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_PageLoading.default, {
        srMessage: intl.formatMessage(_messages.default.loading)
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_frontendSlotFooter.default, {})]
    });
  }
  if (courseStatus === _slice.LOADED) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Navigate, {
      to: `/redirect/home/${courseId}`,
      replace: true
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_frontendComponentHeader.LearningHeader, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)("main", {
      id: "main-content",
      className: "container my-5 text-center",
      "data-testid": "access-denied-main",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_userMessages.AlertList, {
        topic: "outline",
        className: "mx-5 mt-3",
        customAlerts: _objectSpread({}, activeEnterpriseAlert)
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_frontendSlotFooter.default, {})]
  });
};
CourseAccessErrorPage.propTypes = {
  intl: _i18n.intlShape.isRequired
};
var _default = exports.default = (0, _i18n.injectIntl)(CourseAccessErrorPage);
//# sourceMappingURL=CourseAccessErrorPage.js.map