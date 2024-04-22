"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _analytics = require("@edx/frontend-platform/analytics");
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@edx/paragon");
var _icons = require("@edx/paragon/icons");
var _messages = _interopRequireDefault(require("./messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const AccessExpirationAlert = _ref => {
  let {
    intl,
    payload
  } = _ref;
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
  intl: _i18n.intlShape.isRequired,
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
var _default = (0, _i18n.injectIntl)(AccessExpirationAlert);
exports.default = _default;
//# sourceMappingURL=AccessExpirationAlert.js.map