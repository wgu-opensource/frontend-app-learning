"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _paragon = require("@openedx/paragon");
var _icons = require("@openedx/paragon/icons");
var _reactRouterDom = require("react-router-dom");
var _frontendComponentHeader = _interopRequireDefault(require("@edx/frontend-component-header"));
var _frontendPlatform = require("@edx/frontend-platform");
var _analytics = require("@edx/frontend-platform/analytics");
var _logging = require("@edx/frontend-platform/logging");
var _i18n = require("@edx/frontend-platform/i18n");
var _constants = require("@src/constants");
var _PageLoading = _interopRequireDefault(require("../generic/PageLoading"));
var _api = require("./data/api");
var _messages = _interopRequireDefault(require("./messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const PreferencesUnsubscribe = () => {
  const intl = (0, _i18n.useIntl)();
  const {
    userToken
  } = (0, _reactRouterDom.useParams)();
  const [status, setStatus] = (0, _react.useState)(_constants.LOADING);
  (0, _react.useEffect)(() => {
    (0, _api.unsubscribeNotificationPreferences)(userToken).then(() => setStatus(_constants.LOADED), error => {
      setStatus(_constants.FAILED);
      (0, _logging.logError)(error);
    });
    (0, _analytics.sendTrackEvent)('edx.ui.lms.notifications.preferences.unsubscribe', {
      userToken
    });
  }, []);
  const pageContent = {
    icon: _icons.CheckCircleLightOutline,
    iconClass: 'text-success',
    headingText: _messages.default.unsubscribeSuccessHeading,
    bodyText: _messages.default.unsubscribeSuccessMessage
  };
  if (status === _constants.FAILED) {
    pageContent.icon = _icons.ErrorOutline;
    pageContent.iconClass = 'text-danger';
    pageContent.headingText = _messages.default.unsubscribeFailedHeading;
    pageContent.bodyText = _messages.default.unsubscribeFailedMessage;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: {
      height: '100vh'
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_frontendComponentHeader.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Container, {
      size: "xs",
      className: "h-75 mx-auto my-auto",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "d-flex flex-row h-100",
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "mx-auto my-auto",
          children: [status === _constants.LOADING && /*#__PURE__*/(0, _jsxRuntime.jsx)(_PageLoading.default, {
            srMessage: `${intl.formatMessage(_messages.default.unsubscribeLoading)}`
          }), status !== _constants.LOADING && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
              src: pageContent.icon,
              className: `size-56px mx-auto ${pageContent.iconClass}`
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
              className: "font-weight-bold text-primary-500 text-center my-3",
              "data-testid": "heading-text",
              children: intl.formatMessage(pageContent.headingText)
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              className: "font-weight-normal text-gray-700 text-center",
              children: intl.formatMessage(pageContent.bodyText)
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("small", {
              className: "d-block font-weight-normal text-gray text-center mt-3",
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
                id: "learning.notification.preferences.unsubscribe.preferenceCenterUrl",
                description: "Shown as a suggestion or recommendation for learner when their unsubscribing request has failed",
                defaultMessage: "Go to the {preferenceCenterUrl} to set your preferences",
                values: {
                  preferenceCenterUrl: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Hyperlink, {
                    destination: `${(0, _frontendPlatform.getConfig)().ACCOUNT_SETTINGS_URL}/#notifications`,
                    children: intl.formatMessage(_messages.default.preferenceCenterUrl)
                  })
                }
              })
            })]
          })]
        })
      })
    })]
  });
};
var _default = exports.default = PreferencesUnsubscribe;
//# sourceMappingURL=index.js.map