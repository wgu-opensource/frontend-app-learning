"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _hooks = require("../../../../data/hooks");
var _modelStore = require("../../../../generic/model-store");
var _GradeSummaryHeader = _interopRequireDefault(require("./GradeSummaryHeader"));
var _GradeSummaryTable = _interopRequireDefault(require("./GradeSummaryTable"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const GradeSummary = () => {
  const courseId = (0, _hooks.useContextId)();
  const {
    assignmentTypeGradeSummary
  } = (0, _modelStore.useModel)('progress', courseId);
  const [allOfSomeAssignmentTypeIsLocked, setAllOfSomeAssignmentTypeIsLocked] = (0, _react.useState)(false);
  if (assignmentTypeGradeSummary.length === 0) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
    className: "text-dark-700 mb-4",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_GradeSummaryHeader.default, {
      allOfSomeAssignmentTypeIsLocked: allOfSomeAssignmentTypeIsLocked
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_GradeSummaryTable.default, {
      setAllOfSomeAssignmentTypeIsLocked: setAllOfSomeAssignmentTypeIsLocked
    })]
  });
};
var _default = exports.default = GradeSummary;
//# sourceMappingURL=GradeSummary.js.map