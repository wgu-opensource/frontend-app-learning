"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _paragon = require("@edx/paragon");

var _icons = require("@edx/paragon/icons");

var _UserMessagesProvider = require("./UserMessagesProvider");

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getAlertVariant(type) {
  switch (type) {
    case _UserMessagesProvider.ALERT_TYPES.ERROR:
      return 'warning';

    case _UserMessagesProvider.ALERT_TYPES.DANGER:
      return 'danger';

    case _UserMessagesProvider.ALERT_TYPES.SUCCESS:
      return 'success';

    default:
      return 'info';
  }
}

function getAlertIcon(type) {
  switch (type) {
    case _UserMessagesProvider.ALERT_TYPES.ERROR:
      return _icons.WarningFilled;

    case _UserMessagesProvider.ALERT_TYPES.SUCCESS:
      return _icons.CheckCircle;

    default:
      return _icons.Info;
  }
}

function Alert(_ref) {
  let {
    type,
    dismissible,
    children,
    onDismiss,
    stacked
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Alert, {
    "data-testid": `alert-container-${type}`,
    variant: getAlertVariant(type),
    icon: getAlertIcon(type),
    dismissible: dismissible,
    onClose: onDismiss,
    stacked: stacked,
    children: children
  });
}

Alert.propTypes = {
  type: _propTypes.default.oneOf([_UserMessagesProvider.ALERT_TYPES.ERROR, _UserMessagesProvider.ALERT_TYPES.DANGER, _UserMessagesProvider.ALERT_TYPES.INFO, _UserMessagesProvider.ALERT_TYPES.SUCCESS]).isRequired,
  dismissible: _propTypes.default.bool,
  children: _propTypes.default.node,
  onDismiss: _propTypes.default.func,
  stacked: _propTypes.default.bool
};
Alert.defaultProps = {
  dismissible: false,
  children: undefined,
  onDismiss: null,
  stacked: false
};
var _default = Alert;
exports.default = _default;
//# sourceMappingURL=Alert.js.map