"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _frontendPlatform = require("@edx/frontend-platform");

var _i18n = require("@edx/frontend-platform/i18n");

var _auth = require("@edx/frontend-platform/auth");

var _paragon = require("@edx/paragon");

var _icons = require("@edx/paragon/icons");

var _messages = _interopRequireDefault(require("../../generic/messages"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function LogistrationAlert(_ref) {
  let {
    intl
  } = _ref;
  const signIn = /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Hyperlink, {
    style: {
      textDecoration: 'underline'
    },
    destination: `${(0, _auth.getLoginRedirectUrl)(global.location.href)}`,
    children: intl.formatMessage(_messages.default.signInLowercase)
  }); // TODO: Pull this registration URL building out into a function, like the login one above.
  // This is complicated by the fact that we don't have a REGISTER_URL env variable available.

  const register = /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Hyperlink, {
    style: {
      textDecoration: 'underline'
    },
    destination: `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/register?next=${encodeURIComponent(global.location.href)}`,
    children: intl.formatMessage(_messages.default.registerLowercase)
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Alert, {
    variant: "warning",
    icon: _icons.WarningFilled,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
      id: "learning.logistration.alert",
      description: "Prompts the user to sign in or register to see course content.",
      defaultMessage: "To see course content, {signIn} or {register}.",
      values: {
        signIn,
        register
      }
    })
  });
}

LogistrationAlert.propTypes = {
  intl: _i18n.intlShape.isRequired
};

var _default = (0, _i18n.injectIntl)(LogistrationAlert);

exports.default = _default;
//# sourceMappingURL=LogistrationAlert.js.map