"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _modelStore = require("@src/generic/model-store");
var _frontendPluginFramework = require("@openedx/frontend-plugin-framework");
var _react = _interopRequireDefault(require("react"));
var _DetailedGrades = _interopRequireDefault(require("../../course-home/progress-tab/grades/detailed-grades/DetailedGrades"));
var _GradeSummary = _interopRequireDefault(require("../../course-home/progress-tab/grades/grade-summary/GradeSummary"));
var _hooks = require("../../data/hooks");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ProgressTabGradeBreakdownSlot = () => {
  const courseId = (0, _hooks.useContextId)();
  const {
    gradesFeatureIsFullyLocked
  } = (0, _modelStore.useModel)('progress', courseId);
  const applyLockedOverlay = gradesFeatureIsFullyLocked ? 'locked-overlay' : '';
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_frontendPluginFramework.PluginSlot, {
    id: "org.openedx.frontend.learning.progress_tab_grade_breakdown.v1",
    idAliases: ['progress_tab_grade_breakdown_slot'],
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: `grades my-4 p-4 rounded raised-card ${applyLockedOverlay}`,
      "aria-hidden": gradesFeatureIsFullyLocked,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_GradeSummary.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DetailedGrades.default, {})]
    })
  });
};
ProgressTabGradeBreakdownSlot.propTypes = {};
var _default = exports.default = ProgressTabGradeBreakdownSlot;
//# sourceMappingURL=index.js.map