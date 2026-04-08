"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _paragon = require("@openedx/paragon");
var _i18n = require("@edx/frontend-platform/i18n");
var _messages = _interopRequireDefault(require("./messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const CoursewareSearchForm = ({
  searchTerm,
  onSubmit,
  onChange,
  placeholder
}) => {
  const {
    formatMessage
  } = (0, _i18n.useIntl)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.SearchField.Advanced, {
    value: searchTerm,
    onSubmit: onSubmit,
    onChange: onChange,
    submitButtonLocation: "external",
    className: "courseware-search-form",
    screenReaderText: {
      label: formatMessage(_messages.default.searchSubmitLabel),
      clearButton: formatMessage(_messages.default.searchClearAction),
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
      buttonText: formatMessage(_messages.default.searchSubmitLabel),
      submitButtonLocation: "external",
      "data-testid": "courseware-search-form-submit"
    })]
  });
};
CoursewareSearchForm.propTypes = {
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
var _default = exports.default = CoursewareSearchForm;
//# sourceMappingURL=CoursewareSearchForm.js.map