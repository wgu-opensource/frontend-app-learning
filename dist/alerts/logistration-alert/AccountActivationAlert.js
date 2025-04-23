"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _jsCookie = _interopRequireDefault(require("js-cookie"));
var _frontendPlatform = require("@edx/frontend-platform");
var _auth = require("@edx/frontend-platform/auth");
var _paragon = require("@openedx/paragon");
var _icons = require("@openedx/paragon/icons");
var _i18n = require("@edx/frontend-platform/i18n");
var _data = require("../../courseware/data");
var _messages = _interopRequireDefault(require("./messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const AccountActivationAlert = _ref => {
  let {
    intl
  } = _ref;
  const [showModal, setShowModal] = (0, _react.useState)(false);
  const [showSpinner, setShowSpinner] = (0, _react.useState)(false);
  const [showCheck, setShowCheck] = (0, _react.useState)(false);
  const handleOnClick = () => {
    setShowSpinner(true);
    setShowCheck(false);
    (0, _data.sendActivationEmail)().then(() => {
      setShowSpinner(false);
      setShowCheck(true);
    });
  };
  const showAccountActivationAlert = _jsCookie.default.get('show-account-activation-popup');
  if (showAccountActivationAlert !== undefined) {
    _jsCookie.default.remove('show-account-activation-popup', {
      path: '/',
      domain: process.env.SESSION_COOKIE_DOMAIN
    });
    // extra check to make sure cookie was removed before updating the state. Updating the state without removal
    // of cookie would make it infinite rendering
    if (_jsCookie.default.get('show-account-activation-popup') === undefined) {
      setShowModal(true);
    }
  }
  const button = /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Button, {
    variant: "primary",
    className: "",
    onClick: () => setShowModal(false),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
      id: "account-activation.alert.button",
      defaultMessage: "Continue to {siteName}",
      description: "account activation alert continue button",
      values: {
        siteName: (0, _frontendPlatform.getConfig)().SITE_NAME
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
      src: _icons.ArrowForward,
      className: "ml-1 d-inline-block align-bottom"
    })]
  });
  const children = () => {
    let bodyContent;
    const message = /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
      id: "account-activation.alert.message",
      defaultMessage: "We sent an email to {boldEmail} with a link to activate your account. Can\u2019t find it? Check your spam folder or {sendEmailTag}.",
      description: "Message for account activation alert which is shown after the registration",
      values: {
        boldEmail: /*#__PURE__*/(0, _jsxRuntime.jsx)("b", {
          children: (0, _auth.getAuthenticatedUser)() && (0, _auth.getAuthenticatedUser)().email
        }),
        sendEmailTag:
        /*#__PURE__*/
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        (0, _jsxRuntime.jsx)("a", {
          href: "#",
          role: "button",
          onClick: handleOnClick,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
            id: "account-activation.resend.link",
            defaultMessage: "resend the email",
            description: "Message for resend link in account activation alert which is shown after the registration"
          })
        })
      }
    });
    bodyContent = /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      children: message
    });
    if (!showCheck && showSpinner) {
      bodyContent = /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        children: [message, /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Spinner, {
          animation: "border",
          variant: "secondary",
          style: {
            height: '1.5rem',
            width: '1.5rem'
          }
        })]
      });
    }
    if (showCheck && !showSpinner) {
      bodyContent = /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        children: [message, /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
          src: _icons.Check,
          style: {
            height: '1.7rem',
            width: '1.25rem'
          },
          className: "text-success-500 d-inline-block position-fixed"
        })]
      });
    }
    return bodyContent;
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.AlertModal, {
    isOpen: showModal,
    title: intl.formatMessage(_messages.default.accountActivationAlertTitle),
    footerNode: button,
    onClose: () => ({}),
    children: children()
  });
};
AccountActivationAlert.propTypes = {
  intl: _i18n.intlShape.isRequired
};
var _default = exports.default = (0, _i18n.injectIntl)(AccountActivationAlert);
//# sourceMappingURL=AccountActivationAlert.js.map