"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _frontendPlatform = require("@edx/frontend-platform");

var _i18n = require("@edx/frontend-platform/i18n");

var _auth = require("@edx/frontend-platform/auth");

var _paragon = require("@edx/paragon");

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _faSpinner = require("@fortawesome/free-solid-svg-icons/faSpinner");

var _messages = _interopRequireDefault(require("../../../../alerts/enrollment-alert/messages"));

var _messages2 = _interopRequireDefault(require("../../../../generic/messages"));

var _messages3 = _interopRequireDefault(require("./messages"));

var _messages4 = _interopRequireDefault(require("../../messages"));

var _clickHook = _interopRequireDefault(require("../../../../alerts/enrollment-alert/clickHook"));

var _modelStore = require("../../../../generic/model-store");

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PrivateCourseAlert(_ref) {
  let {
    intl,
    payload
  } = _ref;
  const {
    anonymousUser,
    canEnroll,
    courseId
  } = payload;
  const {
    org,
    title
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const {
    enrollClickHandler,
    loading
  } = (0, _clickHook.default)(courseId, org, intl.formatMessage(_messages.default.success));
  const enrollNowButton = /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
    disabled: loading,
    variant: "link",
    className: "p-0 border-0 align-top mr-1",
    style: {
      textDecoration: 'underline'
    },
    size: "sm",
    onClick: enrollClickHandler,
    children: intl.formatMessage(_messages.default.enrollNowInline)
  });
  const register = /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Hyperlink, {
    style: {
      textDecoration: 'underline'
    },
    destination: `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/register?next=${encodeURIComponent(global.location.href)}`,
    children: intl.formatMessage(_messages2.default.registerLowercase)
  });
  const signIn = /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Hyperlink, {
    style: {
      textDecoration: 'underline'
    },
    destination: `${(0, _auth.getLoginRedirectUrl)(global.location.href)}`,
    children: intl.formatMessage(_messages2.default.signInSentenceCase)
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Alert, {
    variant: "light",
    "data-testid": "private-course-alert",
    children: [anonymousUser && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        className: "font-weight-bold",
        children: intl.formatMessage(_messages.default.alert)
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
        id: "learning.privateCourse.signInOrRegister",
        description: "Prompts the user to sign in or register to see course content.",
        defaultMessage: "{signIn} or {register} and then enroll in this course.",
        values: {
          signIn,
          register
        }
      })]
    }), !anonymousUser && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
        className: "font-weight-bold",
        children: [intl.formatMessage(_messages4.default.welcomeTo), " ", title]
      }), canEnroll && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "d-flex",
        children: [enrollNowButton, intl.formatMessage(_messages3.default.toAccess), loading && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
          icon: _faSpinner.faSpinner,
          spin: true
        })]
      }), !canEnroll && /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
        children: intl.formatMessage(_messages.default.alert)
      })]
    })]
  });
}

PrivateCourseAlert.propTypes = {
  intl: _i18n.intlShape.isRequired,
  payload: _propTypes.default.shape({
    anonymousUser: _propTypes.default.bool,
    canEnroll: _propTypes.default.bool,
    courseId: _propTypes.default.string
  }).isRequired
};

var _default = (0, _i18n.injectIntl)(PrivateCourseAlert);

exports.default = _default;
//# sourceMappingURL=PrivateCourseAlert.js.map