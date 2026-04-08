"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _analytics = require("@edx/frontend-platform/analytics");
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@openedx/paragon");
var _icons = require("@openedx/paragon/icons");
var _messages = _interopRequireDefault(require("./messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const AccessExpirationAlert = ({
  payload
}) => {
  const intl = (0, _i18n.useIntl)();
  const {
    accessExpiration,
    courseId,
    org,
    userTimezone,
    analyticsPageName
  } = payload;
  const timezoneFormatArgs = userTimezone ? {
    timeZone: userTimezone
  } : {};
  if (!accessExpiration) {
    return null;
  }
  const {
    expirationDate,
    upgradeDeadline,
    upgradeUrl
  } = accessExpiration;
  const logClick = () => {
    (0, _analytics.sendTrackEvent)('edx.bi.ecommerce.upsell_links_clicked', {
      org_key: org,
      courserun_key: courseId,
      linkCategory: 'FBE_banner',
      linkName: `${analyticsPageName}_audit_access_expires`,
      linkType: 'link',
      pageName: analyticsPageName
    });
  };
  let deadlineMessage = null;
  if (upgradeDeadline && upgradeUrl) {
    deadlineMessage = /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("br", {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
        id: "learning.accessExpiration.deadline",
        defaultMessage: "Upgrade by {date} to get unlimited access to the course as long as it exists on the site.",
        description: "Warning shown to learner to upgrade while they are enrolled on the audit version and it's possible to upgrade",
        values: {
          date: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedDate, _objectSpread({
            day: "numeric",
            month: "short",
            year: "numeric",
            value: upgradeDeadline
          }, timezoneFormatArgs), "accessExpirationUpgradeDeadline")
        }
      }), "\xA0", /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Hyperlink, {
        className: "font-weight-bold",
        style: {
          textDecoration: 'underline'
        },
        destination: upgradeUrl,
        onClick: logClick,
        children: intl.formatMessage(_messages.default.upgradeNow)
      })]
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Alert, {
    variant: "info",
    icon: _icons.Info,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: "font-weight-bold",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
        id: "learning.accessExpiration.header",
        defaultMessage: "Audit Access Expires {date}",
        description: "Headline for auditing deadline",
        values: {
          date: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedDate, _objectSpread({
            day: "numeric",
            month: "short",
            year: "numeric",
            value: expirationDate
          }, timezoneFormatArgs), "accessExpirationHeaderDate")
        }
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("br", {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
      id: "learning.accessExpiration.body",
      defaultMessage: "You lose all access to this course, including your progress, on {date}.",
      description: "Message body to tell learner the consequences of course expiration.",
      values: {
        date: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedDate, _objectSpread({
          day: "numeric",
          month: "short",
          year: "numeric",
          value: expirationDate
        }, timezoneFormatArgs), "accessExpirationBodyDate")
      }
    }), deadlineMessage]
  });
};
AccessExpirationAlert.propTypes = {
  payload: _propTypes.default.shape({
    accessExpiration: _propTypes.default.shape({
      expirationDate: _propTypes.default.string.isRequired,
      masqueradingExpiredCourse: _propTypes.default.bool.isRequired,
      upgradeDeadline: _propTypes.default.string,
      upgradeUrl: _propTypes.default.string
    }).isRequired,
    courseId: _propTypes.default.string.isRequired,
    org: _propTypes.default.string.isRequired,
    userTimezone: _propTypes.default.string.isRequired,
    analyticsPageName: _propTypes.default.string.isRequired
  }).isRequired
};
var _default = exports.default = AccessExpirationAlert;
//# sourceMappingURL=AccessExpirationAlert.js.map