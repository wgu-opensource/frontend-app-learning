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

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _faSpinner = require("@fortawesome/free-solid-svg-icons/faSpinner");

var _modelStore = require("../../generic/model-store");

var _messages = _interopRequireDefault(require("./messages"));

var _clickHook = _interopRequireDefault(require("./clickHook"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function EnrollmentAlert(_ref) {
  let {
    intl,
    payload
  } = _ref;
  const {
    canEnroll,
    courseId,
    extraText,
    isStaff
  } = payload;
  const {
    org
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const {
    enrollClickHandler,
    loading
  } = (0, _clickHook.default)(courseId, org, intl.formatMessage(_messages.default.success));
  let text = intl.formatMessage(_messages.default.alert);
  let type = 'warning';
  let icon = _icons.WarningFilled;

  if (isStaff) {
    text = intl.formatMessage(_messages.default.staffAlert);
    type = 'info';
    icon = _icons.Info;
  } else if (extraText) {
    text = `${text} ${extraText}`;
  }

  const button = canEnroll && /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
    disabled: loading,
    variant: "link",
    className: "p-0 border-0 align-top mx-1",
    size: "sm",
    style: {
      textDecoration: 'underline'
    },
    onClick: enrollClickHandler,
    children: intl.formatMessage(_messages.default.enrollNowSentence)
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Alert, {
    variant: type,
    icon: icon,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "d-flex",
      children: [text, button, loading && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
        icon: _faSpinner.faSpinner,
        spin: true
      })]
    })
  });
}

EnrollmentAlert.propTypes = {
  intl: _i18n.intlShape.isRequired,
  payload: _propTypes.default.shape({
    canEnroll: _propTypes.default.bool,
    courseId: _propTypes.default.string,
    extraText: _propTypes.default.string,
    isStaff: _propTypes.default.bool
  }).isRequired
};

var _default = (0, _i18n.injectIntl)(EnrollmentAlert);

exports.default = _default;
//# sourceMappingURL=EnrollmentAlert.js.map