"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _paragon = require("@openedx/paragon");
var _hooks = require("../../data/hooks");
var _ProgressTabCertificateStatusSidePanelSlot = _interopRequireDefault(require("../../plugin-slots/ProgressTabCertificateStatusSidePanelSlot"));
var _CourseCompletion = _interopRequireDefault(require("./course-completion/CourseCompletion"));
var _ProgressHeader = _interopRequireDefault(require("./ProgressHeader"));
var _ProgressTabCertificateStatusMainBodySlot = _interopRequireDefault(require("../../plugin-slots/ProgressTabCertificateStatusMainBodySlot"));
var _ProgressTabCourseGradeSlot = _interopRequireDefault(require("../../plugin-slots/ProgressTabCourseGradeSlot"));
var _ProgressTabGradeBreakdownSlot = _interopRequireDefault(require("../../plugin-slots/ProgressTabGradeBreakdownSlot"));
var _ProgressTabRelatedLinksSlot = _interopRequireDefault(require("../../plugin-slots/ProgressTabRelatedLinksSlot"));
var _modelStore = require("../../generic/model-store");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ProgressTab = () => {
  const courseId = (0, _hooks.useContextId)();
  const {
    disableProgressGraph
  } = (0, _modelStore.useModel)('progress', courseId);
  const windowWidth = (0, _paragon.useWindowSize)().width;
  if (windowWidth === undefined) {
    // Bail because we don't want to load <CertificateStatus/> twice, emitting 'visited' events both times.
    // This is a hacky solution, since the user can resize the screen and still get two visited events.
    // But I'm leaving a larger refactor as an exercise to a future reader.
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ProgressHeader.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "row w-100 m-0",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "col-12 col-md-8 p-0",
        children: [!disableProgressGraph && /*#__PURE__*/(0, _jsxRuntime.jsx)(_CourseCompletion.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProgressTabCertificateStatusMainBodySlot.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProgressTabCourseGradeSlot.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProgressTabGradeBreakdownSlot.default, {})]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "col-12 col-md-4 p-0 px-md-4",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ProgressTabCertificateStatusSidePanelSlot.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProgressTabRelatedLinksSlot.default, {})]
      })]
    })]
  });
};
var _default = exports.default = ProgressTab;
//# sourceMappingURL=ProgressTab.js.map