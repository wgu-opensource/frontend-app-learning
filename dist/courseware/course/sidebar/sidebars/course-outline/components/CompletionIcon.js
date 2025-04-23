"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _icons = require("@openedx/paragon/icons");
var _icons2 = require("../icons");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const CompletionIcon = _ref => {
  let {
    completionStat: {
      completed = 0,
      total = 0
    }
  } = _ref;
  const percentage = total !== 0 ? Math.min(completed / total * 100, 100) : 0;
  const remainder = 100 - percentage;
  switch (true) {
    case !completed:
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_icons.LmsCompletionSolid, {
        className: "text-gray-300",
        "data-testid": "completion-solid-icon"
      });
    case completed === total:
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_icons.CheckCircle, {
        className: "text-success",
        "data-testid": "check-circle-icon"
      });
    default:
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_icons2.DashedCircleIcon, {
        percentage: percentage,
        remainder: remainder,
        "data-testid": "dashed-circle-icon"
      });
  }
};
CompletionIcon.propTypes = {
  completionStat: _propTypes.default.shape({
    completed: _propTypes.default.number,
    total: _propTypes.default.number
  }).isRequired
};
var _default = exports.default = CompletionIcon;
//# sourceMappingURL=CompletionIcon.js.map