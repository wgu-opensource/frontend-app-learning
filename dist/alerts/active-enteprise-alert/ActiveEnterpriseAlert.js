"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@edx/frontend-platform/i18n");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _paragon = require("@edx/paragon");

var _icons = require("@edx/paragon/icons");

var _frontendPlatform = require("@edx/frontend-platform");

var _messages = _interopRequireDefault(require("./messages"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ActiveEnterpriseAlert(_ref) {
  let {
    intl,
    payload
  } = _ref;
  const {
    text,
    courseId
  } = payload;
  const changeActiveEnterprise = /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Hyperlink, {
    style: {
      textDecoration: 'underline'
    },
    destination: `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/enterprise/select/active/?success_url=${encodeURIComponent(`${global.location.origin}/course/${courseId}/home`)}`,
    children: intl.formatMessage(_messages.default.changeActiveEnterpriseLowercase)
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Alert, {
    variant: "warning",
    icon: _icons.WarningFilled,
    children: [text, /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
      id: "learning.activeEnterprise.alert",
      description: "Prompts the user to log-in with the correct enterprise to access the course content.",
      defaultMessage: " {changeActiveEnterprise}.",
      values: {
        changeActiveEnterprise
      }
    })]
  });
}

ActiveEnterpriseAlert.propTypes = {
  intl: _i18n.intlShape.isRequired,
  payload: _propTypes.default.shape({
    text: _propTypes.default.string,
    courseId: _propTypes.default.string
  }).isRequired
};

var _default = (0, _i18n.injectIntl)(ActiveEnterpriseAlert);

exports.default = _default;
//# sourceMappingURL=ActiveEnterpriseAlert.js.map