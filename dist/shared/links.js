"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProfileLink = exports.IdVerificationSupportLink = exports.DashboardLink = void 0;
var _react = _interopRequireDefault(require("react"));
var _i18n = require("@edx/frontend-platform/i18n");
var _auth = require("@edx/frontend-platform/auth");
var _frontendPlatform = require("@edx/frontend-platform");
var _paragon = require("@edx/paragon");
var _messages = _interopRequireDefault(require("../courseware/course/course-exit/messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const IntlDashboardLink = _ref => {
  let {
    intl
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Hyperlink, {
    variant: "muted",
    isInline: true,
    destination: `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/dashboard`,
    children: intl.formatMessage(_messages.default.dashboardLink)
  });
};
IntlDashboardLink.propTypes = {
  intl: _i18n.intlShape.isRequired
};
const IntlIdVerificationSupportLink = _ref2 => {
  let {
    intl
  } = _ref2;
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
IntlIdVerificationSupportLink.propTypes = {
  intl: _i18n.intlShape.isRequired
};
const IntlProfileLink = _ref3 => {
  let {
    intl
  } = _ref3;
  const {
    username
  } = (0, _auth.getAuthenticatedUser)();
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Hyperlink, {
    variant: "muted",
    isInline: true,
    destination: `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/u/${username}`,
    children: intl.formatMessage(_messages.default.profileLink)
  });
};
IntlProfileLink.propTypes = {
  intl: _i18n.intlShape.isRequired
};
const DashboardLink = (0, _i18n.injectIntl)(IntlDashboardLink);
exports.DashboardLink = DashboardLink;
const IdVerificationSupportLink = (0, _i18n.injectIntl)(IntlIdVerificationSupportLink);
exports.IdVerificationSupportLink = IdVerificationSupportLink;
const ProfileLink = (0, _i18n.injectIntl)(IntlProfileLink);
exports.ProfileLink = ProfileLink;
//# sourceMappingURL=links.js.map