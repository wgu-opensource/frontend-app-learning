"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _reactRedux = require("react-redux");
var _reactRouterDom = require("react-router-dom");
var _paragon = require("@openedx/paragon");
var _frontendComponentHeader = require("@edx/frontend-component-header");
var _frontendSlotFooter = _interopRequireDefault(require("@openedx/frontend-slot-footer"));
var _PageLoading = _interopRequireDefault(require("../generic/PageLoading"));
var _access = require("../shared/access");
var _modelStore = require("../generic/model-store");
var _messages = _interopRequireDefault(require("../generic/messages"));
var _messages2 = _interopRequireDefault(require("./messages"));
var _LoadedTabPage = _interopRequireDefault(require("./LoadedTabPage"));
var _slice = require("../course-home/data/slice");
var _LaunchCourseHomeTourButton = _interopRequireDefault(require("../product-tours/newUserCourseHomeTour/LaunchCourseHomeTourButton"));
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["intl"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
const TabPage = _ref => {
  let {
      intl
    } = _ref,
    props = _objectWithoutProperties(_ref, _excluded);
  const {
    activeTabSlug,
    courseId,
    courseStatus,
    metadataModel
  } = props;
  const {
    toastBodyLink,
    toastBodyText,
    toastHeader
  } = (0, _reactRedux.useSelector)(state => state.courseHome);
  const dispatch = (0, _reactRedux.useDispatch)();
  const {
    courseAccess,
    number,
    org,
    start,
    title
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  if (courseStatus === 'denied') {
    const redirectUrl = (0, _access.getAccessDeniedRedirectUrl)(courseId, activeTabSlug, courseAccess, start);
    if (redirectUrl) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Navigate, {
        to: redirectUrl,
        replace: true
      });
    }
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [['loaded', 'denied'].includes(courseStatus) && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Toast, {
        action: toastBodyText ? {
          label: toastBodyText,
          href: toastBodyLink
        } : null,
        closeLabel: intl.formatMessage(_messages.default.close),
        onClose: () => dispatch((0, _slice.setCallToActionToast)({
          header: '',
          link: null,
          link_text: null
        })),
        show: !!toastHeader,
        children: toastHeader
      }), metadataModel === 'courseHomeMeta' && /*#__PURE__*/(0, _jsxRuntime.jsx)(_LaunchCourseHomeTourButton.default, {
        srOnly: true
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_frontendComponentHeader.LearningHeader, {
      courseOrg: org,
      courseNumber: number,
      courseTitle: title
    }), courseStatus === 'loading' && /*#__PURE__*/(0, _jsxRuntime.jsx)(_PageLoading.default, {
      srMessage: intl.formatMessage(_messages2.default.loading)
    }), ['loaded', 'denied'].includes(courseStatus) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_LoadedTabPage.default, _objectSpread({}, props)), !['loading', 'loaded', 'denied'].includes(courseStatus) && /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      className: "text-center py-5 mx-auto",
      style: {
        maxWidth: '30em'
      },
      children: intl.formatMessage(_messages2.default.failure)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_frontendSlotFooter.default, {})]
  });
};
TabPage.defaultProps = {
  courseId: null,
  unitId: null
};
TabPage.propTypes = {
  activeTabSlug: _propTypes.default.string.isRequired,
  intl: _i18n.intlShape.isRequired,
  courseId: _propTypes.default.string,
  courseStatus: _propTypes.default.string.isRequired,
  metadataModel: _propTypes.default.string.isRequired,
  unitId: _propTypes.default.string
};
var _default = exports.default = (0, _i18n.injectIntl)(TabPage);
//# sourceMappingURL=TabPage.js.map