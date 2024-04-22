"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _i18n = require("@edx/frontend-platform/i18n");
var _modelStore = require("../../../../generic/model-store");
var _CourseGradeFooter = _interopRequireDefault(require("./CourseGradeFooter"));
var _CourseGradeHeader = _interopRequireDefault(require("./CourseGradeHeader"));
var _GradeBar = _interopRequireDefault(require("./GradeBar"));
var _CreditInformation = _interopRequireDefault(require("../../credit-information/CreditInformation"));
var _messages = _interopRequireDefault(require("../messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const CourseGrade = _ref => {
  let {
    intl
  } = _ref;
  const {
    courseId
  } = (0, _reactRedux.useSelector)(state => state.courseHome);
  const {
    creditCourseRequirements,
    gradesFeatureIsFullyLocked,
    gradesFeatureIsPartiallyLocked,
    gradingPolicy: {
      gradeRange
    }
  } = (0, _modelStore.useModel)('progress', courseId);
  const passingGrade = Number((Math.min(...Object.values(gradeRange)) * 100).toFixed(0));
  const applyLockedOverlay = gradesFeatureIsFullyLocked ? 'locked-overlay' : '';
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
    className: "text-dark-700 my-4 rounded raised-card",
    children: [(gradesFeatureIsFullyLocked || gradesFeatureIsPartiallyLocked) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_CourseGradeHeader.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: applyLockedOverlay,
      "aria-hidden": gradesFeatureIsFullyLocked,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "row w-100 m-0 p-4",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "col-12 col-sm-6 p-0 pr-sm-5.5",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
            children: creditCourseRequirements ? intl.formatMessage(_messages.default.gradesAndCredit) : intl.formatMessage(_messages.default.grades)
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
            className: "small",
            children: intl.formatMessage(_messages.default.courseGradeBody)
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_GradeBar.default, {
          passingGrade: passingGrade
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "row w-100 m-0 px-4",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CreditInformation.default, {})
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CourseGradeFooter.default, {
        passingGrade: passingGrade
      })]
    })]
  });
};
CourseGrade.propTypes = {
  intl: _i18n.intlShape.isRequired
};
var _default = (0, _i18n.injectIntl)(CourseGrade);
exports.default = _default;
//# sourceMappingURL=CourseGrade.js.map