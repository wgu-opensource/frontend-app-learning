"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _paragon = require("@edx/paragon");
var _CertificateStatus = _interopRequireDefault(require("./certificate-status/CertificateStatus"));
var _CourseCompletion = _interopRequireDefault(require("./course-completion/CourseCompletion"));
var _CourseGrade = _interopRequireDefault(require("./grades/course-grade/CourseGrade"));
var _DetailedGrades = _interopRequireDefault(require("./grades/detailed-grades/DetailedGrades"));
var _GradeSummary = _interopRequireDefault(require("./grades/grade-summary/GradeSummary"));
var _ProgressHeader = _interopRequireDefault(require("./ProgressHeader"));
var _RelatedLinks = _interopRequireDefault(require("./related-links/RelatedLinks"));
var _modelStore = require("../../generic/model-store");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ProgressTab = () => {
  const {
    courseId
  } = (0, _reactRedux.useSelector)(state => state.courseHome);
  const {
    gradesFeatureIsFullyLocked
  } = (0, _modelStore.useModel)('progress', courseId);
  const applyLockedOverlay = gradesFeatureIsFullyLocked ? 'locked-overlay' : '';
  const windowWidth = (0, _paragon.useWindowSize)().width;
  if (windowWidth === undefined) {
    // Bail because we don't want to load <CertificateStatus/> twice, emitting 'visited' events both times.
    // This is a hacky solution, since the user can resize the screen and still get two visited events.
    // But I'm leaving a larger refactor as an exercise to a future reader.
    return null;
  }
  const wideScreen = windowWidth >= _paragon.breakpoints.large.minWidth;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ProgressHeader.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "row w-100 m-0",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "col-12 col-md-8 p-0",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CourseCompletion.default, {}), !wideScreen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_CertificateStatus.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CourseGrade.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: `grades my-4 p-4 rounded raised-card ${applyLockedOverlay}`,
          "aria-hidden": gradesFeatureIsFullyLocked,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_GradeSummary.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DetailedGrades.default, {})]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "col-12 col-md-4 p-0 px-md-4",
        children: [wideScreen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_CertificateStatus.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RelatedLinks.default, {})]
      })]
    })]
  });
};
var _default = ProgressTab;
exports.default = _default;
//# sourceMappingURL=ProgressTab.js.map