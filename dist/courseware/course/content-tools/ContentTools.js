"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");
var _calculator = _interopRequireDefault(require("./calculator"));
var _notesVisibility = _interopRequireDefault(require("./notes-visibility"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ContentTools = _ref => {
  let {
    course
  } = _ref;
  const {
    sidebarIsOpen
  } = (0, _reactRedux.useSelector)(state => state.learningAssistant);
  return !sidebarIsOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: "content-tools",
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "d-flex justify-content-end align-items-end m-0",
      children: [course.showCalculator && /*#__PURE__*/(0, _jsxRuntime.jsx)(_calculator.default, {}), course.notes.enabled && /*#__PURE__*/(0, _jsxRuntime.jsx)(_notesVisibility.default, {
        course: course
      })]
    })
  });
};
ContentTools.propTypes = {
  course: _propTypes.default.shape({
    notes: _propTypes.default.shape({
      enabled: _propTypes.default.bool
    }),
    showCalculator: _propTypes.default.bool
  }).isRequired
};
var _default = ContentTools;
exports.default = _default;
//# sourceMappingURL=ContentTools.js.map