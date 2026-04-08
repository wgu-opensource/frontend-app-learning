"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProfileLink = exports.IdVerificationSupportLink = exports.DashboardLink = void 0;
var _react = _interopRequireDefault(require("react"));
var _i18n = require("@edx/frontend-platform/i18n");
var _auth = require("@edx/frontend-platform/auth");
var _frontendPlatform = require("@edx/frontend-platform");
var _paragon = require("@openedx/paragon");
var _messages = _interopRequireDefault(require("../courseware/course/course-exit/messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const DashboardLink = () => {
  const intl = (0, _i18n.useIntl)();
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Hyperlink, {
    variant: "muted",
    isInline: true,
    destination: `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/dashboard`,
    children: intl.formatMessage(_messages.default.dashboardLink)
  });
};
exports.DashboardLink = DashboardLink;
const IdVerificationSupportLink = () => {
  const intl = (0, _i18n.useIntl)();
  if (!(0, _frontendPlatform.getConfig)().SUPPORT_URL_ID_VERIFICATION) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Hyperlink, {
    variant: "muted",
    isInline: true,
    destination: (0, _frontendPlatform.getConfig)().SUPPORT_URL_ID_VERIFICATION,
    children: intl.formatMessage(_messages.default.idVerificationSupportLink)
  });
};
exports.IdVerificationSupportLink = IdVerificationSupportLink;
const ProfileLink = () => {
  const intl = (0, _i18n.useIntl)();
  const {
    username
  } = (0, _auth.getAuthenticatedUser)();
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Hyperlink, {
    variant: "muted",
    isInline: true,
    destination: `${(0, _frontendPlatform.getConfig)().ACCOUNT_PROFILE_URL}/u/${username}`,
    children: intl.formatMessage(_messages.default.profileLink)
  });
};
exports.ProfileLink = ProfileLink;
//# sourceMappingURL=links.js.map