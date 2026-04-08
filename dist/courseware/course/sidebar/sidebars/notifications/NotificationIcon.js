"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@openedx/paragon");
var _icons = require("@openedx/paragon/icons");
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _messages = _interopRequireDefault(require("../../../messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const NotificationIcon = ({
  status,
  notificationColor
}) => {
  const intl = (0, _i18n.useIntl)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
      src: _icons.WatchOutline,
      className: "m-0 m-auto",
      alt: intl.formatMessage(_messages.default.openNotificationTrigger)
    }), status === 'active' ? /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: (0, _classnames.default)(notificationColor, 'rounded-circle p-1 position-absolute'),
      "data-testid": "notification-dot",
      style: {
        top: '0.3rem',
        right: '0.55rem'
      }
    }) : null]
  });
};
NotificationIcon.defaultProps = {
  status: null
};
NotificationIcon.propTypes = {
  status: _propTypes.default.string,
  notificationColor: _propTypes.default.string.isRequired
};
var _default = exports.default = NotificationIcon;
//# sourceMappingURL=NotificationIcon.js.map