"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FlagButton(_ref) {
  let {
    buttonIcon,
    title,
    text,
    handleSelect,
    isSelected
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
    type: "button",
    className: (0, _classnames.default)('flag-button row w-100 align-content-between m-1.5 py-3.5', isSelected ? 'flag-button-selected' : ''),
    "aria-checked": isSelected,
    role: "radio",
    onClick: () => handleSelect(),
    "data-testid": `weekly-learning-goal-input-${title}`,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "row w-100 m-0 justify-content-center pb-1",
      children: buttonIcon
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: (0, _classnames.default)('row w-100 m-0 justify-content-center small text-gray-700 pb-1', isSelected ? 'font-weight-bold' : ''),
      children: title
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: (0, _classnames.default)('row w-100 m-0 justify-content-center micro text-gray-500', isSelected ? 'font-weight-bold' : ''),
      children: text
    })]
  });
}

FlagButton.propTypes = {
  buttonIcon: _propTypes.default.element.isRequired,
  title: _propTypes.default.string.isRequired,
  text: _propTypes.default.string.isRequired,
  handleSelect: _propTypes.default.func.isRequired,
  isSelected: _propTypes.default.bool.isRequired
};
var _default = FlagButton;
exports.default = _default;
//# sourceMappingURL=FlagButton.js.map