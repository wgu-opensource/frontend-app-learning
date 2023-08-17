"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _i18n = require("@edx/frontend-platform/i18n");

var _flag_black = require("./flag_black.svg");

var _flag_outline = require("./flag_outline.svg");

var _flag_gray = require("./flag_gray.svg");

var _FlagButton = _interopRequireDefault(require("./FlagButton"));

var _messages = _interopRequireDefault(require("../messages"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// These flag svgs are derivatives of the Flag icon from paragon
function LearningGoalButton(_ref) {
  let {
    level,
    isSelected,
    handleSelect,
    intl
  } = _ref;
  const buttonDetails = {
    casual: {
      daysPerWeek: 1,
      title: _messages.default.casualGoalButtonTitle,
      text: _messages.default.casualGoalButtonText,
      icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_flag_outline.ReactComponent, {})
    },
    regular: {
      daysPerWeek: 3,
      title: _messages.default.regularGoalButtonTitle,
      text: _messages.default.regularGoalButtonText,
      icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_flag_gray.ReactComponent, {})
    },
    intense: {
      daysPerWeek: 5,
      title: _messages.default.intenseGoalButtonTitle,
      text: _messages.default.intenseGoalButtonText,
      icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_flag_black.ReactComponent, {})
    }
  };
  const values = buttonDetails[level];
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlagButton.default, {
    buttonIcon: values.icon,
    title: intl.formatMessage(values.title),
    text: intl.formatMessage(values.text),
    handleSelect: () => handleSelect(values.daysPerWeek),
    isSelected: isSelected
  });
}

LearningGoalButton.propTypes = {
  level: _propTypes.default.string.isRequired,
  isSelected: _propTypes.default.bool.isRequired,
  handleSelect: _propTypes.default.func.isRequired,
  intl: _i18n.intlShape.isRequired
};

var _default = (0, _i18n.injectIntl)(LearningGoalButton);

exports.default = _default;
//# sourceMappingURL=LearningGoalButton.js.map