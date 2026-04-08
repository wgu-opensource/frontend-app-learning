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
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
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