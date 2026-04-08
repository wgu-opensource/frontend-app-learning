"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _frontendPluginFramework = require("@openedx/frontend-plugin-framework");
var _CourseGrade = _interopRequireDefault(require("../../course-home/progress-tab/grades/course-grade/CourseGrade"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ProgressTabCourseGradeSlot = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_frontendPluginFramework.PluginSlot, {
  id: "org.openedx.frontend.learning.progress_tab_course_grade.v1",
  idAliases: ['progress_tab_course_grade_slot'],
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CourseGrade.default, {})
});
ProgressTabCourseGradeSlot.propTypes = {};
var _default = exports.default = ProgressTabCourseGradeSlot;
//# sourceMappingURL=index.js.map