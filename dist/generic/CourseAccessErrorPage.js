"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _frontendComponentHeader = require("@edx/frontend-component-header");
var _frontendComponentFooter = _interopRequireDefault(require("@edx/frontend-component-footer"));
var _reactRouterDom = require("react-router-dom");
var _reactRedux = require("react-redux");
var _reactRouter = require("react-router");
var _i18n = require("@edx/frontend-platform/i18n");
var _activeEntepriseAlert = _interopRequireDefault(require("../alerts/active-enteprise-alert"));
var _userMessages = require("./user-messages");
var _thunks = require("../course-home/data/thunks");
var _slice = require("../course-home/data/slice");
var _PageLoading = _interopRequireDefault(require("./PageLoading"));
var _messages = _interopRequireDefault(require("../tab-page/messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
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
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_frontendComponentFooter.default, {})]
    });
  }
  if (courseStatus === _slice.LOADED) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Redirect, {
      to: `/redirect/home/${courseId}`
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
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_frontendComponentFooter.default, {})]
  });
};
CourseAccessErrorPage.propTypes = {
  intl: _i18n.intlShape.isRequired
};
var _default = (0, _i18n.injectIntl)(CourseAccessErrorPage);
exports.default = _default;
//# sourceMappingURL=CourseAccessErrorPage.js.map