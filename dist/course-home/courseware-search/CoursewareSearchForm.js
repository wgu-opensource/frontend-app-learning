"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _paragon = require("@openedx/paragon");
var _i18n = require("@edx/frontend-platform/i18n");
var _messages = _interopRequireDefault(require("./messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const CoursewareSearchForm = _ref => {
  let {
    intl,
    searchTerm,
    onSubmit,
    onChange,
    placeholder
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.SearchField.Advanced, {
    value: searchTerm,
    onSubmit: onSubmit,
    onChange: onChange,
    submitButtonLocation: "external",
    className: "courseware-search-form",
    screenReaderText: {
      label: intl.formatMessage(_messages.default.searchSubmitLabel),
      clearButton: intl.formatMessage(_messages.default.searchClearAction),
      submitButton: null // Remove the sr-only label in the button.
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "pgn__searchfield_wrapper",
      "data-testid": "courseware-search-form",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.SearchField.Label, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.SearchField.Input, {
        placeholder: placeholder,
        autoFocus: true
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.SearchField.ClearButton, {})]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.SearchField.SubmitButton, {
      buttonText: intl.formatMessage(_messages.default.searchSubmitLabel),
      submitButtonLocation: "external",
      "data-testid": "courseware-search-form-submit"
    })]
  });
};
CoursewareSearchForm.propTypes = {
  intl: _i18n.intlShape.isRequired,
  searchTerm: _propTypes.default.string,
  onSubmit: _propTypes.default.func,
  onChange: _propTypes.default.func,
  placeholder: _propTypes.default.string
};
CoursewareSearchForm.defaultProps = {
  searchTerm: undefined,
  onSubmit: undefined,
  onChange: undefined,
  placeholder: undefined
};
var _default = exports.default = (0, _i18n.injectIntl)(CoursewareSearchForm);
//# sourceMappingURL=CoursewareSearchForm.js.map