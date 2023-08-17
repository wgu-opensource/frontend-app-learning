"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _i18n = require("@edx/frontend-platform/i18n");

var _reactRedux = require("react-redux");

var _reactRouter = require("react-router");

var _frontendComponentFooter = _interopRequireDefault(require("@edx/frontend-component-footer"));

var _paragon = require("@edx/paragon");

var _frontendComponentHeader = require("@edx/frontend-component-header");

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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function TabPage(_ref) {
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

  if (courseStatus === 'loading') {
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_frontendComponentHeader.LearningHeader, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_PageLoading.default, {
        srMessage: intl.formatMessage(_messages2.default.loading)
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_frontendComponentFooter.default, {})]
    });
  }

  if (courseStatus === 'denied') {
    const redirectUrl = (0, _access.getAccessDeniedRedirectUrl)(courseId, activeTabSlug, courseAccess, start);

    if (redirectUrl) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Redirect, {
        to: redirectUrl
      });
    }
  } // Either a success state or a denied state that wasn't redirected above (some tabs handle denied states themselves,
  // like the outline tab handling unenrolled learners)


  if (courseStatus === 'loaded' || courseStatus === 'denied') {
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
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
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_frontendComponentHeader.LearningHeader, {
        courseOrg: org,
        courseNumber: number,
        courseTitle: title
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LoadedTabPage.default, _objectSpread({}, props)), /*#__PURE__*/(0, _jsxRuntime.jsx)(_frontendComponentFooter.default, {})]
    });
  } // courseStatus 'failed' and any other unexpected course status.


  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_frontendComponentHeader.LearningHeader, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      className: "text-center py-5 mx-auto",
      style: {
        maxWidth: '30em'
      },
      children: intl.formatMessage(_messages2.default.failure)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_frontendComponentFooter.default, {})]
  });
}

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

var _default = (0, _i18n.injectIntl)(TabPage);

exports.default = _default;
//# sourceMappingURL=TabPage.js.map