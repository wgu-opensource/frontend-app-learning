"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _modelStore = require("../../../../generic/model-store");
var _GradeSummaryHeader = _interopRequireDefault(require("./GradeSummaryHeader"));
var _GradeSummaryTable = _interopRequireDefault(require("./GradeSummaryTable"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const GradeSummary = () => {
  const {
    courseId
  } = (0, _reactRedux.useSelector)(state => state.courseHome);
  const {
    gradingPolicy: {
      assignmentPolicies
    }
  } = (0, _modelStore.useModel)('progress', courseId);
  const [allOfSomeAssignmentTypeIsLocked, setAllOfSomeAssignmentTypeIsLocked] = (0, _react.useState)(false);
  if (assignmentPolicies.length === 0) {
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
var _default = GradeSummary;
exports.default = _default;
//# sourceMappingURL=GradeSummary.js.map